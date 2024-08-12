import axios from "axios";

const URL_BASE = 'https://interview.t-alpha.com.br/api';

 export async function login({taxNumber, password}) {
    let erro = '';

    try {
        
        if (!taxNumber) 
            erro = 'Usuário inválido'
        else if (!password) 
            erro = 'Senha inválida'

        if (erro)
            throw new Error(erro);

        const response = await axios.post(URL_BASE + "/auth/login", {taxNumber, password});
    
        if (response.data?.data?.token) {
            localStorage.setItem("token", response.data.data.token);            
        } else {
            throw new Error("Falha na autenticação, verifique suas credenciais.")
        }

        return response;  
    } catch(err) {        
        console.log(err);        
        throw new Error('Erro ao realizar login: ' + err)        
    } 
};

export async function createUser(dados) {
    let erro = '';

    const dados_usuario = {
        name: dados.name,
        taxNumber: dados.taxNumber,
        mail: dados.mail,
        phone: dados.phone,
        password: dados.password
    }
    console.log("dados: " + JSON.stringify(dados))
    try {        
         if (!dados.name)
             erro = 'Nome invalido'
         else if (!dados.taxNumber) 
             erro = 'Usuário inválido'
         else if (!dados.mail)
             erro = 'E-mail inválido'
         else if (!dados.phone)
            erro = 'Telefone inválido'
         else if (!dados.password) 
             erro = 'Senha inválida'
        
        if (erro)
            throw new Error(erro);

        const response = await axios.post(URL_BASE + "/auth/register", dados);
        console.log(response);

        if (response?.status == 201)
            return response;
        
    } catch(err) {        
        console.log(err);        
        throw new Error('Erro ao criar usuário: ' + err)        
    }
}
