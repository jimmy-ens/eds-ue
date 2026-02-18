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
      const subtitle = cell.textContent.trim();
      const subtitleElm = document.createElement('div');
      subtitleElm.textContent = subtitle;
      cell.innerHTML = '';
      cell.appendChild(subtitleElm);
    } else if (index === 2) {
      cell.classList.add('email');
      const emailText = cell.textContent.trim();
      if (emailText) {
        const mailtoLink = document.createElement('a');
        mailtoLink.href = `mailto:${emailText}`;
        mailtoLink.textContent = emailText;
        mailtoLink.className = cell.className;
        mailtoLink.classList.add('button');
        cell.innerHTML = '';
        cell.appendChild(mailtoLink);
      }
    }
  });
}
