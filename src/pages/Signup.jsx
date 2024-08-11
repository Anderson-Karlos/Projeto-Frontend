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
        /*
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
        */

        <form>
                <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h1 class="text-base font-semibold leading-7 text-gray-900">Cadastrar Usuário</h1>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div class="sm:col-span-4">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
          <div class="mt-2">
            <input 
                type="text" 
                name="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                class=//"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                "w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="Description" class="block text-sm font-medium leading-6 text-gray-900">CPF / CNPJ:</label>
          <div class="mt-2">
            <input 
                type="text"
                value = {taxNumber}
                onChange = {(e) => {setTaxNumber(e.target.value)}} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">E-mail:</label>
          <div class="mt-2">
            <input 
                type = "text"
                value = { mail }
                onChange = {(e) => { setMail(e.target.value)}} 
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Telefone:</label>
          <div class="mt-2">
            <input 
                type="text"
                value={phone}
                onChange={ (e) => {setPhone(e.target.value)}}
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Senha:</label>
          <div class="mt-2">
            <input 
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button 
        type="button" 
        onClick={() => navigate("/")}
        class="text-sm font-semibold leading-6 text-gray-900">
            Cancelar
    </button>

    <button 
        type="submit"
        onClick={handleSignup} 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        {loading ? "Cadastrando..." : "Cadastrar Usuário"}
    </button>
  </div>
</form>
    );
}
export default Signup;