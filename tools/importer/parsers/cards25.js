/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards25) block header
  const headerRow = ['Cards (cards25)'];

  // Find all product cards (in this case, only one, but support multiple)
  const cards = element.querySelectorAll('.product-card');
  const rows = [];

  cards.forEach((card) => {
    // --- LEFT CELL: Image ---
    const imgContainer = card.querySelector('.product-image-container');
    let img = imgContainer && imgContainer.querySelector('img');
    // Defensive: if no image, use empty string
    const leftCell = img || '';

    // --- RIGHT CELL: Content ---
    const infoContainer = card.querySelector('.product-info-container');
    // Title (h2)
    const title = infoContainer && infoContainer.querySelector('h2');
    // Description (p, price)
    const desc = infoContainer && infoContainer.querySelector('p');
    // CTA buttons (blinkit, instamart)
    const prices = card.querySelectorAll('.product-prices > .shop-cta-button');
    // Create a container for CTAs
    const ctaContainer = document.createElement('div');
    prices.forEach((shopBtn) => {
      // Wrap each shop-cta-button in an anchor if href exists
      const href = shopBtn.getAttribute('href');
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        // Move all children into the anchor
        while (shopBtn.firstChild) {
          a.appendChild(shopBtn.firstChild);
        }
        // Add the ecommerce name below
        const name = shopBtn.querySelector('.ecommerce-name');
        if (name) {
          a.appendChild(name);
        }
        // Wrap in a div for spacing
        const btnDiv = document.createElement('div');
        btnDiv.appendChild(a);
        ctaContainer.appendChild(btnDiv);
      }
    });
    // Compose right cell
    const rightCell = document.createElement('div');
    if (title) rightCell.appendChild(title);
    if (desc) rightCell.appendChild(desc);
    if (ctaContainer.childNodes.length) rightCell.appendChild(ctaContainer);

    rows.push([leftCell, rightCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
