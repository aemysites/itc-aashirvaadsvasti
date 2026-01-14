/* global WebImporter */
export default function parse(element, { document }) {
  // Find all product cards (handles multiple cards if present)
  const cards = element.querySelectorAll('.product-card');

  // Table header as required
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    // --- IMAGE COLUMN ---
    const imgEl = card.querySelector('.product-image-container img');
    let imageCell = null;
    if (imgEl) {
      imageCell = imgEl;
    }

    // --- TEXT COLUMN ---
    const infoContainer = card.querySelector('.product-info-container');
    const textCell = document.createElement('div');

    // Title (h2)
    const title = infoContainer?.querySelector('.product-info h2');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent;
      textCell.appendChild(h2);
    }

    // Price/shop CTA (grouped in a single block, with link if present)
    const priceBox = infoContainer?.querySelector('.product-prices .shop-cta-button');
    if (priceBox) {
      // Group logo, price, shop name in a single container
      const ctaContainer = document.createElement('div');
      ctaContainer.style.display = 'inline-block';
      ctaContainer.style.border = '1px solid #ccc';
      ctaContainer.style.padding = '4px 8px';
      ctaContainer.style.marginTop = '8px';
      ctaContainer.style.marginBottom = '8px';
      // If there's an href, wrap the group in an <a>
      let wrapper = ctaContainer;
      const href = priceBox.getAttribute('href');
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.target = priceBox.getAttribute('target') || '_blank';
        a.style.textDecoration = 'none';
        a.style.color = 'inherit';
        a.appendChild(ctaContainer);
        wrapper = a;
      }
      // Shop logo
      const logoImg = priceBox.querySelector('.price-option img');
      if (logoImg) {
        ctaContainer.appendChild(logoImg);
      }
      // Price
      const priceP = priceBox.querySelector('.price-option p');
      if (priceP) {
        const priceSpan = document.createElement('span');
        priceSpan.textContent = priceP.textContent;
        priceSpan.style.marginLeft = '8px';
        ctaContainer.appendChild(priceSpan);
      }
      // Shop name (below)
      const shopName = priceBox.querySelector('.ecommerce-name');
      if (shopName) {
        const shopDiv = document.createElement('div');
        shopDiv.textContent = shopName.textContent;
        shopDiv.style.marginTop = '4px';
        ctaContainer.appendChild(shopDiv);
      }
      textCell.appendChild(wrapper);
    }

    rows.push([imageCell, textCell]);
  });

  // Create and replace with the cards table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
