/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main wrapper for the two columns
  const section = element.querySelector('section.recipe-detail--wrapper');
  if (!section) return;
  const container = section.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Left column: recipe details
  const leftCol = row.querySelector('.recipe-detail--container');
  // Right column: ingredients
  const rightCol = row.querySelector('.recipe-detail--ingredients');

  // Build left column content: include all visible text and icons
  const leftFrag = document.createDocumentFragment();
  // Title
  const title = leftCol.querySelector('.recipe-detail--title');
  if (title) leftFrag.appendChild(title.cloneNode(true));
  // Share icon + text
  const share = leftCol.querySelector('.recipe-detail--share');
  if (share) leftFrag.appendChild(share.cloneNode(true));
  // Description (all paragraphs)
  const desc = leftCol.querySelector('.recipe-detail--description');
  if (desc) {
    // Only include non-empty paragraphs
    const descDiv = document.createElement('div');
    desc.querySelectorAll('p').forEach(p => {
      if (p.textContent.trim()) descDiv.appendChild(p.cloneNode(true));
    });
    if (descDiv.childNodes.length) leftFrag.appendChild(descDiv);
  }
  // Brief info (prep time, serving count)
  const brief = leftCol.querySelector('.recipe-detail--brief');
  if (brief) {
    // Only include the visible info blocks
    const briefFrag = document.createDocumentFragment();
    brief.querySelectorAll('.recipe-detail--brief-item').forEach(item => {
      briefFrag.appendChild(item.cloneNode(true));
    });
    leftFrag.appendChild(briefFrag);
  }

  // Build right column content: include heading, separator, and full ingredient list
  const rightFrag = document.createDocumentFragment();
  // Heading
  const heading = rightCol.querySelector('.font-baskerville');
  if (heading) rightFrag.appendChild(heading.cloneNode(true));
  // Separator
  const separator = rightCol.querySelector('.heading-separator');
  if (separator) rightFrag.appendChild(separator.cloneNode(true));
  // Ingredient list
  const ingredientsList = rightCol.querySelector('.ingredients--list');
  if (ingredientsList) rightFrag.appendChild(ingredientsList.cloneNode(true));

  // Build the table rows
  const headerRow = ['Columns (columns37)'];
  const contentRow = [leftFrag, rightFrag];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
