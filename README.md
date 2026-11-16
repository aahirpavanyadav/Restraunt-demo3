# LUMINA | Modern Hearth & Botanical Lounge
### Clean & Professional Web Demo for Restaurant Clients

A production-grade, highly engaging, responsive web demo tailored for hospitality, fine dining, bistros, steakhouses, and culinary clients. Designed with dark luxury aesthetics, refined typography, and practical guest features.

---

## 🌟 Demo Highlights & Client Features

1. **Brand Identity & Atmosphere**:
   - Distinctive luxury palette: rich obsidian `#0b0c0e`, warm charcoal, and champagne gold accents.
   - Editorial typography utilizing Google Fonts (`Playfair Display`, `Cinzel`, `Plus Jakarta Sans`).
   - Accolades highlight bar (Michelin Guide selected, 4.9★ guest ratings, 45-day dry-aged cuts, 1,200+ cellar bottles).

2. **Real-time Operating Status**:
   - Dynamic opening hours calculation pill (`Open Now` / `Closed Now` with live status indicator dot based on the customer's actual local time and day).

3. **Interactive Seasonal Menu & Cellar**:
   - Category filtering: Starters, Hearth Mains, Raw Bar & Seafood, Confections, and Cocktails.
   - Live search by dish name, ingredients, or wine pairings.
   - Dietary filter toggle (Vegetarian, Vegan, Gluten-Free, Chef's Signature).
   - High-definition culinary photography with zoom effects.

4. **Dish Quick-View Modal**:
   - Detailed nutritional info (calories, prep time).
   - Allergen transparency cards.
   - Sommelier's recommended wine pairing with tasting notes.
   - One-click "Add to Tasting Order".

5. **Interactive Table Reservation Wizard**:
   - Party size selector (1 to 8+ guests).
   - Date picker & prime dining time slots (Early seating, Prime 7:30 PM, Lounge).
   - Seating atmosphere preference selector (Main Hearth Dining, Botanical Greenhouse, Chef's Tasting Counter, Heated Harbor Terrace).
   - Guest contact details & special occasion tag (Anniversary, Birthday, Business Entertaining).
   - Immediate simulated booking confirmation ticket with reference ID (e.g. `LUM-849201`) and `.ics` calendar pass download trigger.

6. **Tasting Slate / Order Drawer**:
   - Slide-over order drawer with real-time subtotal, 8.875% tax, and gratuity selector (18%, 20%, 25%, Custom).
   - Seamless connection between the online pre-order and table reservation.

7. **Private Dining & Event Inquiry Modal**:
   - Lead capture form for corporate galas, rehearsal dinners, and full restaurant buyouts.

8. **SEO & Structured Data**:
   - Pre-configured `schema.org/Restaurant` JSON-LD rich snippet for search engine visibility.

---

## 🚀 Quick Start / How to Run

### Option 1: Instant Python HTTP Server (Zero Dependencies)
```bash
cd /home/dvlpr/.gemini/antigravity/scratch/restaurant-demo
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

### Option 2: Using Node / NPM
```bash
npm start
# or
npm run serve
```

### Option 3: Direct File
You can also directly open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

---

## 📁 File Structure

```
restaurant-demo/
├── index.html            # Main markup, semantic sections, schema.org JSON-LD
├── css/
│   └── styles.css        # Custom luxury animations, glassmorphism, buttons, scrollbar
├── js/
│   ├── data.js           # Restaurant info, menu items, wine pairings, team, reviews
│   └── app.js            # State management, filtering, cart drawer, reservation wizard, modals
├── assets/               # Placeholder for custom client logos and high-res assets
├── package.json          # Preview scripts
└── README.md             # Documentation and client handover guide
```

---

## 🎨 Customizing for Your Client

To adapt this demo for a specific client:
- **Change Restaurant Name & Tagline**: Edit `info` object in `js/data.js` and top logo in `index.html`.
- **Change Menu Items & Prices**: Simply update the `menuItems` array in `js/data.js`.
- **Change Photos**: Replace Unsplash URLs in `js/data.js` with client food photos.
- **Change Primary Colors**: Adjust `--gold-primary` and `--bg-primary` variables in `css/styles.css`.
