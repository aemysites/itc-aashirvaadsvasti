/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Embed block
  const headerRow = ['Embed (embedSocial27)'];

  // Find the YouTube embed URL from the hidden div
  let embedUrl = '';
  const youtubeDiv = element.querySelector('[data-youtube-id]');
  if (youtubeDiv) {
    embedUrl = youtubeDiv.getAttribute('data-youtube-id');
  }

  // If no embed URL found, try to find any <a> or <iframe> with a YouTube link
  if (!embedUrl) {
    const aTag = element.querySelector('a[href*="youtube.com"]');
    if (aTag) embedUrl = aTag.href;
    const iframe = element.querySelector('iframe[src*="youtube.com"]');
    if (iframe) embedUrl = iframe.src;
  }

  // If still no embed URL, do not proceed
  if (!embedUrl) return;

  // Find the video thumbnail image
  const previewImg = element.querySelector('img.video-catalog__item--youtube');
  let imgEl = null;
  if (previewImg) {
    imgEl = document.createElement('img');
    imgEl.src = previewImg.src;
    imgEl.alt = previewImg.alt || '';
    imgEl.style.maxWidth = '100%';
  }

  // Find the play button SVG image
  const playBtnImg = Array.from(element.querySelectorAll('img')).find(img => img.src.startsWith('data:image/svg+xml'));
  let playBtnEl = null;
  if (playBtnImg) {
    playBtnEl = document.createElement('img');
    playBtnEl.src = playBtnImg.src;
    playBtnEl.alt = playBtnImg.alt || 'Play';
    playBtnEl.style.height = '40px';
    playBtnEl.style.width = '40px';
    playBtnEl.style.display = 'inline-block';
    playBtnEl.style.verticalAlign = 'middle';
  }

  // Compose cell content: thumbnail image, play button overlay, and embed link
  const cellContent = [];
  if (imgEl) cellContent.push(imgEl);
  if (playBtnEl) cellContent.push(playBtnEl);
  const link = document.createElement('a');
  link.href = embedUrl;
  link.textContent = embedUrl;
  cellContent.push(link);

  // Second row: single cell containing the thumbnail image, play button overlay, and the embed URL
  const contentRow = [cellContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
