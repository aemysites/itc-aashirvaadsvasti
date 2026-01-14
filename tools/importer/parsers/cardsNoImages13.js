/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages13) block: 1 column, multiple rows, each row = 1 card (heading + description)
  const headerRow = ['Cards (cardsNoImages13)'];
  const rows = [headerRow];

  // Select ALL step items, including those with display:none
  const cardItems = Array.from(element.querySelectorAll('.recipe-directions--steps-item'));

  cardItems.forEach(item => {
    // Get heading (step number)
    const headingDiv = item.querySelector('.recipe-directions--steps-item-count');
    let heading = '';
    if (headingDiv) {
      heading = headingDiv.textContent.trim();
    }
    // Get description
    const desc = item.querySelector('.recipe-directions--steps-item-text');
    let descText = '';
    if (desc) descText = desc.textContent.trim();

    // Compose cell content: heading as <strong>, then description as <div>
    const frag = document.createElement('div');
    if (heading) {
      const headingEl = document.createElement('strong');
      headingEl.textContent = heading;
      frag.appendChild(headingEl);
    }
    if (descText) {
      const descEl = document.createElement('div');
      descEl.textContent = descText;
      frag.appendChild(descEl);
    }
    rows.push([frag]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
