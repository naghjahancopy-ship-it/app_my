import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', purchase_price: '', sale_price: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ name: product.name, quantity: product.quantity, purchase_price: product.purchase_price, sale_price: product.sale_price });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', quantity: '', purchase_price: '', sale_price: '' });
  };

  return (
    <div>
      <h1>مدیریت کالاها</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="نام کالا" required />
        <input type="number" name="quantity" value={form.quantity} onChange={handleInputChange} placeholder="موجودی" required />
        <input type="number" name="purchase_price" value={form.purchase_price} onChange={handleInputChange} placeholder="قیمت خرید" required />
        <input type="number" name="sale_price" value={form.sale_price} onChange={handleInputChange} placeholder="قیمت فروش" required />
        <button type="submit">{editingId ? 'ویرایش کالا' : 'افزودن کالا'}</button>
        {editingId && <button onClick={resetForm}>لغو</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت خرید</th>
            <th>قیمت فروش</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.purchase_price}</td>
              <td>{product.sale_price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>ویرایش</button>
                <button onClick={() => handleDelete(product.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;