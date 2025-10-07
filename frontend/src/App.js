import React from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {
  return (
    <div>
      <h1>اپلیکیشن حسابداری مغازه (app_my)</h1>
      <Dashboard />
      <Products />
      {/* صفحات دیگر بعداً اضافه می‌شوند */}
    </div>
  );
}

export default App;