/**
 * HerPromoCodes - Main JavaScript
 * Handles coupon rendering, live search, filtering, modals, clipboard copying & cookie consent
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Data: Stores & Active Deals/Coupons (10 Top Brands)
  // ==========================================
  const storesData = [
    { id: 'sephora', name: 'Sephora', count: 'Beauty & Skincare', initial: 'SP', color: '#000000', category: 'beauty' },
    { id: 'nike', name: 'Nike', count: 'Shoes & Sportswear', initial: 'NK', color: '#f59e0b', category: 'fashion' },
    { id: 'zara', name: 'Zara', count: 'Clothing & Fashion', initial: 'ZR', color: '#111827', category: 'fashion' },
    { id: 'asos', name: 'ASOS', count: 'Trending Outfits', initial: 'AS', color: '#f43f5e', category: 'fashion' },
    { id: 'ulta', name: 'Ulta Beauty', count: 'Makeup & Haircare', initial: 'UB', color: '#e11d48', category: 'beauty' },
    { id: 'amazon', name: 'Amazon', count: 'Online Retail', initial: 'AZ', color: '#ff9900', category: 'electronics' },
    { id: 'glossier', name: 'Glossier', count: 'Clean Cosmetics', initial: 'GL', color: '#ec4899', category: 'beauty' },
    { id: 'shein', name: 'Shein', count: 'Fashion & Outfits', initial: 'SH', color: '#8b5cf6', category: 'fashion' },
    { id: 'apple', name: 'Apple', count: 'Tech & Devices', initial: 'AP', color: '#64748b', category: 'electronics' },
    { id: 'nordstrom', name: 'Nordstrom', count: 'Designer Styles', initial: 'ND', color: '#4338ca', category: 'fashion' }
  ];

  const dealsData = [
    {
      id: 1,
      store: 'Sephora',
      storeInitial: 'SP',
      type: 'code',
      code: 'HERGLOW20',
      discount: '20% OFF',
      title: '20% Off Orders $50+ Sitewide',
      desc: 'Get 20% discount on skincare, makeup, and fragrances with this promo code.',
      category: 'beauty',
      verified: 'Verified Code',
      expires: 'Limited Time Offer',
      storeUrl: 'https://www.sephora.com'
    },
    {
      id: 2,
      store: 'Nike',
      storeInitial: 'NK',
      type: 'code',
      code: 'JUSTSAVE25',
      discount: '25% OFF',
      title: '25% Off Select Sneakers & Sportswear',
      desc: 'Save 25% on selected running shoes, athletic apparel, and accessories.',
      category: 'fashion',
      verified: 'Verified Code',
      expires: 'Special Offer',
      storeUrl: 'https://www.nike.com'
    },
    {
      id: 3,
      store: 'Ulta Beauty',
      storeInitial: 'UB',
      type: 'code',
      code: 'ULTAMAGIC',
      discount: '$15 OFF',
      title: '$15 Off $50 Order Sitewide',
      desc: 'Apply promo code during checkout for $15 savings on makeup and haircare.',
      category: 'beauty',
      verified: 'Verified Code',
      expires: 'Active Promo',
      storeUrl: 'https://www.ulta.com'
    },
    {
      id: 4,
      store: 'Zara',
      storeInitial: 'ZR',
      type: 'deal',
      code: '',
      discount: 'UP TO 50% OFF',
      title: 'Seasonal Fashion Sale',
      desc: 'Save up to 50% on women coats, dresses, blazers, and shoes. Direct store deal.',
      category: 'fashion',
      verified: 'Active Deal',
      expires: 'Ongoing Deal',
      storeUrl: 'https://www.zara.com'
    },
    {
      id: 5,
      store: 'ASOS',
      storeInitial: 'AS',
      type: 'code',
      code: 'ASOSHER30',
      discount: '$30 OFF',
      title: '$30 Off Orders Over $120',
      desc: 'Enjoy $30 off on trending party wear, streetwear, and footwear collection.',
      category: 'fashion',
      verified: 'Verified Code',
      expires: 'Limited Time Offer',
      storeUrl: 'https://www.asos.com'
    },
    {
      id: 6,
      store: 'Amazon',
      storeInitial: 'AZ',
      type: 'code',
      code: 'PRIMEBEAUTY',
      discount: '$10 OFF',
      title: '$10 Off Luxury Beauty Order',
      desc: 'Get $10 promotional savings on your first eligible premium beauty purchase.',
      category: 'electronics',
      verified: 'Verified Code',
      expires: 'Active Promo',
      storeUrl: 'https://www.amazon.com'
    },
    {
      id: 7,
      store: 'Glossier',
      storeInitial: 'GL',
      type: 'code',
      code: 'GLOWWITHHER',
      discount: '15% OFF',
      title: '15% Off Your First Purchase',
      desc: 'Save 15% on bestselling skincare sets, lip glosses, and beauty essentials.',
      category: 'beauty',
      verified: 'Verified Code',
      expires: 'First Order Offer',
      storeUrl: 'https://www.glossier.com'
    },
    {
      id: 8,
      store: 'Shein',
      storeInitial: 'SH',
      type: 'code',
      code: 'SHEINHER20',
      discount: '20% OFF',
      title: '20% Off Orders Over $69',
      desc: 'Apply promo code for 20% off modern fashion apparel, shoes, and accessories.',
      category: 'fashion',
      verified: 'Verified Code',
      expires: 'Active Promo',
      storeUrl: 'https://www.shein.com'
    },
    {
      id: 9,
      store: 'Apple',
      storeInitial: 'AP',
      type: 'deal',
      code: '',
      discount: 'UP TO $250 OFF',
      title: 'Trade-In Credit Offer',
      desc: 'Get up to $250 promotional trade-in value on eligible Mac and iPad upgrades.',
      category: 'electronics',
      verified: 'Active Deal',
      expires: 'Ongoing Offer',
      storeUrl: 'https://www.apple.com'
    },
    {
      id: 10,
      store: 'Nordstrom',
      storeInitial: 'ND',
      type: 'code',
      code: 'NORDHER15',
      discount: '15% OFF',
      title: '15% Off Designer Bags & Footwear',
      desc: 'Save 15% on qualifying luxury brand handbags, heels, and accessories.',
      category: 'fashion',
      verified: 'Verified Code',
      expires: 'Special Offer',
      storeUrl: 'https://www.nordstrom.com'
    }
  ];

  // State management
  let currentCategory = 'all';
  let currentType = 'all';
  let searchQuery = '';
  let selectedStoreFilter = '';

  // DOM Elements
  const storesGrid = document.getElementById('storesGrid');
  const dealsGrid = document.getElementById('dealsGrid');
  const dealCountEl = document.getElementById('dealCount');
  const noResultsEl = document.getElementById('noResults');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');
  const resetStoreFilter = document.getElementById('resetStoreFilter');
  const resetAllFiltersBtn = document.getElementById('resetAllFiltersBtn');

  // Modals & Elements
  const couponModal = document.getElementById('couponModal');
  const closeCouponModal = document.getElementById('closeCouponModal');
  const modalStoreAvatar = document.getElementById('modalStoreAvatar');
  const couponModalTitle = document.getElementById('couponModalTitle');
  const couponModalDesc = document.getElementById('couponModalDesc');
  const revealedCodeText = document.getElementById('revealedCodeText');
  const modalCopyBtn = document.getElementById('modalCopyBtn');
  const copyBtnLabel = document.getElementById('copyBtnLabel');
  const modalStoreName = document.getElementById('modalStoreName');
  const modalVisitStoreBtn = document.getElementById('modalVisitStoreBtn');

  // Policy Modals Elements
  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const closePrivacyModal = document.getElementById('closePrivacyModal');
  const closePrivacyFooterBtn = document.getElementById('closePrivacyFooterBtn');
  const inlinePrivacyBtn = document.getElementById('inlinePrivacyBtn');
  const bannerPrivacyBtn = document.getElementById('bannerPrivacyBtn');

  const cookiesModal = document.getElementById('cookiesModal');
  const openCookiesBtn = document.getElementById('openCookiesBtn');
  const closeCookiesModal = document.getElementById('closeCookiesModal');
  const closeCookiesFooterBtn = document.getElementById('closeCookiesFooterBtn');
  const inlineCookiesBtn = document.getElementById('inlineCookiesBtn');
  const bannerCookiesBtn = document.getElementById('bannerCookiesBtn');
  const openSettingsFromCookiesBtn = document.getElementById('openSettingsFromCookiesBtn');

  const cookieSettingsModal = document.getElementById('cookieSettingsModal');
  const openCookieSettingsBtn = document.getElementById('openCookieSettingsBtn');
  const closeCookieSettingsModal = document.getElementById('closeCookieSettingsModal');
  const acceptAllCookiesModalBtn = document.getElementById('acceptAllCookiesModalBtn');
  const saveCookiePreferencesBtn = document.getElementById('saveCookiePreferencesBtn');
  const bannerPreferencesBtn = document.getElementById('bannerPreferencesBtn');

  const submitModal = document.getElementById('submitModal');
  const openSubmitModal = document.getElementById('openSubmitModal');
  const closeSubmitModal = document.getElementById('closeSubmitModal');
  const submitCouponForm = document.getElementById('submitCouponForm');

  const cookieBanner = document.getElementById('cookieBanner');
  const bannerAcceptBtn = document.getElementById('bannerAcceptBtn');
  const bannerDeclineBtn = document.getElementById('bannerDeclineBtn');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Set Current Year in Footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  // ==========================================
  // 2. Render Functions
  // ==========================================

  // Render Stores Grid
  function renderStores() {
    if (!storesGrid) return;
    storesGrid.innerHTML = storesData.map(store => `
      <div class="store-card ${selectedStoreFilter.toLowerCase() === store.name.toLowerCase() ? 'selected' : ''}" data-store="${store.name}">
        <div class="store-card__logo">${store.initial}</div>
        <div class="store-card__name">${store.name}</div>
        <div class="store-card__count">${store.count}</div>
      </div>
    `).join('');

    // Attach click events
    storesGrid.querySelectorAll('.store-card').forEach(card => {
      card.addEventListener('click', () => {
        const storeName = card.getAttribute('data-store');
        if (selectedStoreFilter.toLowerCase() === storeName.toLowerCase()) {
          selectedStoreFilter = '';
        } else {
          selectedStoreFilter = storeName;
        }
        renderStores();
        renderDeals();
        scrollToDeals();
      });
    });
  }

  // Filter and Render Deals
  function renderDeals() {
    if (!dealsGrid) return;

    const filtered = dealsData.filter(deal => {
      // Category match
      const matchCategory = currentCategory === 'all' || deal.category === currentCategory;
      // Type match (code vs deal)
      const matchType = currentType === 'all' || deal.type === currentType;
      // Store filter match
      const matchStore = !selectedStoreFilter || deal.store.toLowerCase() === selectedStoreFilter.toLowerCase();
      // Search text match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = !query || 
        deal.store.toLowerCase().includes(query) ||
        deal.title.toLowerCase().includes(query) ||
        deal.desc.toLowerCase().includes(query) ||
        (deal.code && deal.code.toLowerCase().includes(query));

      return matchCategory && matchType && matchStore && matchSearch;
    });

    dealCountEl.textContent = filtered.length;

    if (filtered.length === 0) {
      dealsGrid.innerHTML = '';
      noResultsEl.style.display = 'block';
      return;
    }

    noResultsEl.style.display = 'none';

    dealsGrid.innerHTML = filtered.map(deal => {
      const isCode = deal.type === 'code';
      return `
        <article class="deal-card">
          <div class="deal-card__top">
            <div class="deal-card__store-info">
              <div class="deal-card__logo">${deal.storeInitial}</div>
              <div>
                <div class="deal-card__store-name">${deal.store}</div>
                <div class="deal-card__meta">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${deal.expires}
                </div>
              </div>
            </div>
            <span class="deal-badge ${isCode ? 'code' : 'deal'}">${isCode ? 'Coupon Code' : 'Sale / Deal'}</span>
          </div>

          <div class="deal-card__discount">${deal.discount}</div>
          <h3 class="deal-card__title">${deal.title}</h3>
          <p class="deal-card__desc">${deal.desc}</p>

          <div class="deal-card__footer">
            <div class="deal-card__status">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${deal.verified}
            </div>
            ${isCode ? `
              <button class="cta-btn-voucher" data-deal-id="${deal.id}" aria-label="Get Promo Code for ${deal.store}">
                <span class="voucher-text">Get Code</span>
                <span class="voucher-code-stub">•••</span>
              </button>
            ` : `
              <button class="cta-btn-deal" data-deal-id="${deal.id}" aria-label="Get Deal for ${deal.store}">
                Get Deal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            `}
          </div>
        </article>
      `;
    }).join('');

    // Attach click events on coupon/deal buttons
    attachDealCardActions();
  }

  function attachDealCardActions() {
    document.querySelectorAll('.cta-btn-voucher').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dealId = parseInt(btn.getAttribute('data-deal-id'), 10);
        const deal = dealsData.find(d => d.id === dealId);
        if (deal) openCouponModalWithDeal(deal);
      });
    });

    document.querySelectorAll('.cta-btn-deal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dealId = parseInt(btn.getAttribute('data-deal-id'), 10);
        const deal = dealsData.find(d => d.id === dealId);
        if (deal) {
          showToast(`Deal activated! Redirecting to ${deal.store}...`);
          window.open(deal.storeUrl || '#', '_blank');
        }
      });
    });
  }

  function scrollToDeals() {
    const dealsSection = document.getElementById('deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ==========================================
  // 3. Coupon Modal & Clipboard Copy
  // ==========================================
  let activeDeal = null;

  function openCouponModalWithDeal(deal) {
    activeDeal = deal;
    modalStoreAvatar.textContent = deal.storeInitial;
    couponModalTitle.textContent = deal.title;
    couponModalDesc.textContent = deal.desc;
    revealedCodeText.textContent = deal.code;
    modalStoreName.textContent = deal.store;
    modalVisitStoreBtn.href = deal.storeUrl || '#';

    // Reset copy button state
    modalCopyBtn.classList.remove('copied');
    copyBtnLabel.textContent = 'Copy Code';

    // Open Modal
    openModal(couponModal);

    // Auto-copy to clipboard right away for convenient UX
    copyCodeToClipboard(deal.code, false);
  }

  function copyCodeToClipboard(code, userInitiated = true) {
    if (!navigator.clipboard) {
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = code;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      onCopySuccess(code, userInitiated);
      return;
    }

    navigator.clipboard.writeText(code).then(() => {
      onCopySuccess(code, userInitiated);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
    });
  }

  function onCopySuccess(code, showToastMsg = true) {
    modalCopyBtn.classList.add('copied');
    copyBtnLabel.textContent = 'COPIED!';
    if (showToastMsg) {
      showToast(`Promo Code "${code}" copied to clipboard! 🎉`);
    }
  }

  modalCopyBtn.addEventListener('click', () => {
    if (activeDeal && activeDeal.code) {
      copyCodeToClipboard(activeDeal.code, true);
    }
  });

  // ==========================================
  // 4. Modal Helpers & Overlay Management
  // ==========================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    // Only restore scroll if no other modals are open
    const openModals = document.querySelectorAll('.modal-overlay.open');
    if (openModals.length === 0) {
      document.body.style.overflow = '';
    }
  }

  // Close when clicking modal close button or clicking outside modal content
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Keyboard Escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => closeModal(modal));
    }
  });

  // Modal Close buttons
  if (closeCouponModal) closeCouponModal.addEventListener('click', () => closeModal(couponModal));

  // Privacy Policy Modal Triggers
  [openPrivacyBtn, inlinePrivacyBtn, bannerPrivacyBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  });
  if (closePrivacyModal) closePrivacyModal.addEventListener('click', () => closeModal(privacyModal));
  if (closePrivacyFooterBtn) closePrivacyFooterBtn.addEventListener('click', () => closeModal(privacyModal));

  // Cookies Policy Modal Triggers
  [openCookiesBtn, inlineCookiesBtn, bannerCookiesBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(cookiesModal);
    });
  });
  if (closeCookiesModal) closeCookiesModal.addEventListener('click', () => closeModal(cookiesModal));
  if (closeCookiesFooterBtn) closeCookiesFooterBtn.addEventListener('click', () => closeModal(cookiesModal));

  // Cookie Settings / Preferences Modal Triggers
  [openCookieSettingsBtn, bannerPreferencesBtn, openSettingsFromCookiesBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(cookiesModal); // If opened from inside cookies policy
      openModal(cookieSettingsModal);
    });
  });
  if (closeCookieSettingsModal) closeCookieSettingsModal.addEventListener('click', () => closeModal(cookieSettingsModal));

  if (saveCookiePreferencesBtn) {
    saveCookiePreferencesBtn.addEventListener('click', () => {
      localStorage.setItem('herpromocodes_cookie_consent', 'customized');
      hideCookieBanner();
      closeModal(cookieSettingsModal);
      showToast('Cookie preferences successfully saved! ✓');
    });
  }

  if (acceptAllCookiesModalBtn) {
    acceptAllCookiesModalBtn.addEventListener('click', () => {
      localStorage.setItem('herpromocodes_cookie_consent', 'accepted');
      hideCookieBanner();
      closeModal(cookieSettingsModal);
      showToast('All cookies accepted.');
    });
  }

  // Terms of Service inline button
  const inlineTermsBtn = document.getElementById('inlineTermsBtn');
  if (inlineTermsBtn) {
    inlineTermsBtn.addEventListener('click', () => {
      openModal(privacyModal);
    });
  }

  // Submit Coupon Modal Triggers
  if (openSubmitModal) openSubmitModal.addEventListener('click', () => openModal(submitModal));
  if (closeSubmitModal) closeSubmitModal.addEventListener('click', () => closeModal(submitModal));

  if (submitCouponForm) {
    submitCouponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const store = document.getElementById('submitStore').value.trim();
      const code = document.getElementById('submitCode').value.trim().toUpperCase();
      const discount = document.getElementById('submitDiscount').value.trim().toUpperCase();
      const desc = document.getElementById('submitDesc').value.trim() || `${discount} sitewide discount offer.`;
      const category = document.getElementById('submitCategory').value;

      if (store && code) {
        // Add new deal dynamically to the top of list
        const newDeal = {
          id: Date.now(),
          store: store,
          storeInitial: store.substring(0, 2).toUpperCase(),
          type: 'code',
          code: code,
          discount: discount,
          title: `${discount} - Special Promo Code`,
          desc: desc,
          category: category,
          verified: 'User Submitted',
          used: 1,
          expires: 'Newly added',
          storeUrl: '#'
        };

        dealsData.unshift(newDeal);
        renderDeals();
        submitCouponForm.reset();
        closeModal(submitModal);
        showToast(`Thank you! Promo code for ${store} submitted.`);
        scrollToDeals();
      }
    });
  }

  // ==========================================
  // 5. Search & Filters
  // ==========================================

  // Live Search Input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderDeals();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderDeals();
    searchInput.focus();
  });

  searchSubmitBtn.addEventListener('click', () => {
    searchQuery = searchInput.value;
    renderDeals();
    scrollToDeals();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchQuery = searchInput.value;
      renderDeals();
      scrollToDeals();
    }
  });

  // Trending Chips in Hero
  document.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const store = chip.getAttribute('data-store');
      searchInput.value = store;
      searchQuery = store;
      clearSearchBtn.style.display = 'block';
      selectedStoreFilter = store;
      renderStores();
      renderDeals();
      scrollToDeals();
    });
  });

  // Category Pills Filter
  const categoryPills = document.querySelectorAll('.cat-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderDeals();
    });
  });

  // Deal Type Tabs (All / Codes / Sales)
  const typeTabs = document.querySelectorAll('.type-tab');
  typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      typeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentType = tab.getAttribute('data-type');
      renderDeals();
    });
  });

  // Reset Filters Buttons
  if (resetStoreFilter) {
    resetStoreFilter.addEventListener('click', () => {
      selectedStoreFilter = '';
      renderStores();
      renderDeals();
    });
  }

  if (resetAllFiltersBtn) {
    resetAllFiltersBtn.addEventListener('click', () => {
      selectedStoreFilter = '';
      searchQuery = '';
      currentCategory = 'all';
      currentType = 'all';
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';

      // Reset pill UI
      categoryPills.forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('.cat-pill[data-category="all"]');
      if (allPill) allPill.classList.add('active');

      // Reset tab UI
      typeTabs.forEach(t => t.classList.remove('active'));
      const allType = document.querySelector('.type-tab[data-type="all"]');
      if (allType) allType.classList.add('active');

      renderStores();
      renderDeals();
    });
  }

  // Footer Category / Store filter links
  document.querySelectorAll('.footer-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category');
      currentCategory = cat;
      categoryPills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-category') === cat);
      });
      renderDeals();
      scrollToDeals();
    });
  });

  document.querySelectorAll('.footer-store-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const store = link.getAttribute('data-store');
      selectedStoreFilter = store;
      renderStores();
      renderDeals();
      scrollToDeals();
    });
  });

  // ==========================================
  // 6. Cookie Consent Banner Handling
  // ==========================================
  function checkCookieConsent() {
    const consent = localStorage.getItem('herpromocodes_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        if (cookieBanner) cookieBanner.classList.add('show');
      }, 800);
    }
  }

  function hideCookieBanner() {
    if (cookieBanner) cookieBanner.classList.remove('show');
  }

  if (bannerAcceptBtn) {
    bannerAcceptBtn.addEventListener('click', () => {
      localStorage.setItem('herpromocodes_cookie_consent', 'accepted');
      hideCookieBanner();
      showToast('Cookies accepted. Enjoy uninterrupted savings!');
    });
  }

  if (bannerDeclineBtn) {
    bannerDeclineBtn.addEventListener('click', () => {
      localStorage.setItem('herpromocodes_cookie_consent', 'declined');
      hideCookieBanner();
      showToast('Non-essential cookies declined.');
    });
  }

  // ==========================================
  // 7. Newsletter & Mobile Navigation
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! Check your inbox for secret promo codes.');
        newsletterForm.reset();
      }
    });
  }

  // Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 8. Toast Helper
  // ==========================================
  let toastTimer = null;
  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // Initial Run
  // ==========================================
  renderStores();
  renderDeals();
  checkCookieConsent();

});
