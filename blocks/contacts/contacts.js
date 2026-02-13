export default function decorate(block) {
  const contacts = [...block.children];
  contacts.forEach((contact) => {
    contact.classList.add('contact');
    const children = [...contact.children];
    // Process each field in the contact
    children.forEach((field, index) => {
      const fieldDiv = field;
      // Assign classes based on the order or content
      if (index === 0) {
        // First field is title
        fieldDiv.classList.add('title');
      } else if (index === 1) {
        // Second field is position
        fieldDiv.classList.add('position');
      } else if (index === 2) {
        // Third field is email
        fieldDiv.classList.add('email');
        const emailText = fieldDiv.textContent.trim();
        if (emailText) {
          // Convert email text to mailto link
          fieldDiv.innerHTML = `<a href="mailto:${emailText}">${emailText}</a>`;
        }
      }
    });
  });
}
