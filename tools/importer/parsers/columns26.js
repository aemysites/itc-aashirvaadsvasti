/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns26)'];

  // Get the main product card
  const card = element.querySelector('.product-card');
  if (!card) return;

  // Left column: product image
  const imageContainer = card.querySelector('.product-image-container');

  // Right column: info and purchase options
  const infoContainer = card.querySelector('.product-info-container');
  if (!infoContainer) return;

  // Title and MRP
  const info = infoContainer.querySelector('.product-info');
  // Purchase options
  const prices = infoContainer.querySelector('.product-prices');

  // Defensive: handle missing info/prices
  const infoFragment = document.createDocumentFragment();
  if (info) infoFragment.appendChild(info.cloneNode(true));

  // Each shop-cta-button is a purchase option
  let shopCards = [];
  if (prices) {
    const shopButtons = Array.from(prices.querySelectorAll('.show-popup.shop-cta-button'));
    shopCards = shopButtons.map(btn => {
      // Logo and price
      const priceOption = btn.querySelector('.price-option');
      // Retailer name
      const retailer = btn.querySelector('.ecommerce-name');
      // Link (use href from btn, but it's a div, so create an anchor)
      const href = btn.getAttribute('href');
      const target = btn.getAttribute('target') || '_blank';
      // Defensive: skip if missing required fields
      if (!priceOption || !retailer || !href) return null;
      // Reference the actual image element (not a new one)
      const priceOptionClone = priceOption.cloneNode(true);
      // Reference the actual retailer element
      const retailerClone = retailer.cloneNode(true);
      // Create anchor
      const a = document.createElement('a');
      a.href = href;
      a.target = target;
      a.appendChild(priceOptionClone);
      a.appendChild(retailerClone);
      return a;
    }).filter(Boolean);
  }

  // Build the right column: info + purchase grid
  const rightCol = document.createElement('div');
  rightCol.appendChild(infoFragment);
  if (shopCards.length > 0) {
    const grid = document.createElement('div');
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    shopCards.forEach(card => {
      card.style.display = 'inline-block';
      card.style.margin = '4px';
      grid.appendChild(card);
    });
    rightCol.appendChild(grid);
  }

  // Build the table rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [imageContainer, rightCol],
  ], document);

  element.replaceWith(table);
}
