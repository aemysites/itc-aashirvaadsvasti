/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards14) block header
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Find all card elements
  const slides = element.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    const cardLink = slide.querySelector('a.similar-products-card');
    if (!cardLink) return;

    // --- IMAGE CELL ---
    // Collect both the decorative and main images
    const imgArea = cardLink.querySelector('.similar-prod-img-area');
    let images = [];
    if (imgArea) {
      const bgImg = imgArea.querySelector('img.similar-prod-img-bg');
      const mainImg = imgArea.querySelector('img.similar-prod-img-main');
      if (bgImg) images.push(bgImg);
      if (mainImg) images.push(mainImg);
    }

    // --- TEXT CELL ---
    const title = cardLink.querySelector('.similar-products-card__title');
    const button = cardLink.querySelector('button.buy-now__cta');
    let cta = null;
    if (cardLink.href) {
      cta = document.createElement('a');
      cta.href = cardLink.href;
      cta.textContent = button ? button.textContent.trim() : 'Learn More';
    }
    const textCell = document.createElement('div');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textCell.appendChild(h3);
    }
    if (cta) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    }

    // Add row if images and title exist
    if (images.length && title) {
      rows.push([images, textCell]);
    }
  });

  // Build table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
