import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");    
            const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setProduct(response.data.data.product);
        } catch (err) {
            console.log(err);
            setError("Erro ao carregar dados do produto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleDeleteProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://interview.t-alpha.com.br/api/products/delete-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/all-products");
        } catch (err) {
            setError("Erro ao excluir o produto. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div>Carregando...</div>;

    return (
        /*
        <div>
            <span>Detalhes do Produto</span>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p><strong>Nome:</strong> {product.name}</p>
            <p><strong>Descrição:</strong> {product.description}</p>
            <p><strong>Preço:</strong> {product.price.toFixed(2)}</p>
            <p><strong>Estoque:</strong> {product.stock}</p>

            <button onClick={() => setShowConfirm(true)}
                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                    Excluir
            </button>

            <button onClick={() => {navigate("/all-products")}}
                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                    Voltar
            </button>


            {showConfirm && (
                <div>
                    <p>Você tem certeza que deseja excluir este produto?</p>
                    <button onClick={handleDeleteProduct}>Sim</button>
                    <button onClick={() => setShowConfirm(false)}>Não</button>
                </div>
            )}
        </div>
        */

        <form>
                <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h1 class="text-base font-semibold leading-7 text-gray-900">Detalhes do Produto</h1>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div class="sm:col-span-4">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
          <div class="mt-2">
            <p class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
            {product.name}
            </p>
          </div>
        </div>

        <div class="sm:col-span-5">
            <label for="Description" class="block text-sm font-medium leading-6 text-gray-900">Descrição:</label>
            <div class="mt-2">
            <p class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
            {product.description}
            </p>
            </div>
        </div>

        <div class="sm:col-span-4">
          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Preço:</label>
          <div class="mt-2">
          <p class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
          {product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Estoque:</label>
          <div class="mt-2">
          <p class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
            {product.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button 
        type="button" 
        onClick={() => {navigate("/all-products")}}
        className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-500 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Cancelar
    </button>

    <button 
        type="button"
        onClick={() => setShowConfirm(true)} 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        {loading ? "Excluindo Produto..." : "Excluir"}
    </button>

    {showConfirm && (
                <div>
                    <p>Você tem certeza que deseja excluir este produto?</p>
                    <button 
                        onClick={handleDeleteProduct}
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sim
                    </button>

                    <button 
                        onClick={() => setShowConfirm(false)} 
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Não
                    </button>
                </div>
            )}

  </div>
</form>

    );
}

export default DetailProduct;
