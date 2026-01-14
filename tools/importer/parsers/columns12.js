/* global WebImporter */
export default function parse(element, { document }) {
  // Each top-level div is a column
  const categoryDivs = Array.from(element.querySelectorAll(':scope > div'));
  const columns = [];

  categoryDivs.forEach((catDiv) => {
    const colFragment = document.createElement('div');
    // Find all direct anchors in this column
    const links = Array.from(catDiv.querySelectorAll(':scope > a'));
    links.forEach((a) => {
      // If anchor contains h1/h2, append it
      const heading = a.querySelector('h1, h2');
      if (heading) {
        colFragment.appendChild(heading.cloneNode(true));
      }
      // If anchor contains a <ul>, append the list
      const ul = a.querySelector('ul');
      if (ul) {
        colFragment.appendChild(ul.cloneNode(true));
      }
      // If anchor is just a heading (no list), preserve the link
      if (!heading && !ul && a.textContent.trim()) {
        colFragment.appendChild(a.cloneNode(true));
      }
    });
    // Only add non-empty columns
    if (colFragment.childNodes.length > 0) {
      columns.push(colFragment);
    }
  });

  // Fix: Group columns into 5 main columns as per screenshot analysis
  // If there are more than 5, merge extras into the last column
  const MAX_COLS = 5;
  let finalColumns = columns;
  if (columns.length > MAX_COLS) {
    finalColumns = columns.slice(0, MAX_COLS - 1);
    const lastCol = document.createElement('div');
    columns.slice(MAX_COLS - 1).forEach(col => {
      lastCol.appendChild(col);
    });
    finalColumns.push(lastCol);
  }

  // Build the table: header row, then one row with all columns
  const headerRow = ['Columns (columns12)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    finalColumns
  ], document);

  element.replaceWith(table);
}
