import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState(null);
    const [taxNumber, setTaxNumber] = useState(null);
    const [mail, setMail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true)
        setError(null);


        const dados = {
            name: name,
            taxNumber: taxNumber,
            mail: mail,
            phone: phone,
            password: password
        }

        console.log(dados)

        try {
            const response = await axios.post("https://interview.t-alpha.com.br/api/auth/register", dados,
        
        );

            if (response.status === 201) {
                navigate("/");
            } else {
                setError("Erro ao criar conta. Por favor, tente novamente.");
            }

        } catch(err) {
            console.log(err)
            setError("Erro na requisição, Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Tela de Registro</h1>
            {error && <p style = {{ color: "red" }}>{error}</p>}

            <h2>Digite seu nome:</h2>
            <input 
                type="text"
                value = {name}
                onChange = {(e) => {setName(e.target.value)}}
            />
            
            <h2>Digite seu CPF / CNPJ:</h2>
            <input 
                type="text"
                value = {taxNumber}
                onChange = {(e) => {setTaxNumber(e.target.value)}}
            />

            <h2>Digite seu e-mail:</h2>
            <input 
                type = "text"
                value = { mail }
                onChange = {(e) => { setMail(e.target.value)}}    
            />

            <h2>Digite seu telefone:</h2>
            <input 
                type="text"
                value={phone}
                onChange={ (e) => {setPhone(e.target.value)}}
            />

            <h2>Digite sua senha:</h2>
            <input 
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />

            <button onClick={handleSignup} disabled={loading}>
                {loading ? "Criando Conta..." : "Criar conta"}
            </button>

            <button onClick={() => navigate("/api/auth/login")}>
                Já tenho conta
            </button>
        </div>
    );
}
export default Signup;