import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ message }) {
  
  const notify = () => {
    toast.success(message);
  };

  useEffect(() => {
    notify();
  }, [message]);

  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Toast;
