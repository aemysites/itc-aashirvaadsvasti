/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards38)'];

  // Find the card container (single card in this case)
  const card = element.querySelector('.product-card');
  if (!card) return;

  // --- IMAGE CELL ---
  // Get the product image
  const imgContainer = card.querySelector('.product-image-container img');
  let imageCell = '';
  if (imgContainer) imageCell = imgContainer;

  // --- CONTENT CELL ---
  // Title
  const title = card.querySelector('.product-info h2');
  // Description (MRP)
  const description = card.querySelector('.product-info p');

  // CTA buttons (shop links)
  const pricesContainer = card.querySelector('.product-prices');
  let ctas = [];
  if (pricesContainer) {
    const shopButtons = pricesContainer.querySelectorAll('.shop-cta-button');
    shopButtons.forEach((btn) => {
      const href = btn.getAttribute('href');
      // Get logo image and price
      const logo = btn.querySelector('.price-option img');
      const price = btn.querySelector('.price-option p');
      const shopName = btn.querySelector('.ecommerce-name');
      if (href && logo && price && shopName) {
        // Compose CTA: [logo] [price] [shop name] as a single link
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank';
        link.style.display = 'inline-block';
        // Compose content
        const wrapper = document.createElement('span');
        wrapper.appendChild(logo.cloneNode(true));
        wrapper.appendChild(document.createTextNode(' '));
        wrapper.appendChild(price.cloneNode(true));
        wrapper.appendChild(document.createElement('br'));
        wrapper.appendChild(shopName.cloneNode(true));
        link.appendChild(wrapper);
        ctas.push(link);
      }
    });
  }

  // Compose content cell
  const contentCell = document.createElement('div');
  if (title) contentCell.appendChild(title.cloneNode(true));
  if (description) contentCell.appendChild(description.cloneNode(true));
  if (ctas.length) {
    const ctaContainer = document.createElement('div');
    ctaContainer.style.display = 'flex';
    ctaContainer.style.gap = '16px';
    ctas.forEach((cta) => ctaContainer.appendChild(cta));
    contentCell.appendChild(ctaContainer);
  }

  // Build table
  const rows = [
    headerRow,
    [imageCell, contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
