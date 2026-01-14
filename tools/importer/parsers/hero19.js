/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero19)'];

  // Find the background image (first child div with an <img>)
  const bgImgDiv = element.querySelector(':scope > div.benifits-product__bgimage');
  let bgImg = null;
  if (bgImgDiv) {
    bgImg = bgImgDiv.querySelector('img');
  }

  // Find the main product image (second child div with an <img>)
  const productImgDiv = element.querySelector(':scope > div.benifits-product__imageBox');
  let productImg = null;
  if (productImgDiv) {
    productImg = productImgDiv.querySelector('img');
  }

  // Compose the background image cell (row 2)
  let bgCellContent = bgImg ? [bgImg] : [''];

  // Compose the text cell (row 3) - must be empty since no text in HTML
  const textCell = [''];

  // Build the table with 3 rows
  const cells = [
    headerRow,
    [bgCellContent],
    textCell,
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
