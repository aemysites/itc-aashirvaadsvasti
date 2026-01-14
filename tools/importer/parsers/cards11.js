/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block header
  const headerRow = ['Cards (cards11)'];

  // Find the card container
  const card = element.querySelector('.product-card');
  if (!card) return;

  // --- IMAGE CELL ---
  // Get the product image (reference the existing element, do not clone)
  const imgEl = card.querySelector('.product-image-container img');
  let imageCell = '';
  if (imgEl) imageCell = imgEl;

  // --- TEXT CELL ---
  // Title
  const titleEl = card.querySelector('.product-info h2');
  // MRP
  const mrpEl = card.querySelector('.product-info p');

  // Shop buttons (each is .show-popup.shop-cta-button)
  const pricesContainer = card.querySelector('.product-prices');
  let shopButtons = [];
  if (pricesContainer) {
    const shops = pricesContainer.querySelectorAll('.show-popup.shop-cta-button');
    shopButtons = Array.from(shops).map(shop => {
      // Each shop: logo, price, name, all wrapped in a link
      const href = shop.getAttribute('href');
      const logo = shop.querySelector('.price-option img');
      const price = shop.querySelector('.price-option p');
      const name = shop.querySelector('.ecommerce-name');
      // Compose a link with the logo, price, and name
      const link = document.createElement('a');
      if (href) link.href = href;
      link.target = '_blank';
      link.style.display = 'inline-block';
      link.style.textAlign = 'center';
      if (logo) link.appendChild(logo.cloneNode(true));
      if (price) link.appendChild(document.createElement('br'));
      if (price) link.appendChild(price.cloneNode(true));
      if (name) link.appendChild(document.createElement('br'));
      if (name) link.appendChild(name.cloneNode(true));
      return link;
    });
  }

  // Compose the text cell content
  const textCell = document.createElement('div');
  if (titleEl) textCell.appendChild(titleEl);
  if (mrpEl) textCell.appendChild(mrpEl);
  if (shopButtons.length) {
    const shopsDiv = document.createElement('div');
    shopsDiv.style.display = 'flex';
    shopsDiv.style.gap = '8px';
    shopButtons.forEach(btn => shopsDiv.appendChild(btn));
    textCell.appendChild(shopsDiv);
  }

  // Build the table
  const rows = [
    headerRow,
    [imageCell, textCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
