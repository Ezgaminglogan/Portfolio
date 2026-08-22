"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "loading" | "success" | "error";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type,
}: ModalProps) {
  const titleId = "modal-title";
  const messageId = "modal-message";
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case "loading":
        return {
          icon: (
            <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          ),
          iconBg: "bg-blue-50",
          borderColor: "border-blue-100",
          titleColor: "text-slate-900",
          messageColor: "text-slate-600",
        };
      case "success":
        return {
          icon: (
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ),
          iconBg: "bg-blue-50",
          borderColor: "border-blue-100",
          titleColor: "text-slate-900",
          messageColor: "text-slate-600",
        };
      case "error":
        return {
          icon: (
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ),
          iconBg: "bg-red-50",
          borderColor: "border-red-100",
          titleColor: "text-red-700",
          messageColor: "text-slate-600",
        };
      default:
        return {
          icon: null,
          iconBg: "bg-blue-50",
          borderColor: "border-blue-100",
          titleColor: "text-slate-900",
          messageColor: "text-slate-600",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="relative w-full max-w-md transform transition-all duration-300 scale-100 animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
      >
        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Content Container */}
          <div className="relative p-8">
            {/* Close Button */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                type="button"
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}

            {/* Icon Container */}
            <div
              className={`w-16 h-16 ${styles.iconBg} ${styles.borderColor} border rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs`}
            >
              {styles.icon}
            </div>

            {/* Title */}
            <h3
              id={titleId}
              className={`text-2xl font-bold text-center mb-2 tracking-tight ${styles.titleColor}`}
            >
              {title}
            </h3>

            {/* Message */}
            <p
              id={messageId}
              className={`text-center ${styles.messageColor} text-sm leading-relaxed`}
            >
              {message}
            </p>

            {/* Action Button for non-loading states */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                type="button"
                className={`mt-6 w-full px-6 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-98 text-sm cursor-pointer ${
                  type === "error"
                    ? "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
                    : "bg-blue-600 text-white shadow-[0_6px_20px_rgba(37,99,235,0.25)] hover:bg-blue-700"
                }`}
              >
                {type === "error" ? "Try Again" : "Got it"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
