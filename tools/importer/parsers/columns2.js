/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main section containing the two columns
  const section = element.querySelector('section.recipe-detail--wrapper');
  if (!section) return;

  // Find the row that contains the columns
  const mainRow = section.querySelector('.row');
  if (!mainRow) return;

  // Get left and right columns
  const leftCol = mainRow.querySelector('.recipe-detail--container');
  const rightCol = mainRow.querySelector('.recipe-detail--ingredients');

  // Defensive: if either column is missing, abort
  if (!leftCol || !rightCol) return;

  // --- Left column: preserve structure and grouping ---
  const leftCell = document.createElement('div');

  // Title
  const title = leftCol.querySelector('.recipe-detail--title');
  if (title) {
    const h = document.createElement('div');
    h.textContent = title.textContent.trim();
    leftCell.appendChild(h);
  }

  // Share block (icon + label)
  const shareDiv = leftCol.querySelector('.recipe-detail--share');
  if (shareDiv) {
    leftCell.appendChild(shareDiv.cloneNode(true));
  }

  // Description
  const desc = leftCol.querySelector('.recipe-detail--description');
  if (desc) {
    // Get all paragraphs inside description
    const ps = desc.querySelectorAll('p');
    ps.forEach(p => {
      const txt = p.textContent.trim();
      if (txt) {
        const para = document.createElement('p');
        para.textContent = txt;
        leftCell.appendChild(para);
      }
    });
  }

  // Prep/servings block
  const brief = leftCol.querySelector('.recipe-detail--brief');
  if (brief) {
    leftCell.appendChild(brief.cloneNode(true));
  }

  // --- Right column: preserve structure and use UL for ingredients ---
  const rightCell = document.createElement('div');

  // Heading
  const ingHeading = rightCol.querySelector('.font-baskerville');
  if (ingHeading) {
    const h = document.createElement('div');
    h.textContent = ingHeading.textContent.trim();
    rightCell.appendChild(h);
  }

  // Wavy separator image (above)
  const separatorTop = rightCol.querySelector('.heading-separator img');
  if (separatorTop) {
    rightCell.appendChild(separatorTop.cloneNode(true));
  }

  // Ingredient list as UL with two spans per LI
  const ingList = rightCol.querySelectorAll('.ingredients--list-item');
  if (ingList.length > 0) {
    const ul = document.createElement('ul');
    ingList.forEach(li => {
      const name = li.querySelector('.ingredients--name');
      const qty = li.querySelector('.ingredients--quantity');
      if (name && qty) {
        const item = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name.textContent.trim();
        const qtySpan = document.createElement('span');
        qtySpan.textContent = qty.textContent.trim();
        item.appendChild(nameSpan);
        item.appendChild(document.createTextNode(' '));
        item.appendChild(qtySpan);
        ul.appendChild(item);
      }
    });
    rightCell.appendChild(ul);
  }

  // Wavy separator image (below)
  const separatorBottom = rightCol.querySelector('.button-separator img');
  if (separatorBottom) {
    rightCell.appendChild(separatorBottom.cloneNode(true));
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns2)'];
  // Table second row: left and right columns (elements)
  const columnsRow = [leftCell, rightCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
