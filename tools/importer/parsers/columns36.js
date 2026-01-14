/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row
  const headerRow = ['Columns (columns36)'];

  // Find the two main columns
  const section = element.querySelector('section.recipe-detail--wrapper');
  if (!section) return;
  const container = section.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Left column: recipe details (title, desc, share, brief)
  const leftCol = row.querySelector('.recipe-detail--container');
  // Right column: ingredients
  const rightCol = row.querySelector('.recipe-detail--ingredients');

  // Defensive: If either column is missing, fallback to single column
  let columnsRow = [];
  if (leftCol && rightCol) {
    columnsRow = [leftCol, rightCol];
  } else if (leftCol) {
    columnsRow = [leftCol];
  } else if (rightCol) {
    columnsRow = [rightCol];
  } else {
    columnsRow = [section];
  }

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
