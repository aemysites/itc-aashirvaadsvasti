/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block header
  const headerRow = ['Cards (cards23)'];

  // Find the parent <ul> containing all cards
  const ul = element.querySelector('ul.article-listing__results--list');
  if (!ul) return;

  // Find all card <li> elements
  const cards = Array.from(ul.querySelectorAll(':scope > li'));

  // Build table rows for each card
  const rows = cards.map((li) => {
    // Extract product image (mandatory)
    const img = li.querySelector('.product-card__image');
    // Defensive fallback to any img if not found
    const image = img || li.querySelector('img');

    // Extract product title (mandatory)
    const title = li.querySelector('.product-card__title');

    // Extract CTA button and link (optional)
    const btn = li.querySelector('.product-card__btn');
    const link = li.querySelector('a.product-card__link');
    let cta = null;
    if (btn && link && link.href) {
      // Create a new anchor with the button's text
      cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = btn.textContent;
    } else if (btn) {
      // Use the button as is (should not happen in this markup)
      cta = btn.cloneNode(true);
    }

    // Compose the text cell: title (as heading), then CTA
    const textCell = document.createElement('div');
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title.textContent;
      textCell.appendChild(heading);
    }
    if (cta) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    }

    return [image, textCell];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
