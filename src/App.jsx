import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Signup from './pages/Signup.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import UpdateProduct from './pages/UpdateProduct.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <div>
      <BrowserRouter basename="/Projeto-Frontend">
        <Routes>
          <Route path="/" Component={Login} /> {/* Post */}
          <Route path="/register" Component={Signup} />
          <Route path="/all-products" Component={Products} />
          <Route path="/create-product" Component={CreateProduct} />
          <Route path="/one-product/:id" Component={DetailProduct} />
          <Route path="/update-product/:id" Component={UpdateProduct} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
