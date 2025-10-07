import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>مدیریت کالاها</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - قیمت: {p.price} تومان - موجودی: {p.stock}</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;