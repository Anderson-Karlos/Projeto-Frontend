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
    );
    }

export default UpdateProduct;