/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create the CTA (shop) buttons as links
  function createShopLinks(shopNodes) {
    return Array.from(shopNodes).map((shopNode) => {
      // Get href
      const href = shopNode.getAttribute('href');
      // Get price and logo
      const priceOption = shopNode.querySelector('.price-option');
      // Clone logo img and price
      const logoImg = priceOption?.querySelector('img');
      const priceText = priceOption?.querySelector('p');
      // Get platform name
      const platform = shopNode.querySelector('.ecommerce-name');
      // Compose the link
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.style.display = 'inline-block';
      // Build content inside link
      if (logoImg) link.appendChild(logoImg.cloneNode(true));
      if (priceText) link.appendChild(document.createTextNode(' ' + priceText.textContent));
      if (platform) {
        link.appendChild(document.createElement('br'));
        link.appendChild(document.createTextNode(platform.textContent));
      }
      return link;
    });
  }

  // Find all cards (in this case, only one, but generalize)
  const productCards = element.querySelectorAll('.product-card');
  const rows = [
    ['Cards (cards16)'], // Header row
  ];

  productCards.forEach((card) => {
    // Image (left cell)
    const img = card.querySelector('.product-image');
    // Title (h2)
    const title = card.querySelector('.product-info h2');
    // Shop CTAs
    const shopNodes = card.querySelectorAll('.shop-cta-button');
    const shopLinks = createShopLinks(shopNodes);

    // Compose right cell: title (strong), then CTAs
    const rightCell = document.createElement('div');
    if (title) {
      const h = document.createElement('strong');
      h.textContent = title.textContent;
      rightCell.appendChild(h);
    }
    if (shopLinks.length > 0) {
      rightCell.appendChild(document.createElement('br'));
      shopLinks.forEach((link, idx) => {
        rightCell.appendChild(link);
        if (idx < shopLinks.length - 1) rightCell.appendChild(document.createTextNode(' '));
      });
    }

    rows.push([
      img,
      rightCell,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
