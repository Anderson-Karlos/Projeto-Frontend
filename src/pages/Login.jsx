import React from "react"

function Login() {
    const [usuario, setUsuario] = useState(null)
    const [senha, setSenha] = useState(null)

    return (
        <div>
            <h1>Tela de Login:</h1>

            <h2>CPF/CNPJ:</h2>
            <input type="text" value={usuario} onChange={(e) => {
                setUsuario(e.target.value)
            }} />

            <h2>Senha:</h2>
            <input type="text" value={senha} onChange={(e) => {
                setSenha(e.target.value)
            }} />

            <input type="button" value="Entrar" />
            <input type="button" value="Criar Conta" />
        </div>
    )
}

export default Login;