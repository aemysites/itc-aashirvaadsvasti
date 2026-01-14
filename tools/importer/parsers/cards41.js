/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card container holding all cards
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Get all card elements
  const cardEls = swiperWrapper.querySelectorAll('.product-cards__card');
  if (!cardEls.length) return;

  // Table header
  const rows = [
    ['Cards (cards41)']
  ];

  cardEls.forEach(card => {
    // --- IMAGE CELL ---
    // Main image (person with product)
    let mainImg = null;
    const media = card.querySelector('.product-cards__card-media');
    if (media) {
      const img = media.querySelector('.product-cards__card-thumb');
      if (img) {
        // If src is missing but data-image-src exists, fix it
        if (!img.getAttribute('src') && img.getAttribute('data-image-src')) {
          img.setAttribute('src', img.getAttribute('data-image-src'));
        }
        mainImg = img.cloneNode(true);
      }
    }
    // Packshot image (small image in cutout)
    let packshotImg = null;
    const packshot = card.querySelector('.product-cards__card-img img');
    if (packshot) {
      // If src is missing but data-image-src exists, fix it
      if (!packshot.getAttribute('src') && packshot.getAttribute('data-image-src')) {
        packshot.setAttribute('src', packshot.getAttribute('data-image-src'));
      }
      packshotImg = packshot.cloneNode(true);
    }
    // Compose image cell: main image above, packshot below (each in its own <p> for semantic fidelity)
    let imageCell;
    if (mainImg && packshotImg) {
      const wrapper = document.createElement('div');
      const mainP = document.createElement('p');
      mainP.appendChild(mainImg);
      wrapper.appendChild(mainP);
      const packshotP = document.createElement('p');
      packshotP.appendChild(packshotImg);
      wrapper.appendChild(packshotP);
      imageCell = wrapper;
    } else if (mainImg) {
      const mainP = document.createElement('p');
      mainP.appendChild(mainImg);
      imageCell = mainP;
    } else if (packshotImg) {
      const packshotP = document.createElement('p');
      packshotP.appendChild(packshotImg);
      imageCell = packshotP;
    } else {
      imageCell = '';
    }
    // --- TEXT CELL ---
    // Title and description
    const titleBox = card.querySelector('.product-cards__card-title');
    let title = '', desc = '';
    if (titleBox) {
      const ps = titleBox.querySelectorAll('p');
      if (ps[0]) {
        const b = ps[0].querySelector('b');
        title = b ? b.textContent.trim() : ps[0].textContent.trim();
      }
      if (ps[1]) {
        desc = ps[1].innerHTML.trim(); // preserve <br>
      }
    }
    // Compose text cell (use <p> for both title and description for semantic fidelity)
    const textDiv = document.createElement('div');
    if (title) {
      const titleP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = title;
      titleP.appendChild(strong);
      textDiv.appendChild(titleP);
    }
    if (desc) {
      const descP = document.createElement('p');
      descP.innerHTML = desc;
      textDiv.appendChild(descP);
    }
    // CTA button
    const cta = card.querySelector('a.svasti-cta');
    if (cta) {
      const ctaP = document.createElement('p');
      ctaP.appendChild(cta.cloneNode(true));
      textDiv.appendChild(ctaP);
    }
    // Add row: [image(s), text content]
    rows.push([imageCell, textDiv]);
  });

  // Build table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
