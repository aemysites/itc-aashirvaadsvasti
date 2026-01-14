/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero34)'];

  // 2. Image row (background/hero image)
  const thumbnailImg = element.querySelector('img');
  const imageRow = [thumbnailImg ? thumbnailImg : ''];

  // 3. Content row: extract alt text, iframe title, and convert iframe src to link
  let contentFragments = [];

  // Extract alt text from image if present
  if (thumbnailImg && thumbnailImg.alt && thumbnailImg.alt.trim()) {
    contentFragments.push(thumbnailImg.alt.trim());
  }

  // Extract title from iframe if present
  const iframe = element.querySelector('iframe');
  if (iframe) {
    if (iframe.title && iframe.title.trim()) {
      contentFragments.push(iframe.title.trim());
    }
    // Add video link from iframe src
    if (iframe.src) {
      let ytIdMatch = iframe.src.match(/embed\/(?:https:\/\/youtu\.be\/)?([\w-]{11})/);
      let url = '';
      if (ytIdMatch && ytIdMatch[1]) {
        url = 'https://youtu.be/' + ytIdMatch[1];
      } else {
        url = iframe.src;
      }
      const a = document.createElement('a');
      a.href = url;
      a.textContent = url;
      contentFragments.push(a);
    }
  }

  const contentRow = [contentFragments.length ? contentFragments : ''];
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
