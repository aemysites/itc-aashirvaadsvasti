/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns20)'];

  // Find the main wrapper for the two columns
  const row = element.querySelector('.recipe-detail--wrapper > .container > .row');
  if (!row) return;

  // --- LEFT COLUMN CONTENT EXTRACTION ---
  const leftCol = row.querySelector('.recipe-detail--container');
  if (!leftCol) return;

  // Extract title
  const title = leftCol.querySelector('.recipe-detail--title')?.textContent.trim() || '';

  // Extract share icon and label (only the visible share UI, not the modal)
  const shareDiv = leftCol.querySelector('.recipe-detail--share');
  let shareContent = '';
  if (shareDiv) {
    const shareImg = shareDiv.querySelector('img');
    const shareLabel = shareDiv.querySelector('span')?.textContent.trim() || '';
    if (shareImg) {
      const img = document.createElement('img');
      img.src = shareImg.src;
      img.alt = 'Share';
      img.style.verticalAlign = 'middle';
      shareContent = img.outerHTML + (shareLabel ? ' ' + shareLabel : '');
    } else if (shareLabel) {
      shareContent = shareLabel;
    }
  }

  // Extract description (all text content inside .recipe-detail--description)
  let description = '';
  const descDiv = leftCol.querySelector('.recipe-detail--description');
  if (descDiv) {
    description = descDiv.textContent.replace(/\s+/g, ' ').trim();
  }

  // Extract info blocks (prep time and yield, with icons)
  const briefItems = leftCol.querySelectorAll('.recipe-detail--brief-item');
  const infoRow = document.createElement('div');
  infoRow.style.display = 'flex';
  infoRow.style.gap = '2em';
  briefItems.forEach(item => {
    const iconImg = item.querySelector('img');
    const value = item.querySelector('.prepare-time-value, .serve-count');
    const block = document.createElement('div');
    if (iconImg) {
      const img = document.createElement('img');
      img.src = iconImg.src;
      img.alt = '';
      img.style.verticalAlign = 'middle';
      block.appendChild(img);
    }
    if (value) {
      block.appendChild(document.createTextNode(' ' + value.textContent.trim()));
    }
    infoRow.appendChild(block);
  });

  // Compose left column cell content
  const leftCell = document.createElement('div');
  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title;
    leftCell.appendChild(h2);
  }
  if (shareContent) {
    const shareDivEl = document.createElement('div');
    shareDivEl.innerHTML = shareContent;
    leftCell.appendChild(shareDivEl);
  }
  if (description) {
    const descDivEl = document.createElement('div');
    descDivEl.textContent = description;
    leftCell.appendChild(descDivEl);
  }
  if (infoRow.childNodes.length) {
    leftCell.appendChild(infoRow);
  }

  // --- RIGHT COLUMN CONTENT EXTRACTION ---
  const rightCol = row.querySelector('.recipe-detail--ingredients');
  if (!rightCol) return;

  // Extract ingredients heading
  const ingHeading = rightCol.querySelector('.ingredients--wrapper .font-baskerville')?.textContent.trim() || '';

  // Extract separators (wavy/dotted lines)
  const separatorsTop = rightCol.querySelectorAll('.heading-separator img');
  const separatorsBottom = rightCol.querySelectorAll('.button-separator img');

  // Extract ingredients list
  const ingList = rightCol.querySelectorAll('.ingredients--list-item');
  const ul = document.createElement('ul');
  ingList.forEach(li => {
    const name = li.querySelector('.ingredients--name')?.textContent.trim() || '';
    const qty = li.querySelector('.ingredients--quantity span')?.textContent.trim() || '';
    const liEl = document.createElement('li');
    if (name) {
      const nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      liEl.appendChild(nameSpan);
    }
    if (qty) {
      const qtySpan = document.createElement('span');
      qtySpan.textContent = ' ' + qty;
      qtySpan.style.float = 'right';
      liEl.appendChild(qtySpan);
    }
    ul.appendChild(liEl);
  });

  // Compose right column cell content
  const rightCell = document.createElement('div');
  if (ingHeading) {
    const h3 = document.createElement('h3');
    h3.textContent = ingHeading;
    rightCell.appendChild(h3);
  }
  separatorsTop.forEach(imgEl => {
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = '';
    img.style.display = 'block';
    img.style.margin = '8px 0';
    rightCell.appendChild(img);
  });
  rightCell.appendChild(ul);
  separatorsBottom.forEach(imgEl => {
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = '';
    img.style.display = 'block';
    img.style.margin = '8px 0';
    rightCell.appendChild(img);
  });

  // Compose table cells
  const cells = [
    headerRow,
    [leftCell, rightCell],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
