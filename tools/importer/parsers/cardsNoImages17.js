/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header row
  const headerRow = ['Cards (cardsNoImages17)'];

  // Extract heading and subtitle as first card
  const heading = element.querySelector('.recipe-directions--title');
  const subtitle = element.querySelector('.recipe-directions--subtitle');
  const introDiv = document.createElement('div');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    introDiv.appendChild(h2);
  }
  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    introDiv.appendChild(p);
  }

  // Find all step items and build cards
  const stepItems = element.querySelectorAll('.recipe-directions--steps-item');
  const stepRows = Array.from(stepItems).map((step) => {
    const stepNum = step.querySelector('.recipe-directions--steps-item-count h3');
    const stepDesc = step.querySelector('.recipe-directions--steps-item-text');
    const cardDiv = document.createElement('div');
    if (stepNum) {
      const h3 = document.createElement('h3');
      h3.textContent = stepNum.textContent.trim();
      cardDiv.appendChild(h3);
    }
    if (stepDesc) {
      const p = document.createElement('p');
      p.textContent = stepDesc.textContent.trim();
      cardDiv.appendChild(p);
    }
    return [cardDiv];
  });

  // Compose all rows: header, intro card, then step cards
  const rows = [headerRow, [introDiv], ...stepRows];

  // Create and replace with table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
