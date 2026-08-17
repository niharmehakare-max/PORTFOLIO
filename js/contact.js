/* ============================================
   CONTACT - Parchment Overlay & Radial Burst Hub
   ============================================ */

function initContact() {
  const contactBtn = document.getElementById('nav-contact-btn');
  const contactPopup = document.getElementById('contact-popup');
  const socialIcons = document.querySelectorAll('.contact-icon-wrapper');
  const popupRadius = window.innerWidth < 480 ? 75 : 90;

  function toggleContactPopup() {
    if (!contactPopup) return;
    const isActive = contactPopup.classList.contains('active');

    if (!isActive) {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      if (contactBtn && contactBtn.offsetParent !== null) {
        const btnRect = contactBtn.getBoundingClientRect();
        if (btnRect.width > 0 && btnRect.height > 0) {
          centerX = btnRect.left + btnRect.width / 2;
          centerY = btnRect.bottom + 50;
        }
      }

      contactPopup.style.left = `${centerX}px`;
      contactPopup.style.top = `${centerY}px`;
      contactPopup.classList.add('active');

      const count = socialIcons.length;
      socialIcons.forEach((icon, idx) => {
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
  }

  function closeContactPopup() {
    if (!contactPopup) return;
    contactPopup.classList.remove('active');
    socialIcons.forEach((icon) => {
      icon.style.transitionDelay = '0s';
      icon.style.transform = 'translate(0, 0) scale(0)';
      icon.style.opacity = '0';
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleContactPopup();
    });
  }

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (contactPopup && contactPopup.classList.contains('active') && !contactPopup.contains(e.target) && e.target !== contactBtn) {
      closeContactPopup();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactPopup && contactPopup.classList.contains('active')) {
      closeContactPopup();
    }
  });

  // Close on scroll
  window.addEventListener('scroll', () => {
    if (contactPopup && contactPopup.classList.contains('active')) {
      closeContactPopup();
    }
  }, { passive: true });

  window.openContact = toggleContactPopup;
  window.toggleContactPopup = toggleContactPopup;
}
