import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsById, deleteProduct } from "../service/productService";
import ModalComponent from "../components/ModalComponent";

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dialogRef = useRef(null);
    const [mensagem, setMensagem] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);


    const navigate = useNavigate();

    const fetchProduct = async () => {

        try {
            const product = await getProductsById(id);
            setProduct(product);             

        } catch (err) {
            console.log(err);
            setError("Erro ao obter dados do produto: " + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <p>Carregando produto...</p>;
    if (error) return <p>{error}</p>;

    const formatMoney = (valor) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    };
           
    const handleDeleteProduct = (p) => {
        try {
            const sucess = deleteProduct(p.id)

            if (!sucess) 
                throw  new Error ('')
            
        } catch (err) {
            console.log(err);
            setError("Erro ao excluir o produto" + err);
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div>Carregando...</div>;

    const obj = {
        titulo: 'Confirmação', 
        mensagem: 'Deseja realmente excluir esse produto?',
        rota: '/all-products'
    };
    
    const openModal = (objMensagem, p) => {        
        setMensagem(objMensagem);
        setIsModalVisible(true);
        
        setTimeout(() => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        }, 0);
    }

    const closeModal = () => {
        dialogRef.current.close();
        setIsModalVisible(false)
    }

    return (

        <div>
            <div className="flex flex-col px-10 py-5">
                <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center w-full">
                    <h1 className="text-4xl font-semibold leading-7 mt-5 text-gray-900 self-center">Detalhes do Produto</h1>                
                    <div className="mt-12 gap-y-8 flex flex-col w-1/2">
                        <div className="sm:col-span-4">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Nome:</span>
                            <div className="mt-2">
                                <p className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
                                    {product.name}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-5">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Descrição:</span>
                            <div className="mt-2">
                                <p className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Preço:</span>
                            <div className="mt-2">
                                <p className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
                                    {product.price.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <span className="block text-sm font-medium leading-6 text-gray-900">Estoque:</span>
                            <div className="mt-2">
                                <p className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400">
                                    {product.stock}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 px-10">
                <button
                    type="button"
                    onClick={() => { navigate("/all-products") }}
                    className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-500 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={() => openModal(obj)}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    {loading ? "Excluindo Produto..." : "Excluir"}
                </button>         
            </div>

            {isModalVisible && mensagem && (<ModalComponent closeModal={closeModal} ref={dialogRef} item={mensagem} onConfirm={() => handleDeleteProduct(product)} />)}          
        </div>

    );
}

export default DetailProduct;
