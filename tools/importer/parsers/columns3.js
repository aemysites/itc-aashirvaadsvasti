/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column: heading + product images
  const leftCol = element.querySelector('.mt-8.col-lg-4');

  // Extract ghee hero/banner section (middle column)
  const gheeSection = element.querySelector('.right-section .ghee_box');

  // Extract milk hero/banner section (right column)
  const milkSection = element.querySelector('.milk-section_image');

  // Defensive: ensure all columns exist
  if (!leftCol || !gheeSection || !milkSection) return;

  // Table header row as required
  const headerRow = ['Columns (columns3)'];
  // Table content row: left, middle, right columns
  const contentRow = [leftCol, gheeSection, milkSection];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
