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
      // Prevent body scroll when modal is open
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
            <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
          ),
          iconBg: "bg-blue-500/10",
          borderColor: "border-blue-500/25",
          titleColor: "text-white",
          messageColor: "text-zinc-400",
        };
      case "success":
        return {
          icon: (
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ),
          iconBg: "bg-blue-500/10",
          borderColor: "border-blue-500/25",
          titleColor: "text-white",
          messageColor: "text-zinc-400",
        };
      case "error":
        return {
          icon: (
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ),
          iconBg: "bg-red-500/10",
          borderColor: "border-red-500/30",
          titleColor: "text-red-400",
          messageColor: "text-zinc-400",
        };
      default:
        return {
          icon: null,
          iconBg: "bg-blue-500/10",
          borderColor: "border-blue-500/25",
          titleColor: "text-white",
          messageColor: "text-zinc-400",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#080b11]/90 backdrop-blur-md animate-fade-in"
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
        <div className="relative bg-[#0f1422] border border-white/15 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Content Container */}
          <div className="relative p-8">
            {/* Close Button */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                type="button"
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}

            {/* Icon Container */}
            <div
              className={`w-20 h-20 ${styles.iconBg} ${styles.borderColor} border rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner`}
            >
              {styles.icon}
            </div>

            {/* Title */}
            <h3
              id={titleId}
              className={`text-2xl font-bold text-center mb-3 tracking-tight ${styles.titleColor}`}
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
                className={`mt-6 w-full px-6 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm ${
                  type === "error"
                    ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)]"
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
