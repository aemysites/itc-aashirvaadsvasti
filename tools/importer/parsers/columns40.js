/* global WebImporter */
export default function parse(element, { document }) {
  // --- COLUMN 1: Left side (Title, Description, Share, Prep Time, Servings) ---
  const leftCol = element.querySelector('.recipe-detail--container');
  const leftFrag = document.createDocumentFragment();

  // Title
  const title = leftCol && leftCol.querySelector('.recipe-detail--title');
  if (title) leftFrag.appendChild(title.cloneNode(true));

  // Description (include all paragraphs)
  const desc = leftCol && leftCol.querySelector('.recipe-detail--description');
  if (desc) {
    // Get all paragraphs inside description
    const paragraphs = desc.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.textContent.trim()) {
        leftFrag.appendChild(p.cloneNode(true));
      }
    });
  }

  // Share button (icon + label)
  const share = leftCol && leftCol.querySelector('.recipe-detail--share');
  if (share) leftFrag.appendChild(share.cloneNode(true));

  // Prep time and Servings (the two stat blocks)
  const brief = leftCol && leftCol.querySelector('.recipe-detail--brief');
  if (brief) leftFrag.appendChild(brief.cloneNode(true));

  // --- COLUMN 2: Right side (Ingredients) ---
  const rightCol = element.querySelector('.recipe-detail--ingredients');
  let rightFrag = null;
  if (rightCol) {
    rightFrag = document.createDocumentFragment();
    // Ingredients heading
    const heading = rightCol.querySelector('.font-baskerville');
    if (heading) rightFrag.appendChild(heading.cloneNode(true));
    // Separator image
    const separator = rightCol.querySelector('.heading-separator img');
    if (separator) rightFrag.appendChild(separator.cloneNode(true));
    // Ingredients list
    const ul = rightCol.querySelector('.ingredients--list');
    if (ul) rightFrag.appendChild(ul.cloneNode(true));
  }

  // --- Build the table ---
  const headerRow = ['Columns (columns40)'];
  const contentRow = [leftFrag, rightFrag];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
