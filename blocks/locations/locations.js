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
      city: cols[5],
      postcode: cols[6],
      country: cols[7],
    };

    // Create location card structure
    const card = document.createElement('div');
    card.className = 'location-card';

    // Images container
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'location-images';

    // Primary image
    if (location.primaryImage && location.primaryImage.querySelector('picture')) {
      const primaryPic = location.primaryImage.querySelector('picture');
      const optimizedPicPrimary = createOptimizedPicture(
        primaryPic.querySelector('img').src,
        primaryPic.querySelector('img').alt,
        false,
        [{ width: '500' }],
      );
      optimizedPicPrimary.classList.add('location-primary-image');
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
      optimizedPicSecondary.classList.add('location-secondary-image');
      imagesContainer.append(optimizedPicSecondary);
    } else {
      // Add single-image class when there's no secondary image
      imagesContainer.classList.add('single-image');
    }

    card.append(imagesContainer);

    // Info container
    const infoContainer = document.createElement('div');
    infoContainer.className = 'location-info';

    // Title
    if (location.title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'location-title';
      titleDiv.textContent = location.title.textContent;
      infoContainer.append(titleDiv);
    }

    // Phone
    if (location.phone) {
      const phoneDiv = document.createElement('div');
      phoneDiv.className = 'location-phone';
      const phoneLink = document.createElement('a');
      phoneLink.href = `tel:${location.phone.textContent}`;
      phoneLink.textContent = location.phone.textContent;
      phoneDiv.append(phoneLink);
      infoContainer.append(phoneDiv);
    }

    // Address
    if (location.address) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'location-address';
      addressDiv.textContent = location.address.textContent;
      infoContainer.append(addressDiv);
    }

    // City
    if (location.city) {
      const cityDiv = document.createElement('div');
      cityDiv.className = 'location-city';
      cityDiv.textContent = location.city.textContent;
      infoContainer.append(cityDiv);
    }

    // Postcode
    if (location.postcode) {
      const postcodeDiv = document.createElement('div');
      postcodeDiv.className = 'location-postcode';
      postcodeDiv.textContent = location.postcode.textContent;
      infoContainer.append(postcodeDiv);
    }

    // Country
    if (location.country) {
      const countryDiv = document.createElement('div');
      countryDiv.className = 'location-country';
      countryDiv.textContent = location.country.textContent;
      infoContainer.append(countryDiv);
    }

    card.append(infoContainer);
    li.append(card);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
