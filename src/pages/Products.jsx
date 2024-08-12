import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct} from "../service/productService";

function Products() {
    const [id, setId] = useState(null);
    const [products, setProducts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {            
            const produtos = await getAllProducts();                 
            setProducts(produtos);
            
        } catch (err) {
            console.log(err)
            setError("Erro ao buscar produtos: " + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;

    const handleDeleteProduct = async (idProduto) => {
        try {            
            const created = await deleteProduct(idProduto)

            if (!created)
                throw new Error ()
            
            fetchProducts();                            
                    
        } catch (err) {
            console.log(err)
            setError("Erro ao excluir o produto: " + err);
        }
    };


    return (
        <div className="p-8">
            <h1>Lista de Produtos</h1>
            
            <ul className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <li key={product.id} className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="p-6">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {product.name ?? 'Produto'}
                            </p>
                            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            ${product.price ?? 0}
                            </p>
                        </div>
                        <p className="block truncate text-ellipsis font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                            {product.description}
                        </p>
                        </div>
                        <div className="px-3">
                            <button
                                onClick = {() => navigate(`/one-product/${product.id}`)}
                                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-3 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Detalhes
                            </button>
                            <button
                                onClick = {() => navigate(`/update-product/${product.id}`)}
                                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Editar
                            </button>
                            <button
                                onClick = {() => setShowConfirm(true)}
                                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Deletar
                            </button>

                            {showConfirm && (
                                <div>
                                    <p>Você tem certeza que deseja excluir este produto?</p>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Sim</button>
                                    <button onClick={() => setShowConfirm(false)}>Não</button>
                                </div>
                            )}

                        </div>
                    </li>
                ))}
            </ul>

            <button 
                onClick={() => {navigate("/create-product")}}
                className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-500 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                    Criar Produto
            </button>

            <button onClick={() => {
                localStorage.removeItem("token")
                navigate("/")
            }}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                    Fazer Logof
            </button>

        </div>
    );
}

export default Products;