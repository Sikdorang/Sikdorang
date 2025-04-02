'use client';

import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: 'bg-blue-100 text-blue-500 border-blue-200',
  error: 'bg-red-100 text-red-500 border-red-200',
  info: 'bg-purple-100 text-purple-500 border-purple-200',
  warning: 'bg-yellow-50 text-yellow-500 border-yellow-200',
  default: 'bg-white text-gray-800 border-gray-200',
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        pauseOnHover
        closeOnClick
        closeButton={false}
        icon={() => null}
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] +
          ' ' +
          'text-body-sm px-4 py-2 rounded-full border shadow-xs cursor-pointer my-1'
        }
      />
    </>
  );
}
