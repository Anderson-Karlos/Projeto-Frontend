import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Signup from "./pages/Signup.jsx"
import CreateProduct from "./pages/CreateProduct.jsx"
import UpdateProduct from "./pages/UpdateProduct.jsx";
import DetailProduct from "./pages/DetailProduct.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            {/**
             * TODO: Login
             * 
             * Formulário com CPF/CNPJ e Senha
             * Botão pra fazer login
             * Chamada de API pra fazer login
             * Botão Criar Conta com link para `/signup`
             */}
            <Route path="/" Component={Login} /> { /* Post */}
            {/**
             * TODO: Registro
             * 
             * Formulário com CPF/CNPJ e Senha
             * Botão pra fazer cadastro
             * Chamada de API para fazer cadastro
             * Botão "Já tenho conta" com link para `/login`
             */ }
            <Route path="/register" Component={Signup} /> { /* Post */}
            {/**
             * TODO: Listagem de produtos 
             * 
             * Chamada de API para pegar produtos
             * Lista com produtos e dados aparentes
             * Cada produto deve ter um botão para ver detalhes do produto
             * Detalhe deve ser link para `/products/:id`
             */}
            <Route path="/all-products" Component={Products} /> {/* Get */}
            {/**
             * TODO: Criação de produto
             * 
             * Formulário com campos do produto (consultar documentação da API)
             * Botão "Criar Produto"
             * Chamada API para criar produto
             */}
            <Route path="/create-product" Component={CreateProduct} /> {/* Post */}
            {/**
             * TODO: Detalhe do produto
             * 
             * Chamada API para pegar detalhes do produto
             * Campos com os detalhes do produto
             * Botão com link para `/products/:id/update`
             */}
            <Route path="/one-product/:id" Component={DetailProduct} /> {/* Get */}
            {/**
             * TODO: Atualização de produto
             * 
             * Formulário preenchido com os dados do produto (consultar doc da API)
             * Botão Atualizar Produto
             * Chamada API para atualizar o produto com os novos dados
             */}
            <Route path="/update-product/:id" Component={UpdateProduct} /> {/* Patch */ }
          </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App