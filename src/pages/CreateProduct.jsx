import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../service/productService";

function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleCreateProduct = async () =>{
        setLoading(true);
        setError('');

        const dados = {
            name: name,
            description: description,
            price: parseFloat(price),
            stock: Number(stock)
        }

        console.log(dados)

        try {            
            const response = await createProduct(dados);
            console.log(response)

            if (response.status === 201) {
                navigate("/all-products");
            } else {
                throw new Error("Erro ao criar produto. Por favor, tente novamente." + response.status)
            }

        } catch(err){
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return (

<div>
    <div className="flex flex-col px-10 py-5">        
    <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center w-full">
        <h1 className="text-4xl font-semibold leading-7 mt-5 text-gray-900 self-center">Criar Produto</h1>

      <div className="mt-12 gap-y-8 flex flex-col w-1/2">

        <div class="sm:col-span-4">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
          <div class="mt-2">
            <input 
                type="text" 
                name="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-5">
          <label for="Description" class="block text-sm font-medium leading-6 text-gray-900">Descrição:</label>
          <div class="mt-2">
            <input 
                type="textarea" 
                name="Description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Preço:</label>
          <div class="mt-2">
            <input 
                name="price" 
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Estoque:</label>
          <div class="mt-2">
            <input 
                id="stock" 
                name="stock" 
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button 
        type="button" 
        onClick={() => navigate("/all-products")}
        className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-500 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Cancelar
    </button>

    <button 
        type="submit"
        onClick={handleCreateProduct} 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        {loading ? "Criando Produto..." : "Salvar"}
    </button>
  </div>
  </div>
    )
}

export default CreateProduct;