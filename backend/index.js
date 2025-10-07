const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Example route: Get products
app.get('/products', async (req, res) => {
  const products = await db.all('SELECT * FROM products');
  res.json(products);
});

// Example route: Add product
app.post('/products', async (req, res) => {
  const { name, price, stock } = req.body;
  await db.run('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock]);
  res.json({ message: 'Product added' });
});

// Add more routes for services, customers, invoices...

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});