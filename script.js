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
  // 9. Customer Support Form Handler (support.html)
  // ==========================================
  const supportForm = document.getElementById('customerSupportForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');
  const successAlertTitle = document.getElementById('successAlertTitle');
  const successAlertMsg = document.getElementById('successAlertMsg');

  if (supportForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectSelect = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Input listener to clear errors
    [nameInput, emailInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const err = input.parentElement.parentElement.querySelector('.form-error');
        if (err) err.classList.remove('show');
      });
    });

    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        if (nameInput) nameInput.classList.add('invalid');
        if (nameError) nameError.classList.add('show');
        isValid = false;
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailInput) emailInput.classList.add('invalid');
        if (emailError) emailError.classList.add('show');
        isValid = false;
      }

      // Validate Message (min 10 chars)
      const msgVal = messageInput ? messageInput.value.trim() : '';
      if (!msgVal || msgVal.length < 10) {
        if (messageInput) messageInput.classList.add('invalid');
        if (messageError) messageError.classList.add('show');
        isValid = false;
      }

      if (!isValid) return;

      // Success
      if (contactSuccessAlert) {
        if (successAlertTitle) successAlertTitle.textContent = `Thank You, ${nameVal}!`;
        if (successAlertMsg) {
          successAlertMsg.textContent = `Your message regarding "${subjectSelect ? subjectSelect.options[subjectSelect.selectedIndex].text : 'Support'}" has been sent. Our team will review your inquiry and reply to ${emailVal} within 24 hours.`;
        }
        contactSuccessAlert.style.display = 'flex';
        contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      showToast('Support message sent successfully!');
      supportForm.reset();
    });
  }

  // ==========================================
  // 10. Support FAQ Accordion (support.html)
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      if (!parent) return;
      const isOpen = parent.classList.contains('active');
      // Close other faq items
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });

  // ==========================================
  // 11. Blog Filtering & Interactive Reader (blog.html)
  // ==========================================
  const blogPills = document.querySelectorAll('#blogPills .pill');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogPills.length > 0) {
    blogPills.forEach(pill => {
      pill.addEventListener('click', () => {
        blogPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.getAttribute('data-category');
        blogCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Full Blog Articles Content
  const blogArticlesData = {
    1: {
      title: "10 Proven Ways to Stack Coupons & Double Your Savings Online",
      category: "Smart Shopping",
      date: "November 2026 • 5 min read",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>Online shoppers often leave significant money on the table by simply applying a single promo code at checkout. In the modern retail landscape, the biggest discounts come from <strong>coupon stacking</strong>—combining multiple promotions on a single order.</p>
          
          <h3>1. Sign Up for First-Time Order Discounts</h3>
          <p>Most major retailers (including Sephora, ASOS, and Nike) offer an immediate 10% to 15% discount code when you subscribe to their newsletter. This voucher can almost always be used on top of markdown clearance prices.</p>

          <h3>2. Meet Free Shipping Minimums Strategically</h3>
          <p>Paying $7 to $12 for standard delivery can completely erase your coupon savings. If you are $5 short of the free delivery threshold, adding a $6 everyday essential (like socks, travel toiletries, or lip balm) is cheaper than paying delivery fees bare.</p>

          <h3>3. Time Purchases Around Retailer Flash Days</h3>
          <p>Save non-urgent purchases in your wishlist until stores run sitewide multiplier events (such as Ulta's 5x Rewards or Amazon Prime Days), where coupon codes apply on top of promotional store credit.</p>

          <h3>4. Stack Student or Military Verifications</h3>
          <p>Platforms like ASOS, Apple, and Nike offer permanent 10% to 15% discounts for verified students via UNiDAYS or Student Beans. Check whether your retailer permits educational vouchers alongside free shipping promo codes.</p>
        </div>
      `
    },
    2: {
      title: "The Sephora & Ulta Beauty Playbook: When to Buy for Max Discounts",
      category: "Beauty & Skincare",
      date: "November 2026 • 6 min read",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>Beauty and luxury cosmetics are notorious for strict manufacturer price controls. However, knowledgeable shoppers know that following the bi-annual sales calendar unlocks luxury beauty for up to 50% off.</p>

          <h3>1. Ulta's "21 Days of Beauty" (March & September)</h3>
          <p>Twice a year, Ulta Beauty slashes prices by 50% on select premium skincare, prestige haircare, and cult-favorite makeup brands every single day for three weeks. Always look for accompanying sitewide $3.50 off $15 non-prestige coupons.</p>

          <h3>2. Sephora Beauty Pass Sale Seasons (April & November)</h3>
          <p>Sephora hosts two major tier-based sales each year: Rouge members save 20%, VIB saves 15%, and Insiders save 10% sitewide. In addition, Sephora Collection items are typically 30% off for the duration of the promotion without requiring a separate code.</p>

          <h3>3. Always Add Sample & Deluxe GWP Codes</h3>
          <p>Never place a Sephora order without checking their Beauty Offers page. Entering specific promo codes with a $25+ or $35+ cart yields deluxe perfume miniatures and premium moisturizers worth $15 to $30 alone.</p>
        </div>
      `
    },
    3: {
      title: "How to Spot Real vs. Expired Promo Codes in 2026",
      category: "Coupon Tips",
      date: "November 2026 • 4 min read",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>We've all been there: you find an alluring coupon code promising "70% Off Sitewide", paste it into checkout, only to see the dreaded red message: <em>"Code invalid or expired"</em>. Here's why that happens and how to spot genuine codes instantly.</p>

          <h3>Why So Many Coupon Sites Have Broken Codes</h3>
          <p>Most commercial coupon sites rely on automated web spiders and bot crawlers that scrape random text from forums, social media, and obsolete campaigns without human testing. Once posted, codes linger for years without verification.</p>

          <h3>How PromoBella Solves This</h3>
          <p>At PromoBella, our verification team manually tests every single promo code in real shopping carts before publication. If a code expires or has brand restrictions, we immediately remove it or specify the exact qualifying minimum.</p>

          <h3>Red Flags of Fake Coupon Sites</h3>
          <ul>
            <li><strong>Obscene claims:</strong> "90% off all Apple MacBooks" (Apple never issues 90% off coupons).</li>
            <li><strong>Fake countdown timers:</strong> Timers that reset to 10 minutes every time you refresh the page.</li>
            <li><strong>Survey gates:</strong> Asking you to complete surveys or install suspicious browser toolbars to reveal the code.</li>
          </ul>
        </div>
      `
    },
    4: {
      title: "Fashion on a Budget: How to Score Zara, ASOS & Shein Sales Year-Round",
      category: "Fashion & Style",
      date: "November 2026 • 5 min read",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>Staying trendy doesn't require draining your savings account. By learning the release patterns and markdown schedules of fast-fashion giants, you can consistently purchase wardrobe staples at 40% to 70% below retail.</p>

          <h3>1. Zara's Bi-Annual Clearance Protocol</h3>
          <p>Zara rarely issues generic promo codes. Instead, their deepest discounts happen during the Summer Sale (late June) and Winter Sale (late December). Markdowns begin at 20-30% off and drop to 70% off by the fourth week. The best inventory sells out in the first 48 hours via their mobile app.</p>

          <h3>2. ASOS Premier Delivery & Promo Codes</h3>
          <p>ASOS regularly releases weekend promo codes offering 20% to 25% off sitewide. If you order from ASOS more than 3 times a year, their Premier Delivery pays for itself instantly while giving you early access to sale drops.</p>

          <h3>3. Maximizing Shein Points & Tiered Coupons</h3>
          <p>Shein offers stacked tiered coupons (e.g. 15% off $49, 20% off $89). You can layer daily app check-in points on top of promo codes to cover up to 30% of the remaining order subtotal.</p>
        </div>
      `
    },
    5: {
      title: "Smart Tech Savings: Student, Trade-In & Refurbished Deals at Apple & Amazon",
      category: "Tech & Electronics",
      date: "November 2026 • 6 min read",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>Technology hardware has narrow profit margins, meaning coupon codes rarely knock off massive percentages. However, savvy consumers can leverage manufacturer trade-ins and certified refurbished inventory to save hundreds of dollars.</p>

          <h3>1. Apple Education Store Pricing</h3>
          <p>Students, teachers, and faculty members can purchase iPads, MacBooks, and AppleCare at 8% to 10% below retail through the official Apple Education portal year-round, plus receive seasonal gift card bundles during Back to School promotions.</p>

          <h3>2. Amazon Renewed (Certified Refurbished)</h3>
          <p>Amazon Renewed products are professionally inspected, tested, and cleaned to look and work like new. They come backed by a 90-day Amazon Renewed Guarantee and typically cost 20% to 40% less than brand-new units.</p>

          <h3>3. Trade-In Valuation Boosts</h3>
          <p>Before buying a new smartphone, laptop, or tablet, check trade-in promotion windows. When new flagship devices launch in September and October, retailers frequently offer $150+ promotional trade-in bonuses above fair market value.</p>
        </div>
      `
    },
    6: {
      title: "The Retail Sales Calendar: Key Shopping Dates You Shouldn't Miss",
      category: "Seasonal Sales",
      date: "November 2026 • 7 min read",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80",
      content: `
        <div class="article-full-content">
          <p>Timing is everything in retail. Every category of consumer product has specific months when inventory turnover forces stores to offer their highest discounts. Bookmark this seasonal savings calendar.</p>

          <h3>Q1: January to March</h3>
          <ul>
            <li><strong>January:</strong> White Sales (up to 60% off bedding, sheets, and home goods) and post-holiday winter clothing liquidation.</li>
            <li><strong>February:</strong> Presidents' Day mattress and major appliance promotions.</li>
            <li><strong>March:</strong> Spring beauty launches and Ulta 21 Days of Beauty.</li>
          </ul>

          <h3>Q2: April to June</h3>
          <ul>
            <li><strong>April:</strong> Sephora Spring Savings Event and Easter fashion clearance.</li>
            <li><strong>May:</strong> Memorial Day outdoor furniture, grills, and summer clothing sales.</li>
            <li><strong>June:</strong> Semi-annual clearance sales at Zara, Nordstrom, and Victoria's Secret.</li>
          </ul>

          <h3>Q3 & Q4: July to December</h3>
          <ul>
            <li><strong>July:</strong> Amazon Prime Day and mid-summer counter-sales across all retail.</li>
            <li><strong>August/September:</strong> Back to school laptop and student tech specials.</li>
            <li><strong>November/December:</strong> Black Friday, Cyber Week, and holiday countdown discounts—the year's lowest prices across electronics, fashion, and beauty.</li>
          </ul>
        </div>
      `
    }
  };

  // Article Reader Modal Logic
  const articleReaderModal = document.getElementById('articleReaderModal');
  const readerModalTitle = document.getElementById('readerModalTitle');
  const readerModalBody = document.getElementById('readerModalBody');
  const closeReaderModal = document.getElementById('closeReaderModal');
  const closeReaderModalFooter = document.getElementById('closeReaderModalFooter');

  document.querySelectorAll('.blog-read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const blogId = btn.getAttribute('data-blog-id');
      const article = blogArticlesData[blogId];
      if (!article || !articleReaderModal) return;

      if (readerModalTitle) readerModalTitle.textContent = article.title;
      if (readerModalBody) {
        readerModalBody.innerHTML = `
          <img src="${article.image}" alt="${article.title}" class="article-reader-img" />
          <div style="margin-bottom: 1.25rem;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #4c1fa2; text-transform: uppercase; background: #f3ebfc; padding: 0.25rem 0.65rem; border-radius: 999px;">${article.category}</span>
            <span style="font-size: 0.85rem; color: #777; margin-left: 0.5rem;">${article.date}</span>
          </div>
          ${article.content}
        `;
      }
      articleReaderModal.style.display = 'flex';
    });
  });

  function closeReader() {
    if (articleReaderModal) articleReaderModal.style.display = 'none';
  }

  if (closeReaderModal) closeReaderModal.addEventListener('click', closeReader);
  if (closeReaderModalFooter) closeReaderModalFooter.addEventListener('click', closeReader);
  if (articleReaderModal) {
    articleReaderModal.addEventListener('click', (e) => {
      if (e.target === articleReaderModal) closeReader();
    });
  }

  // ==========================================
  // Initial Run
  // ==========================================
  renderStores();
  renderDeals();

});
