import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../service/userService';

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
    setLoading(true);
    setError(null);

    const dados = {
      name,
      taxNumber,
      mail,
      phone,
      password,
    };

    try {
      const response = await createUser(dados);

      if (response.status === 201) {
        navigate('/');
      } else {
        throw new Error(
          'Status da resposta diferente do esperado: ' + response.status
        );
      }
    } catch (err) {
      console.log(err);
      setError('Erro na requisição, Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col px-10 py-5">
        <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center w-full">
          <h1 className="text-4xl font-semibold leading-7 mt-5 text-gray-900 self-center">
            Cadastrar Usuário
          </h1>

          <div className="mt-12 gap-y-8 flex flex-col w-1/2">
            <div className="sm:col-span-4">
              <label
                for="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" //"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="Description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF / CNPJ:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={taxNumber}
                  onChange={(e) => {
                    setTaxNumber(e.target.value);
                  }}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                E-mail:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha:
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6 px-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancelar
        </button>

        <button
          type="submit"
          onClick={handleSignup}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </div>
    </div>
  );
}
export default Signup;
