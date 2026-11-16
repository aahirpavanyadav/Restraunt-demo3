/**
 * VERDANT Table & Garden - Application Controller
 * High-performance, clean, interactive restaurant client demo
 */

document.addEventListener('DOMContentLoaded', () => {
  // Reactive App State
  const state = {
    category: 'all',
    search: '',
    dietary: 'all',
    cart: [],
    tipRate: 20,
    eventGuests: 30,
    eventTier: 135 // $/person
  };

  // DOM Bindings
  const menuGrid = document.getElementById('menu-grid');
  const categoryContainer = document.getElementById('category-filter-pills');
  const searchInput = document.getElementById('search-input');
  const dietarySelect = document.getElementById('dietary-select');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartBadge = document.getElementById('cart-badge');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTipEl = document.getElementById('cart-tip');
  const cartTotalEl = document.getElementById('cart-total');
  const dishModal = document.getElementById('dish-modal');
  const reservationModal = document.getElementById('reservation-modal');
  const liveHoursPill = document.getElementById('live-hours-pill');
  const floatingOrderPill = document.getElementById('floating-order-pill');

  // Initial Boot
  initCategoryPills();
  renderMenuItems();
  renderPressQuotes();
  initEventCalculator();
  updateLiveHours();
  setupListeners();

  // --- 1. CATEGORY BUTTONS ---
  function initCategoryPills() {
    if (!categoryContainer) return;
    categoryContainer.innerHTML = RESTAURANT_DATA.menuCategories.map(cat => `
      <button 
        data-cat="${cat.id}"
        class="cat-pill px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
          cat.id === state.category 
            ? 'bg-[#274337] text-white border-[#274337] shadow-md shadow-[#274337]/20' 
            : 'bg-white text-[#607269] border-[#1C2A24]/10 hover:border-[#D06746] hover:text-[#D06746]'
        }"
      >
        ${cat.name}
      </button>
    `).join('');

    categoryContainer.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.category = e.currentTarget.dataset.cat;
        updateCategoryPillsUI();
        renderMenuItems();
      });
    });
  }

  function updateCategoryPillsUI() {
    categoryContainer.querySelectorAll('.cat-pill').forEach(btn => {
      const isSelected = btn.dataset.cat === state.category;
      if (isSelected) {
        btn.className = 'cat-pill px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border bg-[#274337] text-white border-[#274337] shadow-md shadow-[#274337]/20';
      } else {
        btn.className = 'cat-pill px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border bg-white text-[#607269] border-[#1C2A24]/10 hover:border-[#D06746] hover:text-[#D06746]';
      }
    });
  }

  // --- 2. MENU FILTERING & RENDERING ---
  function getFilteredItems() {
    return RESTAURANT_DATA.menuItems.filter(item => {
      const matchesCat = state.category === 'all' || item.category === state.category;
      const query = state.search.trim().toLowerCase();
      const matchesSearch = !query || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        (item.pairing && item.pairing.toLowerCase().includes(query));

      let matchesDietary = true;
      if (state.dietary !== 'all') {
        matchesDietary = item.tags.some(t => t.toLowerCase().includes(state.dietary.toLowerCase()));
      }
      return matchesCat && matchesSearch && matchesDietary;
    });
  }

  function renderMenuItems() {
    if (!menuGrid) return;
    const items = getFilteredItems();

    if (items.length === 0) {
      menuGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-[#1C2A24]/10 p-8 shadow-sm">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-[#FAF7F2] text-[#D06746] flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h3 class="font-display text-2xl text-[#1C2A24] mb-1">No matching culinary dishes</h3>
          <p class="text-sm text-[#607269] max-w-sm mx-auto mb-4">Try clearing the search query or exploring our complete garden collection.</p>
          <button id="reset-menu-filters" class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#274337] text-white">
            Reset Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-menu-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.category = 'all';
          state.search = '';
          state.dietary = 'all';
          if (searchInput) searchInput.value = '';
          if (dietarySelect) dietarySelect.value = 'all';
          updateCategoryPillsUI();
          renderMenuItems();
        });
      }
      return;
    }

    menuGrid.innerHTML = items.map(item => `
      <div class="clean-card group flex flex-col justify-between overflow-hidden" data-id="${item.id}">
        <div>
          <!-- Imagery with tags & price -->
          <div class="relative h-64 overflow-hidden cursor-pointer" onclick="window.VerdantApp.openDishModal('${item.id}')">
            <img src="${item.image}" alt="${item.name}" class="zoom-img w-full h-full object-cover">
            
            <!-- Tags -->
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              ${item.tags.map(t => `
                <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-md text-[#274337] shadow-sm border border-[#1C2A24]/5">
                  ${t}
                </span>
              `).join('')}
            </div>

            <!-- Price badge -->
            <div class="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-[#1C2A24]/90 backdrop-blur-md text-white font-display text-lg font-bold shadow-md">
              $${item.price}
            </div>
          </div>

          <!-- Description & Pairing -->
          <div class="p-6">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 
                class="font-display text-xl font-bold text-[#1C2A24] group-hover:text-[#D06746] transition-colors cursor-pointer"
                onclick="window.VerdantApp.openDishModal('${item.id}')"
              >
                ${item.name}
              </h3>
            </div>

            <p class="text-sm text-[#607269] leading-relaxed mb-4 line-clamp-2">
              ${item.description}
            </p>

            <div class="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C2A24]/5 text-xs text-[#274337]">
              <svg class="w-4 h-4 text-[#C69A4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 009-9H3a9 9 0 009 9zm0 0v-6"></path></svg>
              <span class="truncate"><strong>Sommelier:</strong> ${item.pairing}</span>
            </div>
          </div>
        </div>

        <!-- Action footer -->
        <div class="p-6 pt-0 flex items-center justify-between border-t border-[#1C2A24]/5 mt-auto">
          <button 
            onclick="window.VerdantApp.openDishModal('${item.id}')"
            class="text-xs font-semibold uppercase tracking-wider text-[#607269] hover:text-[#D06746] transition-colors"
          >
            Details & Allergens
          </button>

          <button 
            onclick="window.VerdantApp.addToCart('${item.id}')"
            class="btn-terracotta px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add to Order
          </button>
        </div>
      </div>
    `).join('');
  }

  // --- 3. DISH DETAIL MODAL ---
  function openDishModal(dishId) {
    const item = RESTAURANT_DATA.menuItems.find(d => d.id === dishId);
    if (!item || !dishModal) return;

    const modalBody = document.getElementById('dish-modal-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="relative bg-white border border-[#1C2A24]/10 rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl">
        <button 
          onclick="window.VerdantApp.closeDishModal()"
          class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1C2A24] flex items-center justify-center hover:bg-[#D06746] hover:text-white transition-all shadow-md"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="relative h-64 w-full">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div class="p-6 sm:p-8 -mt-6 relative bg-white space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex gap-2 mb-1.5">
                ${item.tags.map(t => `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EBF1ED] text-[#274337]">${t}</span>`).join('')}
              </div>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#1C2A24]">${item.name}</h2>
            </div>
            <div class="font-display text-3xl font-bold text-[#D06746]">$${item.price}</div>
          </div>

          <p class="text-sm text-[#607269] leading-relaxed">
            ${item.description}
          </p>

          <div class="grid grid-cols-3 gap-3 pt-2">
            <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#1C2A24]/5 text-center">
              <span class="text-[10px] uppercase font-bold text-[#607269] block mb-0.5">Energy</span>
              <span class="text-xs font-bold text-[#1C2A24]">${item.calories || '350 kcal'}</span>
            </div>
            <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#1C2A24]/5 text-center">
              <span class="text-[10px] uppercase font-bold text-[#607269] block mb-0.5">Fire Time</span>
              <span class="text-xs font-bold text-[#1C2A24]">${item.prepTime || '12 mins'}</span>
            </div>
            <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#1C2A24]/5 text-center">
              <span class="text-[10px] uppercase font-bold text-[#607269] block mb-0.5">Allergens</span>
              <span class="text-xs font-bold text-[#D06746]">
                ${item.allergens && item.allergens.length ? item.allergens.join(', ') : 'None'}
              </span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1C2A24]/5 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#EBF1ED] text-[#274337] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21a9 9 0 009-9H3a9 9 0 009 9zm0 0v-6"></path></svg>
            </div>
            <div class="text-xs">
              <div class="font-bold text-[#274337] uppercase tracking-wider">Natural Wine Pairing</div>
              <div class="text-[#607269]">${item.pairing}</div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#1C2A24]/5">
            <button onclick="window.VerdantApp.closeDishModal()" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#607269] hover:text-[#1C2A24]">
              Close
            </button>
            <button 
              onclick="window.VerdantApp.addToCart('${item.id}'); window.VerdantApp.closeDishModal();"
              class="btn-terracotta px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Add to Tasting Slate ($${item.price})
            </button>
          </div>
        </div>
      </div>
    `;

    dishModal.classList.remove('hidden');
    dishModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeDishModal() {
    if (!dishModal) return;
    dishModal.classList.add('hidden');
    dishModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // --- 4. TASTING SLATE / CART SYSTEM ---
  function addToCart(dishId) {
    const item = RESTAURANT_DATA.menuItems.find(d => d.id === dishId);
    if (!item) return;

    const existing = state.cart.find(c => c.id === dishId);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    showToast(`Added "${item.name}" to tasting slate`, 'success');
  }

  function updateQty(dishId, delta) {
    const item = state.cart.find(c => c.id === dishId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(c => c.id !== dishId);
    }
    updateCartUI();
  }

  function removeFromCart(dishId) {
    state.cart = state.cart.filter(c => c.id !== dishId);
    updateCartUI();
  }

  function toggleCart(open) {
    if (!cartDrawer || !cartBackdrop) return;
    if (open) {
      cartBackdrop.classList.add('active');
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      cartBackdrop.classList.remove('active');
      cartDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const tax = subtotal * 0.08875;
    const tip = subtotal * (state.tipRate / 100);
    const total = subtotal + tax + tip;

    // Badges
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.classList.toggle('hidden', totalCount === 0);
    }

    if (floatingOrderPill) {
      const priceText = document.getElementById('floating-order-total');
      if (priceText) priceText.textContent = `$${subtotal.toFixed(2)}`;
      floatingOrderPill.classList.toggle('scale-0', totalCount === 0);
      floatingOrderPill.classList.toggle('scale-100', totalCount > 0);
    }

    // Totals
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTaxEl) cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    if (cartTipEl) cartTipEl.textContent = `$${tip.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Item List
    if (cartItemsList) {
      if (state.cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="h-64 flex flex-col items-center justify-center text-center p-6 text-[#607269]">
            <div class="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-3 text-[#D06746]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <p class="font-display text-lg text-[#1C2A24] mb-1">Your Slate is Clean</p>
            <p class="text-xs text-[#607269] max-w-xs">Curate your pre-order course by course from our wood-fired hearth and natural cellar.</p>
          </div>
        `;
      } else {
        cartItemsList.innerHTML = state.cart.map(item => `
          <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#1C2A24]/5 flex gap-3.5 items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0">
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1">
                <h4 class="text-sm font-bold text-[#1C2A24] truncate">${item.name}</h4>
                <button onclick="window.VerdantApp.removeFromCart('${item.id}')" class="text-neutral-400 hover:text-red-500 text-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <p class="text-xs font-bold text-[#D06746] mb-2">$${item.price} each</p>

              <div class="flex items-center gap-2">
                <div class="flex items-center border border-[#1C2A24]/10 rounded-lg bg-white">
                  <button onclick="window.VerdantApp.updateQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-xs text-[#1C2A24] hover:bg-neutral-100 rounded-l">-</button>
                  <span class="w-6 text-center text-xs font-bold text-[#1C2A24]">${item.qty}</span>
                  <button onclick="window.VerdantApp.updateQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-xs text-[#1C2A24] hover:bg-neutral-100 rounded-r">+</button>
                </div>
                <span class="text-xs font-bold text-[#1C2A24] ml-auto">$${(item.price * item.qty).toFixed(2)}</span>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // --- 5. INTERACTIVE EVENT BUDGET ESTIMATOR ---
  function initEventCalculator() {
    const slider = document.getElementById('event-guest-slider');
    const guestLabel = document.getElementById('event-guest-count');
    const costEstimate = document.getElementById('event-cost-estimate');
    const spaceEstimate = document.getElementById('event-space-recommendation');
    const tierPills = document.querySelectorAll('.tier-pill');

    function updateCalc() {
      if (guestLabel) guestLabel.textContent = `${state.eventGuests} Guests`;
      const baseTotal = state.eventGuests * state.eventTier;
      const totalWithService = baseTotal * 1.25; // 25% tax + gratuity
      if (costEstimate) costEstimate.textContent = `$${Math.round(totalWithService).toLocaleString()}`;

      if (spaceEstimate) {
        if (state.eventGuests <= 20) {
          spaceEstimate.textContent = "The Hearth Private Nook (Intimate)";
        } else if (state.eventGuests <= 45) {
          spaceEstimate.textContent = "The Sunlit Atrium Greenhouse";
        } else if (state.eventGuests <= 80) {
          spaceEstimate.textContent = "The Century Olive Courtyard (Alfresco)";
        } else {
          spaceEstimate.textContent = "Full Restaurant & Garden Buyout";
        }
      }
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        state.eventGuests = parseInt(e.target.value);
        updateCalc();
      });
    }

    tierPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        tierPills.forEach(p => p.classList.remove('bg-[#274337]', 'text-white', 'border-[#274337]'));
        e.currentTarget.classList.add('bg-[#274337]', 'text-white', 'border-[#274337]');
        state.eventTier = parseInt(e.currentTarget.dataset.tier);
        updateCalc();
      });
    });

    updateCalc();
  }

  // --- 6. TABLE RESERVATION MODAL ---
  function openReservationModal(prefilledData = {}) {
    if (!reservationModal) return;

    // Date default to tomorrow
    const dateInput = document.getElementById('res-date-input');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    // Seating options
    const seatingGrid = document.getElementById('res-seating-grid');
    if (seatingGrid && seatingGrid.children.length === 0) {
      seatingGrid.innerHTML = RESTAURANT_DATA.seatingZones.map((zone, idx) => `
        <label class="cursor-pointer border border-[#1C2A24]/10 rounded-2xl p-4 bg-white hover:border-[#D06746] transition-all flex items-start gap-3 shadow-xs">
          <input type="radio" name="res-zone" value="${zone.id}" ${idx === 0 ? 'checked' : ''} class="mt-1 accent-[#D06746]">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#1C2A24]">${zone.name}</span>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#D06746] bg-[#FAF7F2] px-2 py-0.5 rounded">${zone.vibe}</span>
            </div>
            <p class="text-xs text-[#607269] mt-0.5">${zone.desc}</p>
          </div>
        </label>
      `).join('');
    }

    reservationModal.classList.remove('hidden');
    reservationModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeReservationModal() {
    if (!reservationModal) return;
    reservationModal.classList.add('hidden');
    reservationModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function handleReservationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const guests = form['res-guests'].value;
    const date = form['res-date'].value;
    const time = form['res-time'].value;
    const zoneId = form['res-zone'].value;
    const name = form['res-name'].value;
    const email = form['res-email'].value;
    const phone = form['res-phone'].value;
    const occasion = form['res-occasion'].value;
    const notes = form['res-notes'].value;

    const ref = 'VRD-' + Math.floor(100000 + Math.random() * 900000);
    const zone = RESTAURANT_DATA.seatingZones.find(z => z.id === zoneId)?.name || 'Sunlit Atrium';

    const modalBody = document.getElementById('reservation-modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center py-6 px-4">
          <div class="w-16 h-16 rounded-full bg-[#EBF1ED] text-[#274337] flex items-center justify-center mx-auto mb-4 border border-[#274337]/20 shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          
          <span class="text-xs uppercase font-bold tracking-widest text-[#D06746]">Table Confirmed</span>
          <h2 class="font-display text-3xl font-bold text-[#1C2A24] mt-1 mb-2">We Await Your Arrival</h2>
          <p class="text-sm text-[#607269] max-w-md mx-auto mb-6">
            A confirmation pass has been dispatched to <strong class="text-[#1C2A24]">${email}</strong> and SMS sent to <strong class="text-[#1C2A24]">${phone}</strong>.
          </p>

          <!-- Reservation Ticket -->
          <div class="max-w-md mx-auto bg-white border border-[#1C2A24]/10 rounded-3xl p-6 text-left shadow-lg relative overflow-hidden mb-6">
            <div class="flex justify-between items-center pb-4 border-b border-[#1C2A24]/5 mb-4">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider text-[#607269]">Booking Reference</span>
                <div class="font-display text-2xl font-bold text-[#D06746]">${ref}</div>
              </div>
              <div class="text-right">
                <span class="text-[10px] uppercase font-bold tracking-wider text-[#607269]">Party Size</span>
                <div class="text-sm font-bold text-[#1C2A24]">${guests} Guests</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs mb-4">
              <div>
                <span class="text-[#607269] block mb-0.5">Dining Schedule</span>
                <span class="font-bold text-[#1C2A24]">${date} at ${time}</span>
              </div>
              <div>
                <span class="text-[#607269] block mb-0.5">Reserved Atmosphere</span>
                <span class="font-bold text-[#1C2A24]">${zone}</span>
              </div>
              <div>
                <span class="text-[#607269] block mb-0.5">Guest of Honor</span>
                <span class="font-bold text-[#1C2A24]">${name}</span>
              </div>
              <div>
                <span class="text-[#607269] block mb-0.5">Celebration Occasion</span>
                <span class="font-bold text-[#D06746] capitalize">${occasion}</span>
              </div>
            </div>

            ${notes ? `
              <div class="pt-3 border-t border-[#1C2A24]/5 text-xs text-[#607269]">
                <strong class="text-[#1C2A24]">Kitchen Notes:</strong> ${notes}
              </div>
            ` : ''}
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onclick="window.VerdantApp.showToast('Pass added to Apple & Google Wallet!', 'success')"
              class="btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Add to Calendar / Wallet
            </button>
            <button 
              onclick="window.VerdantApp.closeReservationModal()"
              class="btn-outline-clean px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      `;
    }

    showToast(`Reservation ${ref} booked successfully!`, 'success');
  }

  // --- 7. PRESS & TESTIMONIALS ---
  function renderPressQuotes() {
    const grid = document.getElementById('press-grid');
    if (!grid) return;
    grid.innerHTML = RESTAURANT_DATA.press.map(item => `
      <div class="clean-card p-8 flex flex-col justify-between">
        <div class="mb-6">
          <div class="flex text-[#C69A4F] text-xs mb-3">
            ${'★'.repeat(item.stars)}
          </div>
          <p class="font-display text-lg text-[#1C2A24] leading-relaxed italic">
            "${item.quote}"
          </p>
        </div>
        <div class="pt-4 border-t border-[#1C2A24]/5">
          <h4 class="font-bold text-sm text-[#1C2A24]">${item.critic}</h4>
          <p class="text-xs text-[#607269]">${item.author}</p>
        </div>
      </div>
    `).join('');
  }

  // --- 8. LIVE HOURS CALCULATION ---
  function updateLiveHours() {
    if (!liveHoursPill) return;
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon ...
    const hour = now.getHours();

    let open = false;
    let text = '';

    if (day === 1 || day === 2) { // Mon / Tue
      open = false;
      text = 'Closed Today for Farm Harvest • Reopens Wednesday 11:30 AM';
    } else if (day === 0 || day === 6) { // Sat / Sun
      if (hour >= 10 && hour < 22) {
        open = true;
        text = 'Open Today • Garden Brunch & Wood-Fired Dinner until 10:30 PM';
      } else {
        text = 'Closed Now • Opens Tomorrow at 10:30 AM';
      }
    } else { // Wed - Fri
      if (hour >= 11 && hour < 22) {
        open = true;
        text = 'Open Today • Lunch, Hearth Dinner & Wine Garden until 10:00 PM';
      } else {
        text = 'Closed Now • Lunch Service begins at 11:30 AM';
      }
    }

    liveHoursPill.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full ${open ? 'bg-emerald-500 status-pulse' : 'bg-[#D06746]'}"></span>
      <span class="text-xs font-semibold ${open ? 'text-[#274337]' : 'text-[#607269]'}">${text}</span>
    `;
  }

  // --- 9. TOAST MANAGER ---
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `toast-msg px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-3 bg-white ${
      type === 'success' ? 'border-emerald-500/30 text-[#274337]' : 'border-[#D06746]/30 text-[#1C2A24]'
    }`;
    el.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-500' : 'bg-[#D06746]'}"></span>
      <span>${msg}</span>
    `;

    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }

  // --- 10. EVENT LISTENERS ---
  function setupListeners() {
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderMenuItems();
      });
    }

    if (dietarySelect) {
      dietarySelect.addEventListener('change', (e) => {
        state.dietary = e.target.value;
        renderMenuItems();
      });
    }

    // Cart Triggers
    document.querySelectorAll('.open-cart-trigger').forEach(b => b.addEventListener('click', () => toggleCart(true)));
    const closeCart = document.getElementById('close-cart-btn');
    if (closeCart) closeCart.addEventListener('click', () => toggleCart(false));
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

    // Tip buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('bg-[#274337]', 'text-white'));
        e.currentTarget.classList.add('bg-[#274337]', 'text-white');
        state.tipRate = parseInt(e.currentTarget.dataset.tip);
        updateCartUI();
      });
    });

    // Cart Checkout
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
    if (cartCheckoutBtn) {
      cartCheckoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Please add items to your tasting slate first', 'info');
          return;
        }
        toggleCart(false);
        openReservationModal();
        showToast('Your tasting order has been attached to your table reservation!', 'success');
      });
    }

    // Reservation triggers
    document.querySelectorAll('.open-reservation-trigger').forEach(b => b.addEventListener('click', () => openReservationModal()));
    const closeRes = document.getElementById('close-res-btn');
    if (closeRes) closeRes.addEventListener('click', closeReservationModal);

    const resForm = document.getElementById('reservation-form');
    if (resForm) resForm.addEventListener('submit', handleReservationSubmit);

    // Hero Quick Booker Form
    const heroBookerForm = document.getElementById('hero-quick-booker');
    if (heroBookerForm) {
      heroBookerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        openReservationModal();
      });
    }

    // Mobile nav toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.toggle('hidden'));
    }

    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing to the Garden Journal.', 'success');
        newsletterForm.reset();
      });
    }
  }

  // Global Exports for Inline Handlers
  window.VerdantApp = {
    addToCart,
    removeFromCart,
    updateQty,
    openDishModal,
    closeDishModal,
    openReservationModal,
    closeReservationModal,
    showToast
  };
});
