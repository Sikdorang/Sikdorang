'use client';

import CheckCircleIcon from '@public/icons/ic_checked_circle.svg';
import { ReactNode } from 'react';
import { ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contextClass: Record<string, string> = {
  success: 'bg-green-100 text-green-600 border-green-200',
  error: 'bg-red-100   text-red-600   border-red-200',
  info: 'bg-blue-100  text-blue-600  border-blue-200',
  warning: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  default: 'bg-gray-100  text-gray-800  border-gray-200',
};

const iconMap: Record<string, React.ReactNode> = {
  success: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
  error: <CheckCircleIcon className="w-6 h-6 text-red-600" />,
  info: <CheckCircleIcon className="w-6 h-6 text-blue-600" />,
  warning: <CheckCircleIcon className="w-6 h-6 text-yellow-600" />,
  default: null,
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const toastProps: ToastOptions = {
    position: 'bottom-center',
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    closeButton: false,
    autoClose: 2000,
  };

  return (
    <>
      {children}
      <ToastContainer
        {...toastProps}
        icon={({ type }: { type: string }) => iconMap[type || 'default']}
        toastClassName={({ type }) =>
          `${contextClass[type || 'default']} 
           flex items-center space-x-3 px-6 py-3 rounded-lg shadow 
           cursor-pointer my-2`.replace(/\s+/g, ' ')
        }
        className="flex-1 text-sm leading-tight"
      />
    </>
  );
}
