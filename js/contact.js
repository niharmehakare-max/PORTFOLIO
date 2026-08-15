/* ============================================
   CONTACT - Radial Popup Burst
   ============================================ */

function initContact() {
  const contactBtn = document.getElementById('nav-contact-btn');
  const contactPopup = document.getElementById('contact-popup');
  const socialIcons = document.querySelectorAll('.contact-icon-wrapper');
  const popupRadius = 90; // distance in px from center

  if (contactBtn && contactPopup) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isActive = contactPopup.classList.contains('active');

      if (!isActive) {
        const btnRect = contactBtn.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width / 2;

        // Position popup centered just below the button
        contactPopup.style.left = centerX + 'px';
        contactPopup.style.top = (btnRect.bottom + 50) + 'px';

        contactPopup.classList.add('active');

        // Shoot out the social icons dynamically based on item count
        const count = socialIcons.length;
        socialIcons.forEach((icon, idx) => {
          // Evenly distribute icons around 360 degrees starting at -90 deg (top)
          const angleDeg = (360 / count) * idx - 90;
          const rad = angleDeg * (Math.PI / 180);
          const tx = Math.cos(rad) * popupRadius;
          const ty = Math.sin(rad) * popupRadius;

          icon.style.transitionDelay = `${idx * 0.04}s`;
          icon.style.transform = `translate(${tx}px, ${ty}px) scale(1)`;
          icon.style.opacity = '1';
        });
      } else {
        closeContactPopup();
      }
    });

    function closeContactPopup() {
      contactPopup.classList.remove('active');
      socialIcons.forEach((icon) => {
        icon.style.transitionDelay = '0s';
        icon.style.transform = 'translate(0, 0) scale(0)';
        icon.style.opacity = '0';
      });
    }

    // Dismiss on click outside
    document.addEventListener('click', (e) => {
      if (contactPopup.classList.contains('active') && !contactPopup.contains(e.target) && e.target !== contactBtn) {
        closeContactPopup();
      }
    });

    // Dismiss on scroll
    window.addEventListener('scroll', () => {
      if (contactPopup.classList.contains('active')) {
        closeContactPopup();
      }
    }, { passive: true });
  }

}
