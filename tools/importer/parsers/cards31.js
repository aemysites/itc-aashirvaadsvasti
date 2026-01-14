/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards31) block: 2 columns, multiple rows
  // 1st column: image (mandatory)
  // 2nd column: text content (title, CTA)

  // Find the parent container for cards
  const container = element.querySelector('.similar-products__container .swiper-wrapper');
  if (!container) return;

  // Get all card slides
  const slides = Array.from(container.querySelectorAll('.swiper-slide'));

  // Prepare header row
  const headerRow = ['Cards (cards31)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Each slide contains an anchor with card content
    const cardLink = slide.querySelector('a.similar-products-card');
    if (!cardLink) return;

    // Card image: include both background and main product image if present
    const imgArea = cardLink.querySelector('.similar-prod-img-area');
    let bgImg = null;
    let mainImg = null;
    if (imgArea) {
      bgImg = imgArea.querySelector('.similar-prod-img-bg');
      mainImg = imgArea.querySelector('.similar-prod-img-main');
    }
    // Compose image cell: both images if present
    const imageCell = [];
    if (bgImg) imageCell.push(bgImg);
    if (mainImg) imageCell.push(mainImg);

    // Card title
    const titleEl = cardLink.querySelector('.similar-products-card__title');
    // Compose text cell: title, CTA
    const textCellContent = [];
    if (titleEl) {
      const heading = document.createElement('strong');
      heading.textContent = titleEl.textContent.trim();
      textCellContent.push(heading);
    }
    // CTA button: 'Learn More' (only if present)
    const ctaBtn = cardLink.querySelector('button.buy-now__cta');
    if (ctaBtn) {
      const ctaLink = document.createElement('a');
      ctaLink.href = cardLink.href;
      ctaLink.textContent = ctaBtn.textContent;
      textCellContent.push(ctaLink);
    }
    rows.push([imageCell, textCellContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
