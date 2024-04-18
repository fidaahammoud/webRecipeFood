import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ message, type }) {
  
  const notify = () => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (message) {
      notify();
    }
  }, [message, type]);

  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Toast;
