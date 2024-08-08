import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";

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
            <Route path="/login" Component={Login} /> { /* Post */}
            {/**
             * TODO: Registro
             * 
             * Formulário com CPF/CNPJ e Senha
             * Botão pra fazer cadastro
             * Chamada de API para fazer cadastro
             * Botão "Já tenho conta" com link para `/login`
             */ }
            <Route path="/signup" Component={null} /> { /* Post */}
            {/**
             * TODO: Listagem de produtos 
             * 
             * Chamada de API para pegar produtos
             * Lista com produtos e dados aparentes
             * Cada produto deve ter um botão para ver detalhes do produto
             * Detalhe deve ser link para `/products/:id`
             */}
            <Route path="/products" Component={null} /> {/* Get */}
            {/**
             * TODO: Criação de produto
             * 
             * Formulário com campos do produto (consultar documentação da API)
             * Botão "Criar Produto"
             * Chamada API para criar produto
             */}
            <Route path="/products/create" Component={null}> /</Route> {/* Post */}
            {/**
             * TODO: Detalhe do produto
             * 
             * Chamada API para pegar detalhes do produto
             * Campos com os detalhes do produto
             * Botão com link para `/products/:id/update`
             */}
            <Route path="/products/:id" Component={null} /> {/* Get */}
            {/**
             * TODO: Atualização de produto
             * 
             * Formulário preenchido com os dados do produto (consultar doc da API)
             * Botão Atualizar Produto
             * Chamada API para atualizar o produto com os novos dados
             */}
            <Route path="/products/:id/update" Component={null} /> {/* Patch */ }
          </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App