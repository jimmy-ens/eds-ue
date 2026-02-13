import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cols = [...row.children];
    const location = {
      primaryImage: cols[0],
      secondaryImage: cols[1],
      title: cols[2],
      phone: cols[3],
      address: cols[4],
      country: cols[5],
    };

    // Create location card structure
    const card = document.createElement('div');
    card.className = 'locations-card';

    // Images container
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'locations-images';

    // Primary image
    if (location.primaryImage && location.primaryImage.querySelector('picture')) {
      const primaryPic = location.primaryImage.querySelector('picture');
      const optimizedPicPrimary = createOptimizedPicture(
        primaryPic.querySelector('img').src,
        primaryPic.querySelector('img').alt,
        false,
        [{ width: '500' }],
      );
      optimizedPicPrimary.querySelector('img').classList.add('locations-primary-image');
      imagesContainer.append(optimizedPicPrimary);
    }

    // Secondary image
    if (location.secondaryImage && location.secondaryImage.querySelector('picture')) {
      const secondaryPic = location.secondaryImage.querySelector('picture');
      const optimizedPicSecondary = createOptimizedPicture(
        secondaryPic.querySelector('img').src,
        secondaryPic.querySelector('img').alt,
        false,
        [{ width: '500' }],
      );
      optimizedPicSecondary.querySelector('img').classList.add('locations-secondary-image');
      imagesContainer.append(optimizedPicSecondary);
    }

    card.append(imagesContainer);

    // Info container
    const infoContainer = document.createElement('div');
    infoContainer.className = 'locations-info';

    // Title
    if (location.title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'locations-title';
      titleDiv.textContent = location.title.textContent;
      infoContainer.append(titleDiv);
    }

    // Address
    if (location.address) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'locations-address';
      addressDiv.textContent = location.address.textContent;
      infoContainer.append(addressDiv);
    }

    // Country
    if (location.country) {
      const countryDiv = document.createElement('div');
      countryDiv.className = 'locations-country';
      countryDiv.textContent = location.country.textContent;
      infoContainer.append(countryDiv);
    }

    // Phone
    if (location.phone) {
      const phoneDiv = document.createElement('div');
      phoneDiv.className = 'locations-phone';
      const phoneLink = document.createElement('a');
      phoneLink.href = `tel:${location.phone.textContent}`;
      phoneLink.textContent = location.phone.textContent;
      phoneDiv.append(phoneLink);
      infoContainer.append(phoneDiv);
    }

    card.append(infoContainer);
    li.append(card);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
