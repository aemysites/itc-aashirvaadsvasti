/* global WebImporter */
export default function parse(element, { document }) {
  // Table block name header
  const headerRow = ['Table (no header, tableNoHeader18)'];

  // Select all step items, including those with display:none
  const stepItems = Array.from(element.querySelectorAll('.recipe-directions--steps-item'));

  // Each step: left column is step label (h3), right column is instruction (p)
  const rows = stepItems.map((item) => {
    // Step label (h3)
    const labelDiv = item.querySelector('.recipe-directions--steps-item-count');
    let label = '';
    if (labelDiv) {
      const h3 = labelDiv.querySelector('h3');
      if (h3) label = h3.textContent.trim();
    }
    // Step instruction (p)
    let instruction = '';
    const p = item.querySelector('p');
    if (p) instruction = p.textContent.trim();
    return [label, instruction];
  });

  // Build table: header row, then all step rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
