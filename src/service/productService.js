import axios from "axios";
import { URL_BASE, HTTP_STATUS } from "../utils/constantes";


export async function createProduct({name, description, price, stock}) {
    let erro = '';    

    try{
        if (!name)
            erro = 'Nome inválido.'
        else if (!description)
            erro = 'Descrição inválida.'
        else if (!price)
            erro = 'Preço inválido'
        else if (!stock)
            erro = 'Estoque inválido'
        
        if (erro)
            throw new Error(erro);

        const token = localStorage.getItem("token");
        const response = await axios.post(URL_BASE + "/products/create-product",
            {
                name,
                description,
                price,
                stock},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':  'application/json'
                },
            });

            console.log("Response: " + JSON.stringify(response))       

            return response;

        } catch(err) {
            console.log(err);
            throw new Error('Erro ao criar produto: ' + err);
        }
}

export async function getAllProducts() {
    const token = localStorage.getItem("token");           

    const response = await axios.get(URL_BASE + "/products/get-all-products", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    console.log(response)

    if (response.status !== HTTP_STATUS.OK)
        throw new Error('Erro 1')

    return response.data?.data?.products;

}

export async function getProductsById(id) {    
        const token = localStorage.getItem("token");
    
        const response = await axios.get(URL_BASE + `/products/get-one-product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        
        console.log(response)

        if (response.status !== HTTP_STATUS.OK)
            throw new Error('Erro')
     
        return response.data?.data?.product;
}

export async function updateProduct(id, product) {  
    console.log('id : '+ id)  
    console.log(product)  
    const token = localStorage.getItem("token");        

    const response = await axios.patch(URL_BASE + `/products/update-product/${id}`, product,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );    

    if (response.status !== HTTP_STATUS.NO_CONTENT) {
        console.log(response)
        throw new Error ('Erro ao atualizar produto. Por favor, tente novamente.')
    }
                    
    return true;
}

export async function deleteProduct(idProduto) {
    
    const token = localStorage.getItem("token");    
    const response = await axios.delete(URL_BASE `/products/delete-product/${idProduto}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status !== HTTP_STATUS.OK)
        throw new Error('Status não retornou ok: ' + response.status)

    return true

}
