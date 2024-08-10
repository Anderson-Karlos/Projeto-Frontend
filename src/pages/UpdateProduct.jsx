import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
    const { id } = useParams();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const product = response.data.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
            } catch(err) {
                setError("Erro ao carregar dados do produto.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdateProduct = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            //vericar
            const response = await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/{id}`, {
                name,
                description,
                price:parseFloat(price)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            navigate("/api/products/get-all-products");
        } else {
            setError("Erro ao atualizar produto. Por favor, tente novamente.");
        }
        } catch(err) {
            setError("Erro na requisição. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                value={name}
                onChange={(e) => setDescription(e.target.value)}
            />

            <h2>Preço:</h2>
            <input 
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={handleUpdateProduct} disabled={loading}>
                {loading ? "Atualizando Produto..." : "Atualizar Produto"}
            </button>

            <button onClick={navigate("/api/products/get-all-products")}>Cancelar</button>
        </div>
    );
    }

export default UpdateProduct;