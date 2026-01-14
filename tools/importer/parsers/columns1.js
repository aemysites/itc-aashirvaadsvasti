/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns1)'];

  // --- LEFT COLUMN ---
  const leftWrapper = element.querySelector('.recipe-detail--container');
  const leftColumn = document.createElement('div');

  // Title
  const title = leftWrapper && leftWrapper.querySelector('.recipe-detail--title');
  if (title) leftColumn.appendChild(title.cloneNode(true));

  // Description (grab all text inside .recipe-detail--description)
  const description = leftWrapper && leftWrapper.querySelector('.recipe-detail--description');
  if (description) {
    // Use all child nodes to ensure all text is captured
    Array.from(description.childNodes).forEach(node => {
      leftColumn.appendChild(node.cloneNode(true));
    });
  }

  // Share button (icon and text)
  const shareDiv = leftWrapper && leftWrapper.querySelector('.recipe-detail--share');
  if (shareDiv) {
    leftColumn.appendChild(shareDiv.cloneNode(true));
  }

  // Prep time and servings (the two info blocks)
  const briefDiv = leftWrapper && leftWrapper.querySelector('.recipe-detail--brief');
  if (briefDiv) {
    leftColumn.appendChild(briefDiv.cloneNode(true));
  }

  // --- RIGHT COLUMN ---
  // Find the main wrapper for the right column (ingredients)
  const rightWrapper = element.querySelector('.recipe-detail--ingredients');
  const rightColumn = document.createElement('div');
  if (rightWrapper) {
    // Only grab the main ingredient card content
    const ingredientsCard = rightWrapper.querySelector('.ingredients--wrapper');
    if (ingredientsCard) {
      rightColumn.appendChild(ingredientsCard.cloneNode(true));
    } else {
      rightColumn.appendChild(rightWrapper.cloneNode(true));
    }
  }

  // --- TABLE CONSTRUCTION ---
  const rows = [
    headerRow,
    [leftColumn, rightColumn]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
