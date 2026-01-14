/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single column with block name
  const headerRow = ['Table (no header, tableNoHeader21)'];

  // Include ALL step items, even those with display:none
  const stepItems = Array.from(element.querySelectorAll('.recipe-directions--steps-item'));

  // Each row: [Step label, Step instruction] (two columns)
  const rows = stepItems.map(item => {
    // Extract step label (h3 or fallback to text)
    const labelDiv = item.querySelector('.recipe-directions--steps-item-count');
    let stepLabel = '';
    if (labelDiv) {
      const h3 = labelDiv.querySelector('h3');
      stepLabel = h3 ? h3.textContent.trim() : labelDiv.textContent.trim();
    }
    // Extract step instruction (p)
    let descText = '';
    const stepDesc = item.querySelector('.recipe-directions--steps-item-text');
    if (stepDesc) {
      descText = stepDesc.textContent.trim();
    } else {
      // fallback: get all <p> text
      const p = item.querySelector('p');
      descText = p ? p.textContent.trim() : '';
    }
    return [stepLabel, descText];
  });

  // Compose table: header row (single column), then two-column rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
