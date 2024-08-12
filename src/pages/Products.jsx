import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct} from "../service/productService";
import ModalComponent from "../components/ModalComponent";

function Products() {
    const [id, setId] = useState(null);
    const [products, setProducts] = useState([]);
    const [productToExclude, setProductToExclude] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dialogRef = useRef(null);
    const [mensagem, setMensagem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleDeleteProduct = (produto) => {
        try {                                    
            const created = deleteProduct(produto.id)
            const updatedProducts = products.filter(product => product.id !== produto.id);
            setProducts(updatedProducts)

            if (!created)
                throw new Error ('Deu erro aqyu')                                         
                    
        } catch (err) {
            console.log(err);
            setError("Erro ao excluir o produto: " + err);
        } finally {
            setLoading(false);
        }
    };

    if (!products) return <div>Carregando...</div>

    const obj = {titulo: 'Confirmação', mensagem: 'Deseja realmente excluir esse produto?'};
    const openModal = (objMensagem, product) => { 
        setProductToExclude(product);            
        setMensagem(objMensagem);
        setIsModalVisible(true);
        setTimeout(() => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
                
            }
        }, 0); 
    }
    

    const closeModal = () => {
        dialogRef.current.close()
        setShowConfirm(false)
    }    

    const formatMoney = (valor) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    };        

    return (
        <div className="p-8">
            <h1>Lista de Produtos</h1>
            
            <div className="grid grid-cols-3 xs:grid-cols-1 gap-4">
                {products.map((product) => (                    
                    <div key={product.id} className="flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="p-4 flex-col flex w-full flex-wrap">
                            <div className="flex flex-row w-full items-center justify-between">
                                <span className="grow-1 font-sans font-medium text-blue-gray-900 text-wrap break-words">
                                    {product.name ?? 'Produto'}                            
                                </span>
                                <p className="grow-1 font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                {formatMoney(product.price ?? 0) }                                                       
                                </p>
                            </div>
                            
                            <p className="truncate text-ellipsis font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                                {product.description}
                            </p>
                        </div>

                        <div className="px-6 flex flex-row">
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
                                onClick = {() => openModal(obj, product)}
                                className="select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Deletar                                
                            </button>


                        </div>
                    </div>
                ))}

                { mensagem && (<ModalComponent closeModal={closeModal} ref={dialogRef} item={mensagem} onConfirm={() => handleDeleteProduct(productToExclude)} />)}          
            </div>

            <div className="flex gap-5 py-8"> 
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

        </div>
    );
}

export default Products;