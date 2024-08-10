import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log('tokeeen: ' + token);
            const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setProduct(response.data.data.product);
        } catch (err) {
            console.log(err);
            setError("Erro ao carregar dados do produto.");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleDeleteProduct = async () => {
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
        }
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <div>
            <span>Detalhes do Produto</span>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p><strong>Nome:</strong> {product.name}</p>
            <p><strong>Descrição:</strong> {product.description}</p>
            <p><strong>Preço:</strong> {product.price.toFixed(2)}</p>
            <p><strong>Estoque:</strong> {product.stock}</p>

            <button onClick={() => setShowConfirm(true)}>Excluir</button>

            {showConfirm && (
                <div>
                    <p>Você tem certeza que deseja excluir este produto?</p>
                    <button onClick={handleDeleteProduct}>Sim</button>
                    <button onClick={() => setShowConfirm(false)}>Não</button>
                </div>
            )}
        </div>
    );
}

export default DetailProduct;
