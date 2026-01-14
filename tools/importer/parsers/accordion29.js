/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion29)'];

  // Find the heading and subtitle (if present)
  const heading = element.querySelector('.recipe-directions--title');
  const subtitle = element.querySelector('.recipe-directions--subtitle');

  // Create a row for heading + subtitle as the first accordion item
  let introRow = null;
  if (heading || subtitle) {
    const wrapper = document.createElement('div');
    if (heading) wrapper.appendChild(heading.cloneNode(true));
    if (subtitle) wrapper.appendChild(subtitle.cloneNode(true));
    introRow = ['Preparation', wrapper];
  }

  // Find all the step items
  const steps = element.querySelectorAll('.recipe-directions--steps-item');
  const rows = [];
  steps.forEach((step) => {
    // Title cell: the step label (h3)
    const title = step.querySelector('.recipe-directions--steps-item-count');
    // Content cell: the step text (p)
    const content = step.querySelector('.recipe-directions--steps-item-text');
    if (title && content) {
      rows.push([title.cloneNode(true), content.cloneNode(true)]);
    }
  });

  // Compose the table data
  const tableData = [headerRow];
  if (introRow) tableData.push(introRow);
  tableData.push(...rows);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(table);
}
