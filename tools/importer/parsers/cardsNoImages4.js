/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages4) block
  const headerRow = ['Cards (cardsNoImages4)'];
  const rows = [headerRow];

  // Select all card items (steps), including those with display:none
  const cardItems = Array.from(element.querySelectorAll('.recipe-directions--steps-item'));

  cardItems.forEach(item => {
    // Find the heading (step title)
    const headingDiv = item.querySelector('.recipe-directions--steps-item-count');
    let heading = headingDiv ? headingDiv.querySelector('h3') : null;
    // Find the description
    const desc = item.querySelector('.recipe-directions--steps-item-text');

    // Compose the card cell
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);

    rows.push([cellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
