/* ============================================
   CONTACT - Parchment Overlay & Radial Burst Hub
   ============================================ */

function initContact() {
  const contactBtn = document.getElementById('nav-contact-btn');
  const mobNavContact = document.getElementById('mob-nav-contact-btn');
  const contactPopup = document.getElementById('contact-popup');
  const socialIcons = document.querySelectorAll('.contact-icon-wrapper');

  function toggleContactPopup() {
    if (!contactPopup) return;
    const isActive = contactPopup.classList.contains('active');

    if (!isActive) {
      const isMobile = window.innerWidth <= 768;
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      if (!isMobile && contactBtn && contactBtn.offsetParent !== null) {
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
      const popupRadius = window.innerWidth < 480 ? 80 : 95;

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

  if (mobNavContact) {
    mobNavContact.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.closeMobileNav === 'function') {
        window.closeMobileNav();
      }
      setTimeout(() => {
        toggleContactPopup();
      }, 150);
    });
  }

  // Close on click outside (safeguard trigger buttons)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#nav-contact-btn, #mob-nav-contact-btn, .contact-popup')) return;
    if (contactPopup && contactPopup.classList.contains('active')) {
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
