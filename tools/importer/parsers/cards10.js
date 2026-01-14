/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the cards container
  const cardsWrapper = element.querySelector('.swiper-wrapper.popular-recipe__recipe-wrapper');
  if (!cardsWrapper) return;

  // 2. Find all cards
  const cardSlides = Array.from(cardsWrapper.querySelectorAll('.swiper-slide'));
  if (!cardSlides.length) return;

  // 3. Build the header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cardSlides.forEach((slide) => {
    // Each card is in .recipe-card
    const card = slide.querySelector('.recipe-card');
    if (!card) return;
    // Image (first cell)
    const img = card.querySelector('img.recipe-card__image');
    // Share icon (SVG image in .recipe-card__info)
    const shareIcon = card.querySelector('.recipe-card__info img');
    // Text content (second cell)
    const link = card.querySelector('a.recipe-card__link');
    let textContent = document.createElement('div');
    if (link) {
      // Title
      const title = link.querySelector('.recipe-card__title');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent;
        textContent.appendChild(h3);
      }
      // Description
      const desc = link.querySelector('.recipe-card__desc');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent;
        textContent.appendChild(p);
      }
      // Wavy line separator
      const wave = link.querySelector('.recipe-card__wave');
      if (wave) {
        textContent.appendChild(wave);
      }
      // Properties (time, serves)
      const props = link.querySelector('.recipe-card__properties');
      if (props) {
        textContent.appendChild(props);
      }
    }
    // Compose first cell: image + share icon
    const firstCell = document.createElement('div');
    if (img) firstCell.appendChild(img);
    if (shareIcon) firstCell.appendChild(shareIcon);
    rows.push([
      firstCell,
      textContent
    ]);
  });

  // 4. Create the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
