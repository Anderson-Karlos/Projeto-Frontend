import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleCreateProduct = async () =>{
        setLoading(true);
        setError(null);


        const dados = {
            name: name,
            description: description,
            price: price,
            stock: stock
        } // {name, description, price, stock};

        console.log(dados)

        try {

            const token = localStorage.getItem("token");  
            const response = await axios.post("https://interview.t-alpha.com.br/api/products/create-product", dados, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },                   

            });

            console.log(response)

            if (response.status === 201) {
                navigate("/all-products");
            } else {
                setError("Erro ao criar produto. Por favor, tente novamente.")
            }

        } catch(err){
            console.log(err)
            setError("Erro na requisição. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <span>Criar Produto</span>

            <h2>Nome:</h2>
            <input 
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
            />

            <h2>Descrição:</h2>
            <input 
                type="text"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
            />

            <h2>Preço:</h2>
            <input 
                type="text"
                value={price}
                onChange={(e) => {setPrice(Number(e.target.value))}}
            />

            <h2>Estoque:</h2>
            <input
                type="text"
                value={stock}
                onChange={(e) => {setStock(Number(e.target.value))}}
            />

            <button onClick={handleCreateProduct} >{loading ? "Criando Produto..." : "Salvar"}</button>
            <button onClick={() => navigate("/all-products")}>Cancelar</button>
        </div>
    )
}

export default CreateProduct;