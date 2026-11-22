/**
 * PromoBella - Main Interactive Script
 * Handles:
 * - 10 Verified Stores with custom brand graphics & filter
 * - 10 Top Deals with "Show Code" folded corner buttons
 * - Instant Live Search & Filter Pills
 * - Coupon Code Reveal Modal with 1-Click Clipboard Copy
 * - Accordion Toggle & Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Data: 10 Stores
  // ==========================================
  const stores = [
    {
      id: 'amazon',
      name: 'Amazon',
      logo: 'assets/logos/amazon.svg',
      category: 'electronics'
    },
    {
      id: 'nike',
      name: 'Nike',
      logo: 'assets/logos/nike.svg',
      category: 'fashion'
    },
    {
      id: 'sephora',
      name: 'Sephora',
      logo: 'assets/logos/sephora.svg',
      category: 'beauty'
    },
    {
      id: 'zara',
      name: 'Zara',
      logo: 'assets/logos/zara.svg',
      category: 'fashion'
    },
    {
      id: 'asos',
      name: 'ASOS',
      logo: 'assets/logos/asos.svg',
      category: 'fashion'
    },
    {
      id: 'ulta',
      name: 'Ulta Beauty',
      logo: 'assets/logos/ulta.svg',
      category: 'beauty'
    },
    {
      id: 'glossier',
      name: 'Glossier',
      logo: 'assets/logos/glossier.svg',
      category: 'beauty'
    },
    {
      id: 'shein',
      name: 'Shein',
      logo: 'assets/logos/shein.svg',
      category: 'fashion'
    },
    {
      id: 'apple',
      name: 'Apple',
      logo: 'assets/logos/apple.svg',
      category: 'electronics'
    },
    {
      id: 'nordstrom',
      name: 'Nordstrom',
      logo: 'assets/logos/nordstrom.svg',
      category: 'fashion'
    }
  ];

  // ==========================================
  // 2. Data: 10 Top Deals
  // ==========================================
  const deals = [
    {
      id: 1,
      storeId: 'sephora',
      storeName: 'Sephora',
      type: 'code',
      code: 'BEAUTY20',
      cornerText: 'BEA',
      title: '20% Off Sitewide Orders $50+',
      url: 'https://www.sephora.com',
      category: 'beauty'
    },
    {
      id: 2,
      storeId: 'nike',
      storeName: 'Nike',
      type: 'code',
      code: 'RUNFAST25',
      cornerText: 'RUN',
      title: '25% Off Select Sneaker Styles',
      url: 'https://www.nike.com',
      category: 'fashion'
    },
    {
      id: 3,
      storeId: 'zara',
      storeName: 'Zara',
      type: 'deal',
      code: '',
      cornerText: '',
      title: 'Up to 50% Off Seasonal Sale',
      url: 'https://www.zara.com',
      category: 'fashion'
    },
    {
      id: 4,
      storeId: 'asos',
      storeName: 'ASOS',
      type: 'code',
      code: 'ASOSSAVE30',
      cornerText: 'ASO',
      title: '$30 Off Orders Over $120',
      url: 'https://www.asos.com',
      category: 'fashion'
    },
    {
      id: 5,
      storeId: 'ulta',
      storeName: 'Ulta Beauty',
      type: 'code',
      code: 'ULTAMAGIC',
      cornerText: 'ULT',
      title: '$15 Off $50 Order Sitewide',
      url: 'https://www.ulta.com',
      category: 'beauty'
    },
    {
      id: 6,
      storeId: 'amazon',
      storeName: 'Amazon',
      type: 'code',
      code: 'PRIME10OFF',
      cornerText: 'PRI',
      title: '$10 Off Luxury Beauty Order',
      url: 'https://www.amazon.com',
      category: 'electronics'
    },
    {
      id: 7,
      storeId: 'glossier',
      storeName: 'Glossier',
      type: 'code',
      code: 'GLOWFIRST15',
      cornerText: 'GLO',
      title: '15% Off Your Entire First Purchase',
      url: 'https://www.glossier.com',
      category: 'beauty'
    },
    {
      id: 8,
      storeId: 'shein',
      storeName: 'Shein',
      type: 'code',
      code: 'SHEINLOVE20',
      cornerText: 'SHE',
      title: '20% Off Orders Over $69',
      url: 'https://www.shein.com',
      category: 'fashion'
    },
    {
      id: 9,
      storeId: 'apple',
      storeName: 'Apple',
      type: 'deal',
      code: '',
      cornerText: '',
      title: 'Up to $250 Off Trade-in Special',
      url: 'https://www.apple.com',
      category: 'electronics'
    },
    {
      id: 10,
      storeId: 'nordstrom',
      storeName: 'Nordstrom',
      type: 'code',
      code: 'NORDLUX15',
      cornerText: 'NOR',
      title: '15% Off Designer Bags & Shoes',
      url: 'https://www.nordstrom.com',
      category: 'fashion'
    }
  ];

  // State Management
  let activeStoreFilter = null;
  let activeTypeFilter = 'all'; // 'all', 'codes', 'sales'
  let activeCategoryFilter = null;
  let searchQuery = '';

  // DOM Elements
  const storeGridEl = document.getElementById('storeGrid');
  const dealGridEl = document.getElementById('dealGrid');
  const searchInput = document.getElementById('searchKey');
  const searchBtn = document.getElementById('searchBtn');
  const filterPills = document.querySelectorAll('.deals-filter-pills .pill');
  const toastEl = document.getElementById('toastMessage');

  // Coupon Modal Elements
  const couponModal = document.getElementById('couponSuccessModal');
  const closeCouponModalBtn = document.getElementById('closeCouponModal');
  const modalStoreTitle = document.getElementById('modalStoreTitle');
  const modalDealTitle = document.getElementById('modalDealTitle');
  const modalCodeText = document.getElementById('modalCodeText');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const modalStoreNameText = document.getElementById('modalStoreNameText');
  const modalStoreUrlBtn = document.getElementById('modalStoreUrlBtn');

  // Mobile Drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  // ==========================================
  // 3. Render Stores (10 Stores)
  // ==========================================
  function renderStores() {
    if (!storeGridEl) return;
    storeGridEl.innerHTML = stores.map(store => `
      <div class="store-item ${activeStoreFilter === store.id ? 'selected' : ''}" data-store-id="${store.id}" title="${store.name} Promo Codes">
        <div class="store-item__logo">
          <img src="${store.logo}" alt="${store.name} Logo" class="brand-logo-img" loading="lazy" />
        </div>
        <div class="store-item__name">${store.name}</div>
      </div>
    `).join('');

    storeGridEl.querySelectorAll('.store-item').forEach(item => {
      item.addEventListener('click', () => {
        const sid = item.getAttribute('data-store-id');
        activeStoreFilter = (activeStoreFilter === sid) ? null : sid;
        renderStores();
        renderDeals();
        const dealsSec = document.getElementById('deals');
        if (dealsSec) dealsSec.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ==========================================
  // 4. Render Deals
  // ==========================================
  function renderDeals() {
    if (!dealGridEl) return;

    const filtered = deals.filter(deal => {
      // Store filter
      if (activeStoreFilter && deal.storeId !== activeStoreFilter) return false;
      // Type filter
      if (activeTypeFilter === 'codes' && deal.type !== 'code') return false;
      if (activeTypeFilter === 'sales' && deal.type !== 'deal') return false;
      // Category filter
      if (activeCategoryFilter && deal.category !== activeCategoryFilter) return false;
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = deal.title.toLowerCase().includes(q);
        const matchStore = deal.storeName.toLowerCase().includes(q);
        const matchCode = deal.code ? deal.code.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchStore && !matchCode) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      dealGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; background: #fff; border-radius: 1rem; border: 1px solid #e2e2e2;">
          <p style="color: #666; font-size: 1rem;">No deals found matching your selection.</p>
          <button type="button" id="resetDealsBtn" style="margin-top: 0.75rem; color: #4c1fa2; font-weight: 600; text-decoration: underline; cursor: pointer;">Show All Deals</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetDealsBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeStoreFilter = null;
          activeTypeFilter = 'all';
          activeCategoryFilter = null;
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
          renderStores();
          renderDeals();
        });
      }
      return;
    }

    dealGridEl.innerHTML = filtered.map(deal => {
      const isCode = deal.type === 'code';
      const storeObj = stores.find(s => s.id === deal.storeId);
      const storeLogoUrl = storeObj ? storeObj.logo : '';

      return `
        <div class="landing-deal-card">
          <div class="landing-deal-card__logo">
            <img src="${storeLogoUrl}" alt="${deal.storeName} Logo" class="deal-card-logo-img" loading="lazy" />
          </div>
          <div class="landing-deal-card__content">
            <span class="landing-deal-card__store-tag">${deal.storeName}</span>
            <div class="landing-deal-card__title">${deal.title}</div>
            <div class="landing-deal-card__cta">
              ${isCode ? `
                <a class="coupon-btn show-code" href="#" data-deal-id="${deal.id}">
                  Show Code
                  <span class="corner"><span>${deal.cornerText}</span></span>
                </a>
              ` : `
                <a class="coupon-btn get-deal" href="#" data-deal-id="${deal.id}">
                  Get Deal
                </a>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events on deal buttons
    dealGridEl.querySelectorAll('.coupon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dealId = parseInt(btn.getAttribute('data-deal-id'), 10);
        const deal = deals.find(d => d.id === dealId);
        if (deal) {
          if (deal.type === 'code') {
            openCouponModal(deal);
          } else {
            showToast(`Deal activated! Opening ${deal.storeName}...`);
            window.open(deal.url, '_blank');
          }
        }
      });
    });
  }

  // ==========================================
  // 5. Coupon Modal & 1-Click Clipboard Copy
  // ==========================================
  let currentActiveDeal = null;

  function openCouponModal(deal) {
    if (!couponModal) return;
    currentActiveDeal = deal;
    const storeObj = stores.find(s => s.id === deal.storeId);

    const modalStoreLogoImg = document.getElementById('modalStoreLogoImg');
    if (modalStoreLogoImg && storeObj) {
      modalStoreLogoImg.src = storeObj.logo;
      modalStoreLogoImg.alt = `${deal.storeName} Logo`;
    }

    modalStoreTitle.textContent = `${deal.storeName} Promo Code`;
    modalDealTitle.textContent = deal.title;
    modalCodeText.textContent = deal.code;
    modalStoreNameText.textContent = deal.storeName;
    modalStoreUrlBtn.href = deal.url;

    // Reset copy button
    copyCodeBtn.textContent = 'Copy Code';
    copyCodeBtn.classList.remove('copied');

    // Show modal
    couponModal.style.display = 'flex';

    // Auto copy code
    copyTextToClipboard(deal.code, false);
  }

  function closeCouponModal() {
    if (couponModal) couponModal.style.display = 'none';
  }

  function copyTextToClipboard(text, showToastAlert = true) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        handleCopySuccess(text, showToastAlert);
      }).catch(() => fallbackCopy(text, showToastAlert));
    } else {
      fallbackCopy(text, showToastAlert);
    }
  }

  function fallbackCopy(text, showToastAlert) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    handleCopySuccess(text, showToastAlert);
  }

  function handleCopySuccess(text, showToastAlert) {
    if (copyCodeBtn) {
      copyCodeBtn.textContent = 'Copied!';
      copyCodeBtn.classList.add('copied');
    }
    if (showToastAlert) {
      showToast(`Promo Code "${text}" copied to clipboard!`);
    }
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      if (currentActiveDeal && currentActiveDeal.code) {
        copyTextToClipboard(currentActiveDeal.code, true);
      }
    });
  }

  if (closeCouponModalBtn) {
    closeCouponModalBtn.addEventListener('click', closeCouponModal);
  }

  if (couponModal) {
    couponModal.addEventListener('click', (e) => {
      if (e.target === couponModal) {
        closeCouponModal();
      }
    });
  }

  // ==========================================
  // 6. Search & Filters
  // ==========================================
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderDeals();
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchQuery = searchInput.value.trim();
        renderDeals();
        const dealsSec = document.getElementById('deals');
        if (dealsSec) dealsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchQuery = searchInput ? searchInput.value.trim() : '';
      renderDeals();
      const dealsSec = document.getElementById('deals');
      if (dealsSec) dealsSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeTypeFilter = pill.getAttribute('data-filter');
      renderDeals();
    });
  });

  // Accordion Toggle
  const accordionTrigger = document.getElementById('accordionTrigger');
  const categoryAccordion = document.getElementById('categoryAccordion');

  if (accordionTrigger && categoryAccordion) {
    accordionTrigger.addEventListener('click', () => {
      categoryAccordion.classList.toggle('is-open');
    });
  }

  // Category links inside accordion
  document.querySelectorAll('.accordion__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category');
      activeCategoryFilter = (activeCategoryFilter === cat) ? null : cat;
      renderDeals();
      const dealsSec = document.getElementById('deals');
      if (dealsSec) dealsSec.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCouponModal();
      if (mobileNav) mobileNav.classList.remove('open');
    }
  });

  // ==========================================
  // 7. Newsletter & Mobile Menu
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! Thank you for joining PromoBella.');
        newsletterForm.reset();
      }
    });
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.add('open');
    });
  }

  if (mobileCloseBtn && mobileNav) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!mobileNav.contains(e.target) && e.target !== menuToggle) {
        mobileNav.classList.remove('open');
      }
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('open');
    });
  });

  // ==========================================
  // 8. Toast Helper
  // ==========================================
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3000);
  }

  // ==========================================
  // Initial Run
  // ==========================================
  renderStores();
  renderDeals();

});
