/**
 * Decorate CTA block
 * @param {Element} block The CTA block element
 */
export default function decorate(block) {
  const items = [...block.children];
  items.forEach((cell, index) => {
    // Add classes based on content position
    if (index === 0) {
      cell.classList.add('title');
    } else if (index === 1) {
      cell.classList.add('subtitle');
    } else if (index === 2) {
      cell.classList.add('email');
    }
  });
}
