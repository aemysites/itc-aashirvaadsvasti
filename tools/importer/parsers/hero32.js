/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero32) block: 1 column, 3 rows
  // 1. Header row
  const headerRow = ['Hero (hero32)'];

  // 2. Decorative image row (background image)
  // Find the image inside the separator
  let imageRow = [''];
  const separator = element.querySelector('.heading-separator img');
  if (separator) {
    imageRow = [separator]; // Reference the actual image element
  }

  // 3. Content row (title as heading)
  let contentRow = [''];
  const title = element.querySelector('.contact-us__title');
  if (title && title.textContent.trim()) {
    // Use semantic heading (h1) and preserve text
    const h1 = document.createElement('h1');
    h1.textContent = title.textContent.trim();
    contentRow = [h1];
  }

  // Compose rows for the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
