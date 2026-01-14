/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block header
  const headerRow = ['Cards (cards8)'];

  // Find the parent container holding all cards
  const cardsContainer = element.querySelector('.stay-social__cards');
  if (!cardsContainer) return;

  // Select all card items
  const cardEls = cardsContainer.querySelectorAll('.stay-social__card');

  // Build rows for each card
  const rows = Array.from(cardEls).map(cardEl => {
    // Find the anchor (for link)
    const link = cardEl.querySelector('a');
    const img = cardEl.querySelector('img');
    let imgCell = img;
    if (link && img) {
      // Wrap image in link
      const a = document.createElement('a');
      a.href = link.href;
      a.target = '_blank';
      a.appendChild(img.cloneNode(true));
      imgCell = a;
    }
    // Extract alt text if present for text content
    let textContent = '';
    if (img && img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    }
    return [imgCell, textContent];
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
