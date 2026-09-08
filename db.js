/**
 * Sweet Bite — Universal Database Adapter Layer (db.js)
 * Connects seamlessly to the Node.js + SQLite REST API backend (http://localhost:3000/api)
 * Gracefully falls back to browser localStorage if the server is not running.
 */

(function(window) {
  'use strict';

  // Determine API base URL
  const DEFAULT_API_HOST = 'http://localhost:3000';
  const API_BASE = window.location.origin.includes('localhost:3000') 
    ? '/api' 
    : `${DEFAULT_API_HOST}/api`;

  let isConnected = false;
  let hasCheckedConnection = false;

  const db = {
    provider: 'local', // 'sqlite' or 'local'

    // Check if SQLite Backend Server is running
    async checkConnection() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const res = await fetch(`${API_BASE}/health`, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'ok') {
            isConnected = true;
            this.provider = 'sqlite';
            this.updateStatusBadge(true);
            return true;
          }
        }
      } catch (err) {
        // Backend offline, fallback to local storage
      }
      isConnected = false;
      this.provider = 'local';
      this.updateStatusBadge(false);
      return false;
    },

    // UI Status Indicator
    updateStatusBadge(online) {
      const badge = document.getElementById('dbStatusBadge');
      if (!badge) return;

      if (online) {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> <span class="text-emerald-700 font-bold">Database: SQLite Connected</span>`;
        badge.className = 'inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full';
        badge.title = 'Connected to SQLite database at sweetbite.db';
      } else {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> <span class="text-amber-800 font-medium">Database: Local Cache</span>`;
        badge.className = 'inline-flex items-center gap-1.5 text-[11px] font-semibold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full';
        badge.title = 'Run "npm start" in the project directory to connect the SQLite database';
      }
    },

    // 1. GET MENU
    async getMenu() {
      if (!hasCheckedConnection) {
        await this.checkConnection();
        hasCheckedConnection = true;
      }

      if (isConnected) {
        try {
          const res = await fetch(`${API_BASE}/menu`);
          if (res.ok) {
            const menu = await res.json();
            // Cache locally
            localStorage.setItem('sweetbite_menu', JSON.stringify(menu));
            return menu;
          }
        } catch (e) {
          console.warn('SQLite fetch failed, reading from cache:', e);
        }
      }

      // Local fallback
      try {
        const raw = localStorage.getItem('sweetbite_menu');
        return raw ? JSON.parse(raw) : (window.DEFAULT_MENU || []);
      } catch (e) {
        return window.DEFAULT_MENU || [];
      }
    },

    // 2. SAVE ITEM (Create or update)
    async saveItem(item) {
      if (!hasCheckedConnection) await this.checkConnection();

      // Update LocalStorage first for instant responsive UI
      let localMenu = [];
      try {
        localMenu = JSON.parse(localStorage.getItem('sweetbite_menu') || '[]');
      } catch(e) {}
      const idx = localMenu.findIndex(i => i.id === item.id);
      if (idx >= 0) localMenu[idx] = item;
      else localMenu.push(item);
      localStorage.setItem('sweetbite_menu', JSON.stringify(localMenu));

      if (isConnected) {
        try {
          const res = await fetch(`${API_BASE}/menu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          if (res.ok) {
            return await res.json();
          }
        } catch (e) {
          console.warn('SQLite save failed:', e);
        }
      }
      return item;
    },

    // 3. TOGGLE STOCK
    async toggleStock(id) {
      if (!hasCheckedConnection) await this.checkConnection();

      let newStatus = true;
      try {
        const localMenu = JSON.parse(localStorage.getItem('sweetbite_menu') || '[]');
        const target = localMenu.find(i => i.id === id);
        if (target) {
          target.inStock = target.inStock === false ? true : false;
          newStatus = target.inStock;
          localStorage.setItem('sweetbite_menu', JSON.stringify(localMenu));
        }
      } catch(e) {}

      if (isConnected) {
        try {
          const res = await fetch(`${API_BASE}/menu/${encodeURIComponent(id)}/toggle-stock`, {
            method: 'PATCH'
          });
          if (res.ok) {
            const data = await res.json();
            return data.inStock;
          }
        } catch (e) {
          console.warn('SQLite toggle stock failed:', e);
        }
      }
      return newStatus;
    },

    // 4. DELETE ITEM
    async deleteItem(id) {
      if (!hasCheckedConnection) await this.checkConnection();

      try {
        let localMenu = JSON.parse(localStorage.getItem('sweetbite_menu') || '[]');
        localMenu = localMenu.filter(i => i.id !== id);
        localStorage.setItem('sweetbite_menu', JSON.stringify(localMenu));
      } catch(e) {}

      if (isConnected) {
        try {
          await fetch(`${API_BASE}/menu/${encodeURIComponent(id)}`, {
            method: 'DELETE'
          });
        } catch (e) {
          console.warn('SQLite delete failed:', e);
        }
      }
      return true;
    },

    // 5. GET ORDERS
    async getOrders() {
      if (!hasCheckedConnection) await this.checkConnection();

      if (isConnected) {
        try {
          const res = await fetch(`${API_BASE}/orders`);
          if (res.ok) {
            const orders = await res.json();
            localStorage.setItem('sweetbite_orders', JSON.stringify(orders));
            return orders;
          }
        } catch (e) {
          console.warn('SQLite get orders failed:', e);
        }
      }

      try {
        return JSON.parse(localStorage.getItem('sweetbite_orders') || '[]');
      } catch(e) {
        return [];
      }
    },

    // 6. SAVE ORDER
    async saveOrder(order) {
      if (!hasCheckedConnection) await this.checkConnection();

      // Save locally
      try {
        const localOrders = JSON.parse(localStorage.getItem('sweetbite_orders') || '[]');
        localOrders.unshift(order);
        localStorage.setItem('sweetbite_orders', JSON.stringify(localOrders));
      } catch(e) {}

      if (isConnected) {
        try {
          await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
          });
        } catch (e) {
          console.warn('SQLite save order failed:', e);
        }
      }
      return order;
    },

    // 7. CLEAR ORDERS
    async clearOrders() {
      if (!hasCheckedConnection) await this.checkConnection();

      localStorage.setItem('sweetbite_orders', '[]');

      if (isConnected) {
        try {
          await fetch(`${API_BASE}/orders`, { method: 'DELETE' });
        } catch (e) {
          console.warn('SQLite clear orders failed:', e);
        }
      }
      return true;
    },

    // 8. RESET MENU
    async resetMenu() {
      if (!hasCheckedConnection) await this.checkConnection();

      if (isConnected) {
        try {
          const res = await fetch(`${API_BASE}/reset-menu`, { method: 'POST' });
          if (res.ok) {
            const menu = await res.json();
            localStorage.setItem('sweetbite_menu', JSON.stringify(menu));
            return menu;
          }
        } catch (e) {
          console.warn('SQLite reset menu failed:', e);
        }
      }

      const def = window.DEFAULT_MENU || [];
      localStorage.setItem('sweetbite_menu', JSON.stringify(def));
      return def;
    }
  };

  window.SweetBiteDB = db;

  // Auto-check connection on load
  document.addEventListener('DOMContentLoaded', () => {
    db.checkConnection();
  });

})(window);
