/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Carousel (carousel35)'];
  const rows = [headerRow];

  // Extract all carousel slides
  const slides = Array.from(element.querySelectorAll('.swiper-slide.primary-swiper-slide'));
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    const textCell = document.createElement('div');

    // Extract heading
    const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCell.appendChild(heading);

    // Extract all visible text blocks (divs with text inside .video360-banner__section)
    const bannerSection = slide.querySelector('.video360-banner__section');
    if (bannerSection) {
      const textBlocks = bannerSection.querySelectorAll('div');
      textBlocks.forEach((block) => {
        // Avoid duplicating heading
        if ((!heading || block !== heading) && block.textContent.trim()) {
          if (textCell.childNodes.length) textCell.appendChild(document.createElement('br'));
          textCell.appendChild(block);
        }
      });
    }

    rows.push([
      img,
      textCell.childNodes.length ? textCell : ''
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
