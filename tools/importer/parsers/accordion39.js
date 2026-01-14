/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell with the block name
  const headerRow = ['Accordion (accordion39)'];
  const rows = [headerRow];

  // Each accordion item becomes a row with two columns: [title, content]
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    // Title: from button > span.cmp-accordion__title
    let title = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }
    // Content: from panel > .cmp-text or all panel children
    let content = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        const nodes = Array.from(cmpText.childNodes).filter(node => {
          if (node.nodeType === Node.ELEMENT_NODE) return true;
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
          return false;
        });
        content = nodes.length === 1 ? nodes[0] : nodes;
      } else {
        const nodes = Array.from(panel.childNodes).filter(node => {
          if (node.nodeType === Node.ELEMENT_NODE) return true;
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
          return false;
        });
        content = nodes.length === 1 ? nodes[0] : nodes;
      }
    }
    rows.push([title, content]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
