export default function decorate(block) {
  const title = block.querySelector('h1, h2, h3, h4, h5, h6');
  const description = block.querySelector('p');
  const link = block.querySelector('a');

  // Clear the block
  block.innerHTML = '';

  // Create CTA container
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'cta-container';

  // Add title if exists
  if (title) {
    const ctaTitle = document.createElement('div');
    ctaTitle.className = 'cta-title';
    ctaTitle.appendChild(title);
    ctaContainer.appendChild(ctaTitle);
  }

  // Add description if exists
  if (description) {
    const ctaDescription = document.createElement('div');
    ctaDescription.className = 'cta-description';
    ctaDescription.appendChild(description);
    ctaContainer.appendChild(ctaDescription);
  }

  // Add CTA button if exists
  if (link) {
    const ctaButton = document.createElement('div');
    ctaButton.className = 'cta-button';
    link.className = 'button';
    ctaButton.appendChild(link);
    ctaContainer.appendChild(ctaButton);
  }

  block.appendChild(ctaContainer);
}

