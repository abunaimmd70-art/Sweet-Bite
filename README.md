# 🍰 Sweet Bite — Bakery, Fast Food & Artisan Cafe

> **"Taste Is Our Priority"**  
> A modern web application for bakeries and cafes featuring an interactive shopping cart, instant WhatsApp order ticket generation, printable thermal receipt slips, a PIN-protected admin management dashboard, and a native SQLite database.

---

## ✨ Features

- 🛒 **Multi-Item Shopping Cart**: Interactive slide-over drawer with real-time subtotal, quantity adjustment, and item removal.
- 🚚 **Free Delivery Progress Tracker**: Live progress bar granting free delivery on orders over ৳800.
- 📱 **Direct WhatsApp Checkout**: Itemized order tickets sent directly to WhatsApp (`+8801976251128`) with customer name, delivery address/table number, and payment method (Cash on Delivery, bKash, Nagad).
- 🧾 **Printable Digital Receipt**: Thermal-style printable receipt slips (`window.print()`) and order history tracking with 1-click re-ordering.
- 🏷️ **Promo Codes**: Built-in coupon engine (`SWEET10`, `SWEET50`, `FREEDEL`).
- 🔍 **Interactive Food Quick-View**: High-resolution image popup, dietary tags, descriptions, and ingredients.
- 🔐 **PIN-Protected Admin Portal (`admin.html`)**: Default PIN: `1234`. Live revenue and order metrics, image uploader (Base64) with live preview, and 1-click stock availability toggling.
- 🗄️ **Native SQLite Database Engine**: Powered by Node.js v24 `node:sqlite` (`sweetbite.db`). Zero external dependencies needed.
- 🍽️ **20 Gourmet Dishes & Desserts**: Offline-ready high-resolution photos stored locally in `/images`.
- 🎨 **Modern Responsive UI**: Built with Tailwind CSS and Font Awesome icons.

---

## 🚀 Getting Started

### Option 1: Run with SQLite Backend (Recommended)

1. Make sure you have **Node.js** (v22+ or v24) installed.
2. Clone this repository:
   ```bash
   git clone https://github.com/abunaimmd70-art/Sweet-Bite.git
   cd Sweet-Bite
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *(Or double-click `run-server.bat` on Windows)*
4. Open **http://localhost:3000** in your browser!

### Option 2: Run Offline / Static

Simply open `index.html` in any web browser! The application automatically detects if the backend server is running and falls back gracefully to `localStorage`.

---

## 🔐 Admin Access

- **URL**: `admin.html` (or http://localhost:3000/admin.html)
- **Default PIN**: `1234`

---

## 📄 License

ISC License © Sweet Bite. Handcrafted with passion.
