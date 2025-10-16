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

// Route to add a new product
app.post('/products', async (req, res) => {
  const { name, quantity, purchase_price, sale_price } = req.body;
  await db.run(
    'INSERT INTO products (name, quantity, purchase_price, sale_price) VALUES (?, ?, ?, ?)',
    [name, quantity, purchase_price, sale_price]
  );
  res.json({ message: 'Product added successfully' });
});

// Route to update a product
app.put('/products/:id', async (req, res) => {
  const { name, quantity, purchase_price, sale_price } = req.body;
  const { id } = req.params;
  await db.run(
    'UPDATE products SET name = ?, quantity = ?, purchase_price = ?, sale_price = ? WHERE id = ?',
    [name, quantity, purchase_price, sale_price, id]
  );
  res.json({ message: 'Product updated successfully' });
});

// Route to delete a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM products WHERE id = ?', [id]);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});