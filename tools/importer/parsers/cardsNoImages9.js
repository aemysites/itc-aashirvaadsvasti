/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages9) block: 1 column, multiple rows, each row is a card with heading and description
  const headerRow = ['Cards (cardsNoImages9)'];

  // Only include visible card items (steps)
  const cardItems = Array.from(element.children)
    .filter(child => child.classList.contains('recipe-directions--steps-item') && child.style.display !== 'none');

  // Map each card item to a row: heading (h3) + description (p)
  const rows = cardItems.map(item => {
    // Get heading text
    const headingDiv = item.querySelector('.recipe-directions--steps-item-count');
    const heading = headingDiv ? headingDiv.querySelector('h3') : null;
    const headingText = heading ? heading.textContent.trim() : '';
    // Get description text
    const description = item.querySelector('p');
    const descriptionText = description ? description.textContent.trim() : '';
    // Compose cell content: heading (if exists) + description (if exists)
    const cellDiv = document.createElement('div');
    if (headingText) {
      const headingElem = document.createElement('strong');
      headingElem.textContent = headingText;
      cellDiv.appendChild(headingElem);
    }
    if (descriptionText) {
      const descElem = document.createElement('div');
      descElem.textContent = descriptionText;
      cellDiv.appendChild(descElem);
    }
    return [cellDiv];
  });

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
