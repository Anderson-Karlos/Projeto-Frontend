import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";
import { updateProduct,  getProductsById } from "../service/productService";

function UpdateProduct() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dialogRef = useRef(null);
    const [mensagem, setMensagem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = (objMensagem) => {
        setMensagem(objMensagem);
        setIsModalVisible(true);
        setTimeout(() => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        }, 0);  // Usando um pequeno delay para garantir a renderização antes do showModal
    }
    

    const closeModal = () => {
        dialogRef.current.close()
    }

    const navigate = useNavigate();

    useEffect(() => {        
        const fetchProduct = async () => {
            try {
                const product = await getProductsById(id)
                
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setStock(product.stock);
            } catch(err) {
                console.log(err)
                setError("Erro ao carregar dados do produto: " + err);
            }
        };

        fetchProduct();       

    }, [id, getProductsById]);

    const handleUpdateProduct = async () => {
        setLoading(true);
        setError('');

        const dados = {
            name: name,
            description: description,
            price: parseFloat(price),
            stock: Number(stock) 
        }

        try {                        
            const response = await updateProduct(id, dados);
            console.log(response);
            const obj = {titulo: 'Confirmação', mensagem: 'Deseja realmente atualizar produto?', rota: '/all-products'};  console.log("Response: " + JSON.stringify(response));

            if (response) 
                openModal(obj)
        
        } catch(err) {
            console.log(err)    
            setError("Erro ao atualizar produto. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };    
    

    return (

    <div className="flex flex-col px-10 py-5">        
        <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center w-full">
            <h1 className="text-4xl font-semibold leading-7 mt-5 text-gray-900 self-center">Atualizar Produto</h1>

            <div className="mt-12 gap-y-8 flex flex-col w-1/2">

                <div className="sm:col-span-4">
                    <span className="block text-md font-medium leading-6 text-gray-900">Nome:</span>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            name="name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full text-md px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <span className="block text-md font-medium leading-6 text-gray-900">Descrição:</span>
                    <div className="mt-2">
                        <input 
                            type="textarea" 
                            name="Description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} 
                            className="w-full text-md px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <span  className="block text-md font-medium leading-6 text-gray-900">Preço:</span>
                    <div className="mt-2">
                        <input 
                            name="price" 
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} 
                            className="w-full text-md px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <span className="block text-md font-medium leading-6 text-gray-900">Estoque:</span>
                    <div className="mt-2">
                        <input 
                            id="stock" 
                            name="stock" 
                            type="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)} 
                            className="w-full text-md px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-5 ">
            <button 
                type="button" 
                onClick={() => navigate("/all-products")}
                className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-500 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Cancelar
            </button>                         

            <button           
                type="button"   
                onClick={handleUpdateProduct} 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                {loading ? "Atualizando Produto..." : "Atualizar Produto"}
            </button>            
        </div>  

        { mensagem && (<ModalComponent closeModal={closeModal} ref={dialogRef} item={mensagem} />)}
        
    </div>

        
    );
    }

export default UpdateProduct;