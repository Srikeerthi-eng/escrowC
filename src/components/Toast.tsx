import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export type ToastData = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastProps = {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
};

const iconMap = {
  success: <CheckCircle2 size={18} className="text-success-600" />,
  error: <XCircle size={18} className="text-error-600" />,
  info: <Info size={18} className="text-primary-600" />,
};

const borderMap = {
  success: 'border-success-200',
  error: 'border-error-200',
  info: 'border-primary-200',
};

function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] space-y-3">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border ${borderMap[toast.type]} min-w-[280px] max-w-[400px]`}>
      {iconMap[toast.type]}
      <span className="text-sm text-neutral-700 flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-neutral-400 hover:text-neutral-600">
        <X size={16} />
      </button>
    </div>
  );
}

export default ToastContainer;

export function useToast() {
  let _toasts: ToastData[] = [];
  const listeners: ((toasts: ToastData[]) => void)[] = [];

  function notify(list: ToastData[]) {
    _toasts = list;
    listeners.forEach((l) => l(list));
  }

  return {
    subscribe(listener: (toasts: ToastData[]) => void) {
      listeners.push(listener);
      return () => { listeners.splice(listeners.indexOf(listener), 1); };
    },
    getToasts() { return _toasts; },
    show(message: string, type: ToastType = 'success') {
      const id = Math.random().toString(36).substring(2, 9);
      notify([..._toasts, { id, message, type }]);
    },
    dismiss(id: string) {
      notify(_toasts.filter((t) => t.id !== id));
    },
  };
}

export function useToastState() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const show = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  return { toasts, show, dismiss };
}

import { useState } from 'react';
