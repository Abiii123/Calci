# MyCalci — Indian Rupee (INR) Percentage Calculator

**Your money. Your calculations. Instantly.**

A modern, responsive, high-performance percentage calculator designed specifically for amounts in Indian Rupees (INR).

---

## ✨ Features

- **Accurate Indian Numbering System**: Full formatting with Lakhs and Crores (`₹1,00,000` / `₹10,00,000` / `₹1,00,00,000`) using JavaScript's native `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
- **Amount in Words Preview**: Converts any entered amount and result into standard Indian words (e.g., *"One Lakh Rupees"*, *"Ten Thousand Rupees"*).
- **Instant Real-Time Calculations**: Calculates immediately as you type using `Result = Amount × Percentage ÷ 100`.
- **Visual Highlight Display**: Prominently highlights the calculated result in vibrant emerald accents with glow effects.
- **Quick Amount Presets**: Instant one-click preset buttons for `₹1,000` (1K), `₹10,000` (10K), `₹50,000` (50K), `₹1,00,000` (1 Lakh), and `₹10,00,000` (10 Lakhs).
- **Quick Percentage Presets**: Clickable buttons for `1%`, `5%` (GST), `10%`, `12%` (GST), `18%` (GST), `20%`, `25%`, `30%`, `50%` (Half), and `100%` (Full).
- **Calculation Breakdowns**:
  - **Amount + Percentage (Total Gross)**: Ideal for GST, Sales Tax, Markup, or Tips.
  - **Amount - Percentage (Total Net)**: Ideal for Discounts, TDS, or Deductions.
- **Copy & Share**:
  - One-click **Copy Result** with celebratory confetti and toast notification.
  - **Copy Summary Text** (e.g. `10% of ₹1,00,000.00 = ₹10,000.00`).
- **Calculation History**: Automatically saves recent calculations to `localStorage` with timestamps; click any past entry to reload it into the calculator.
- **Sound Effects**: Subtle Web Audio synthesizer clicks on button presses (with mute toggle).
- **Keyboard Shortcuts**:
  - `Esc`: Clear / Reset calculator
  - `Enter`: Trigger calculation & save to history

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Dark Navy `#070b14` + Emerald `#10b981` / `#34d399` accents)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti + CSS Transitions
- **Build Tool**: Vite 8

---

## 🚀 Getting Started

To run the development server locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/](http://localhost:5173/) in your browser.

To create a production build:

```bash
npm run build
npm run preview
```
