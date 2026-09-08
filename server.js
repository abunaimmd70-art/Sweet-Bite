/**
 * Sweet Bite — Dedicated Fullstack Backend Server
 * Uses Node.js v24 native node:sqlite (zero external dependencies required!)
 * Serves REST API and static frontend at http://localhost:3000
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'sweetbite.db');

// Initialize SQLite Database
const db = new DatabaseSync(DB_PATH);

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    tag TEXT,
    description TEXT,
    image TEXT,
    in_stock INTEGER DEFAULT 1,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    order_id TEXT PRIMARY KEY,
    date TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    customer_notes TEXT,
    order_type TEXT,
    payment_method TEXT,
    items_json TEXT,
    subtotal REAL,
    discount REAL,
    delivery_fee REAL,
    grand_total REAL,
    coupon_code TEXT,
    created_at TEXT
  );
`);

// Initial 20 Default Items Seed Data
const DEFAULT_MENU = [
  {
    id: 'sb-1',
    name: 'Crispy Chicken Burger',
    price: 220,
    category: 'Fast Food',
    tag: "Chef's Special",
    description: 'Crispy seasoned chicken fillet with fresh crunchy iceberg lettuce, creamy mayonnaise, and house secret sauce in a warm brioche bun.',
    image: 'Chicken Burger.JPG',
    inStock: true
  },
  {
    id: 'sb-2',
    name: 'Smoky BBQ Beef Burger',
    price: 290,
    category: 'Fast Food',
    tag: 'Best Seller',
    description: 'Grilled juicy beef patty smothered in rich smoky BBQ sauce, melted cheddar cheese, caramelized onions, and crisp pickles.',
    image: 'BBQ Beef Burger.jpg',
    inStock: true
  },
  {
    id: 'sb-3',
    name: 'Crispy Peri-Peri Wings',
    price: 230,
    category: 'Fast Food',
    tag: 'Spicy',
    description: 'Golden fried chicken wings tossed in tangy hot peri-peri glaze, served with a side of creamy garlic mayo dip.',
    image: 'Crispy Chicken Wings.jpg',
    inStock: true
  },
  {
    id: 'sb-4',
    name: 'Loaded Cheesy Fries',
    price: 180,
    category: 'Fast Food',
    tag: 'Popular',
    description: 'Crisp golden French fries drenched in warm melted cheddar cheese sauce, topped with spicy jalapeño slices and herbs.',
    image: 'Loaded Cheesy Fries.jpg',
    inStock: true
  },
  {
    id: 'sb-5',
    name: 'Grand Club Sandwich',
    price: 240,
    category: 'Fast Food',
    tag: "Chef's Special",
    description: 'Triple-decker toasted sandwich layered with smoked chicken slices, fried egg, cheese, sliced tomatoes, and honey mustard.',
    image: 'Club Sandwich.jpg',
    inStock: true
  },
  {
    id: 'sb-6',
    name: 'Cheese Burst Pizza',
    price: 450,
    category: 'Pizza',
    tag: 'Best Seller',
    description: 'Loaded with double layers of 100% pure mozzarella cheese, rich Italian herb tomato sauce, fresh basil, and oregano on a hand-tossed crust.',
    image: 'Chese Pizza.JPG',
    inStock: true
  },
  {
    id: 'sb-7',
    name: 'Smoky BBQ Chicken Pizza',
    price: 480,
    category: 'Pizza',
    tag: "Chef's Special",
    description: 'Stone-baked pizza topped with tender grilled chicken chunks, red onions, sweet bell peppers, melted mozzarella, and smoky barbecue swirl.',
    image: 'BBQ Chicken Pizza.jpg',
    inStock: true
  },
  {
    id: 'sb-8',
    name: 'Creamy Alfredo Pasta',
    price: 260,
    category: 'Pizza',
    tag: 'Vegetarian',
    description: 'Penne pasta gently simmered in a velvety garlic parmesan Alfredo cream sauce with sautéed button mushrooms and cracked black pepper.',
    image: 'White Sauce Pasta.jpg',
    inStock: true
  },
  {
    id: 'sb-9',
    name: 'Royal Chicken Biriyani',
    price: 280,
    category: 'Main Course',
    tag: 'Popular',
    description: 'Authentic aromatic basmati rice cooked on slow dum with tender marinated chicken, golden saffron potatoes, and boiled egg.',
    image: 'Chicken Biriyani.jpg',
    inStock: true
  },
  {
    id: 'sb-10',
    name: 'Mutton Kacchi Biriyani',
    price: 380,
    category: 'Main Course',
    tag: "Chef's Special",
    description: 'Traditional celebratory feast featuring tender slow-cooked mutton, fragrant chinigura rice, rich ghee, saffron, and sweet aloo bukhara.',
    image: 'Mutton Kacchi Biriyani.jpg',
    inStock: true
  },
  {
    id: 'sb-11',
    name: 'Butter Chicken with Naan',
    price: 320,
    category: 'Main Course',
    tag: 'Best Seller',
    description: 'Succulent tandoori chicken simmered in a silky tomato, butter, and cashew makhani gravy, served with fluffy garlic butter naan.',
    image: 'Butter Chicken.jpg',
    inStock: true
  },
  {
    id: 'sb-12',
    name: 'Death by Chocolate Fudge Cake',
    price: 240,
    category: 'Dessert',
    tag: 'Best Seller',
    description: 'Ultra-moist Belgian dark chocolate sponge layered with thick velvety fudge ganache and dark chocolate curls. Pure chocolate bliss!',
    image: 'Chocolate Fudge Cake.jpg',
    inStock: true
  },
  {
    id: 'sb-13',
    name: 'New York Strawberry Cheesecake',
    price: 280,
    category: 'Dessert',
    tag: "Chef's Special",
    description: 'Classic dense and creamy baked New York cheesecake resting on a buttery biscuit base, crowned with glazed strawberry compote.',
    image: 'Strawberry Cheesecake.jpg',
    inStock: true
  },
  {
    id: 'sb-14',
    name: 'Red Velvet Pastry',
    price: 220,
    category: 'Dessert',
    tag: 'Popular',
    description: 'Soft crimson cocoa sponge layered with delicate whipped cream cheese frosting and sprinkled with fine red velvet crumbs.',
    image: 'Red Velvet Pastry.jpg',
    inStock: true
  },
  {
    id: 'sb-15',
    name: 'Belgian Nutella Waffle',
    price: 250,
    category: 'Dessert',
    tag: 'Best Seller',
    description: 'Freshly baked golden waffle with crispy edges, smothered in warm melted Nutella spread, toasted crushed nuts, and whipped cream.',
    image: 'Belgian Waffle.jpg',
    inStock: true
  },
  {
    id: 'sb-16',
    name: 'Warm Fudgy Brownie with Ice Cream',
    price: 210,
    category: 'Dessert',
    tag: "Chef's Special",
    description: 'Oven-warmed dense chocolate walnut brownie served with a scoop of premium vanilla bean ice cream and hot chocolate drizzle.',
    image: 'Fudgy Brownie.jpg',
    inStock: true
  },
  {
    id: 'sb-17',
    name: 'Caramel Coffee Latte',
    price: 160,
    category: 'Coffee & Drinks',
    tag: '',
    description: 'Freshly pulled espresso shot combined with velvety steamed milk and a golden swirl of artisanal caramel sauce.',
    image: 'Coffee Latte.jpeg',
    inStock: true
  },
  {
    id: 'sb-18',
    name: 'Iced Cold Coffee',
    price: 130,
    category: 'Coffee & Drinks',
    tag: 'Best Seller',
    description: 'Chilled creamy blended coffee topped with rich Belgian chocolate syrup drizzle and ice cubes. The ultimate thirst quencher!',
    image: 'Cold Coffee.jpg',
    inStock: true
  },
  {
    id: 'sb-19',
    name: 'Fresh Strawberry Milkshake',
    price: 170,
    category: 'Coffee & Drinks',
    tag: 'Popular',
    description: 'Thick creamy milkshake whipped with ripe strawberries, pure ice cream, and topped with whipped cream and strawberry sauce.',
    image: 'Strawberry Milkshake.jpg',
    inStock: true
  },
  {
    id: 'sb-20',
    name: 'Zesty Lemon Mint Mojito',
    price: 140,
    category: 'Coffee & Drinks',
    tag: 'Popular',
    description: 'Refreshing sparkling cooler packed with muddled fresh garden mint, zesty lime wedges, simple syrup, and sparkling soda.',
    image: 'Lemon Mint Mojito.jpg',
    inStock: true
  }
];

// Seed DB if table is empty
function seedDatabaseIfNeeded() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();
  if (countRow && countRow.count === 0) {
    console.log('Seeding SQLite database with default menu...');
    const insertStmt = db.prepare(`
      INSERT INTO menu_items (id, name, price, category, tag, description, image, in_stock, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    DEFAULT_MENU.forEach(item => {
      insertStmt.run(
        item.id,
        item.name,
        item.price,
        item.category || '',
        item.tag || '',
        item.description || '',
        item.image || '',
        item.inStock ? 1 : 0,
        new Date().toISOString()
      );
    });
    console.log('Database seeded successfully with 20 dishes!');
  }
}
seedDatabaseIfNeeded();

// Helper: Convert SQLite row to Frontend format
function formatMenuItem(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    tag: row.tag,
    description: row.description,
    image: row.image,
    inStock: Boolean(row.in_stock),
    createdAt: row.created_at
  };
}

// Helper: Read request JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Helper: Send JSON Response with CORS headers
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: Static File Content Type
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.JPG': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // ==========================================
  // REST API ROUTES
  // ==========================================

  // 1. Health check
  if (pathname === '/api/health') {
    return sendJson(res, 200, { status: 'ok', database: 'sqlite', timestamp: new Date().toISOString() });
  }

  // 2. GET /api/menu
  if (pathname === '/api/menu' && req.method === 'GET') {
    try {
      const rows = db.prepare('SELECT * FROM menu_items ORDER BY rowid ASC').all();
      const menu = rows.map(formatMenuItem);
      return sendJson(res, 200, menu);
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 3. POST /api/menu (Create or update item)
  if (pathname === '/api/menu' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const id = body.id || `sb-${Date.now()}`;
      const name = body.name || 'Untitled Dish';
      const price = parseFloat(body.price) || 0;
      const category = body.category || 'General';
      const tag = body.tag || '';
      const description = body.description || '';
      const image = body.image || 'logo.jpg';
      const inStock = body.inStock !== false ? 1 : 0;
      const createdAt = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO menu_items (id, name, price, category, tag, description, image, in_stock, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          price = excluded.price,
          category = excluded.category,
          tag = excluded.tag,
          description = excluded.description,
          image = excluded.image,
          in_stock = excluded.in_stock
      `);
      stmt.run(id, name, price, category, tag, description, image, inStock, createdAt);

      const saved = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
      return sendJson(res, 201, formatMenuItem(saved));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 4. PUT /api/menu/:id (Update dish)
  if (pathname.startsWith('/api/menu/') && req.method === 'PUT') {
    const id = pathname.replace('/api/menu/', '');
    try {
      const body = await parseJsonBody(req);
      const stmt = db.prepare(`
        UPDATE menu_items SET
          name = COALESCE(?, name),
          price = COALESCE(?, price),
          category = COALESCE(?, category),
          tag = COALESCE(?, tag),
          description = COALESCE(?, description),
          image = COALESCE(?, image),
          in_stock = COALESCE(?, in_stock)
        WHERE id = ?
      `);
      stmt.run(
        body.name,
        body.price !== undefined ? parseFloat(body.price) : null,
        body.category,
        body.tag,
        body.description,
        body.image,
        body.inStock !== undefined ? (body.inStock ? 1 : 0) : null,
        id
      );

      const updated = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
      if (!updated) return sendJson(res, 404, { error: 'Dish not found' });
      return sendJson(res, 200, formatMenuItem(updated));
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 5. PATCH /api/menu/:id/toggle-stock
  if (pathname.includes('/toggle-stock') && req.method === 'PATCH') {
    const id = pathname.replace('/api/menu/', '').replace('/toggle-stock', '');
    try {
      const item = db.prepare('SELECT in_stock FROM menu_items WHERE id = ?').get(id);
      if (!item) return sendJson(res, 404, { error: 'Dish not found' });

      const newStock = item.in_stock === 1 ? 0 : 1;
      db.prepare('UPDATE menu_items SET in_stock = ? WHERE id = ?').run(newStock, id);
      return sendJson(res, 200, { id, inStock: Boolean(newStock) });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 6. DELETE /api/menu/:id
  if (pathname.startsWith('/api/menu/') && req.method === 'DELETE') {
    const id = pathname.replace('/api/menu/', '');
    try {
      db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true, id });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 7. GET /api/orders
  if (pathname === '/api/orders' && req.method === 'GET') {
    try {
      const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
      const orders = rows.map(r => ({
        orderId: r.order_id,
        date: r.date,
        customer: {
          name: r.customer_name,
          phone: r.customer_phone,
          address: r.customer_address,
          notes: r.customer_notes
        },
        orderType: r.order_type,
        paymentMethod: r.payment_method,
        items: JSON.parse(r.items_json || '[]'),
        subtotal: Number(r.subtotal),
        discount: Number(r.discount),
        deliveryFee: Number(r.delivery_fee),
        grandTotal: Number(r.grand_total),
        couponCode: r.coupon_code,
        createdAt: r.created_at
      }));
      return sendJson(res, 200, orders);
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 8. POST /api/orders (Record new order)
  if (pathname === '/api/orders' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const stmt = db.prepare(`
        INSERT INTO orders (
          order_id, date, customer_name, customer_phone, customer_address, customer_notes,
          order_type, payment_method, items_json, subtotal, discount, delivery_fee, grand_total, coupon_code, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        body.orderId,
        body.date || new Date().toLocaleString(),
        body.customer?.name || '',
        body.customer?.phone || '',
        body.customer?.address || '',
        body.customer?.notes || '',
        body.orderType || 'Home Delivery',
        body.paymentMethod || 'Cash on Delivery',
        JSON.stringify(body.items || []),
        body.subtotal || 0,
        body.discount || 0,
        body.deliveryFee || 0,
        body.grandTotal || 0,
        body.couponCode || '',
        new Date().toISOString()
      );
      return sendJson(res, 201, { success: true, orderId: body.orderId });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 9. DELETE /api/orders (Clear orders log)
  if (pathname === '/api/orders' && req.method === 'DELETE') {
    try {
      db.prepare('DELETE FROM orders').run();
      return sendJson(res, 200, { success: true, message: 'Orders cleared' });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 10. POST /api/reset-menu (Restore default 20 dishes)
  if (pathname === '/api/reset-menu' && req.method === 'POST') {
    try {
      db.prepare('DELETE FROM menu_items').run();
      const insertStmt = db.prepare(`
        INSERT INTO menu_items (id, name, price, category, tag, description, image, in_stock, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      DEFAULT_MENU.forEach(item => {
        insertStmt.run(
          item.id,
          item.name,
          item.price,
          item.category || '',
          item.tag || '',
          item.description || '',
          item.image || '',
          item.inStock ? 1 : 0,
          new Date().toISOString()
        );
      });
      const rows = db.prepare('SELECT * FROM menu_items ORDER BY rowid ASC').all();
      return sendJson(res, 200, rows.map(formatMenuItem));
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // ==========================================
  // STATIC ASSET SERVING
  // ==========================================

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // If path doesn't exist, try resolving index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('File not found');
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🍰 Sweet Bite Server running at: http://localhost:${PORT}`);
  console.log(`📁 Database Engine: Native SQLite (${DB_PATH})`);
  console.log(`🔌 REST API endpoints ready at /api/menu and /api/orders`);
  console.log(`======================================================\n`);
});
