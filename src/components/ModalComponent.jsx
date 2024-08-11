import React, { forwardRef } from 'react';
import { useNavigate } from "react-router-dom";

const ModalComponent = forwardRef(({ closeModal, item }, ref) => {

  const navigate = useNavigate();


  const handle = () => {
    closeModal();
    navigate(item.rota);    
  }


  console.log('Executando Modal')
  return (
      <dialog ref={ref} className="rounded-md w-1/2">
      <div className="flex items-end justify-center ">
        <div className="inline-block w-full  bg-white rounded-lg text-left transform transition-all">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.titulo}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {item.mensagem}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handle}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default ModalComponent;
