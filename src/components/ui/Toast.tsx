"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ToastTone = "success" | "error";

export type ToastMessage = {
  id: number;
  tone: ToastTone;
  message: string;
  title?: string;
};

type ToastViewportProps = {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
};

const toneClasses = {
  success:
    "border-teal-700/20 bg-teal-50 text-teal-950 shadow-teal-950/10 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-50",
  error:
    "border-sky-800/25 bg-sky-50 text-sky-950 shadow-sky-950/10 dark:border-sky-300/25 dark:bg-sky-400/10 dark:text-sky-50",
};

const toneLabels = {
  success: "Success",
  error: "Notice",
};

export function useToastNotifications() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timersRef = useRef<number[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);

      setToasts((currentToasts) => [...currentToasts.slice(-2), { ...toast, id }]);

      const timer = window.setTimeout(() => dismissToast(id), 5200);
      timersRef.current.push(timer);
    },
    [dismissToast],
  );

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string, title?: string) =>
      showToast({ tone: "success", title, message }),
    [showToast],
  );

  const showError = useCallback(
    (message: string, title?: string) =>
      showToast({ tone: "error", title, message }),
    [showToast],
  );

  return {
    toasts,
    dismissToast,
    showSuccess,
    showError,
  };
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-24 z-[80] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 sm:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`rounded-lg border p-4 shadow-lg backdrop-blur ${toneClasses[toast.tone]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold">{toast.title ?? toneLabels[toast.tone]}</p>
              <p className="mt-1 text-sm leading-6">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded-md px-2 text-lg leading-none opacity-70 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              aria-label="Dismiss notification"
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
