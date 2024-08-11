import { useState, useEffect } from "react";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
    const { id } = useParams();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("tokeeeennn / " + token)
                const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const product = response.data.data.product;                
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setStock(product.stock);
            } catch(err) {
                console.log(err)
                setError("Erro ao carregar dados do produto.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdateProduct = async () => {
        setLoading(true);
        setError(null);

        const dados = {
            name: name,
            description: description,
            price:parseFloat(price),
            stock: Number(stock) 
        }

        console.log("Entrou aqui");

        console.log("dados: " + JSON.stringify(dados))

        try {
            const token = localStorage.getItem("token");
            //vericar
            const response = await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, dados,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response: " + JSON.stringify(response));

        if (response.status == 200) {
            navigate("/all-products");
        } else {
            setError("Erro ao atualizar produto. Por favor, tente novamente.");
        }
        } catch(err) {
            console.log("catch do erro: " + JSON.stringify(err))
            setError("Erro na requisição. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /*
        <div>
            <span>Editar Produto</span>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Nome:</h2>
            <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <h2>Descrição:</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <h2>Preço:</h2>
            <input 
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <h2>Estoque:</h2>
            <input 
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />

            <button onClick={handleUpdateProduct}>
                {loading ? "Atualizando Produto..." : "Atualizar Produto"}
            </button>

            <button onClick={() => navigate("/all-products")}>
                Cancelar
            </button>
            </div>
            */


            <form>
                <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h1 class="text-base font-semibold leading-7 text-gray-900">Atualizar Produto</h1>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

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
        onClick={handleUpdateProduct} 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        {loading ? "Atualizando Produto..." : "Atualizar Produto"}
    </button>
  </div>
</form>

        
    );
    }

export default UpdateProduct;