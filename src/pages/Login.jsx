import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [usuario, setUsuario] = useState(null);
    const [senha, setSenha] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

    try {
        const response = await axios.post("https://interview.t-alpha.com.br/api/auth/login", {
            usuario,
            senha
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/products");
        } else {
            setError("Falha na autenticação, verifique suas credenciais.");
        }
    } catch(err) {
        setError("Erro na requisição, tente novamente mais tarde.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div>
            <h1>Tela de Login:</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>CPF/CNPJ:</h2>
            <input 
                type="text" 
                value={usuario} 
                onChange={(e) => { setUsuario(e.target.value)}} 
            />

            <h2>Senha:</h2>
            <input 
                type="password" 
                value={senha}
                onChange={(e) => { setSenha(e.target.value)}}
            />
            <button onClick={handleLogin} disable={loading}>
                {loading ? "Carregando..." : "Entrar"}
            </button>

            <button onClick={() => navigate("/signup")}>Criar Conta</button>
        </div>
    );
}

export default Login;