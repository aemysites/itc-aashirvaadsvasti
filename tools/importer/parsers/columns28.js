/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two columns: left (details) and right (ingredients)
  let leftCol, rightCol;
  // The outer div with class 'recipeDetails' wraps the columns
  const recipeDetails = element.querySelector('.recipeDetails');
  if (recipeDetails) {
    const left = recipeDetails.querySelector('.recipe-detail--container');
    const right = recipeDetails.querySelector('.recipe-detail--ingredients');
    if (left) leftCol = left;
    if (right) rightCol = right;
  }
  // Defensive fallback
  if (!leftCol) leftCol = element.querySelector('.recipe-detail--container');
  if (!rightCol) rightCol = element.querySelector('.recipe-detail--ingredients');

  // Compose left column content
  const leftContent = [];
  if (leftCol) {
    // Title
    const title = leftCol.querySelector('.recipe-detail--title');
    if (title) leftContent.push(title);
    // Description
    const desc = leftCol.querySelector('.recipe-detail--description');
    if (desc) leftContent.push(desc);
    // Share icon/label
    const share = leftCol.querySelector('.recipe-detail--share');
    if (share) leftContent.push(share);
    // Brief info (prep time, servings)
    const brief = leftCol.querySelector('.recipe-detail--brief');
    if (brief) leftContent.push(brief);
  }

  // Compose right column content
  const rightContent = [];
  if (rightCol) {
    // The entire right column is a styled card, so use its main wrapper
    const wrapper = rightCol.querySelector('.ingredients--wrapper');
    if (wrapper) {
      rightContent.push(wrapper);
    } else {
      rightContent.push(rightCol);
    }
  }

  // Table structure
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftContent, rightContent];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
