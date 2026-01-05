import { createContext, useContext } from 'react';
import { toast as sonnerToast } from 'sonner';


const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const success = (message) => {
    sonnerToast.success(message);
  };

  const error = (message) => {
    sonnerToast.error(message);
  };

  const info = (message) => {
    sonnerToast.info(message);
  };

  const warning = (message) => {
    sonnerToast.warning(message);
  };

  const promise = (
    promiseFunction,
    messages
  ) => {
    return sonnerToast.promise(promiseFunction, messages);
  };

  // Custom confirm dialog using toast with action buttons
  const confirm = (
    message,
    onConfirm,
    onCancel
  ) => {
    sonnerToast(message, {
      action: {
        label: 'Confirm',
        onClick: () => {
          onConfirm();
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          if (onCancel) onCancel();
        },
      },
      duration: 10000, // 10 seconds to give user time to decide
    });
  };

  const value = {
    success,
    error,
    info,
    warning,
    promise,
    confirm,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};