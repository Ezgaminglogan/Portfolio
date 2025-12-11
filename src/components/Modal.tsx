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
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          ),
          iconBg: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          titleColor: "text-emerald-400",
          messageColor: "text-gray-300",
        };
      case "success":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-emerald-400"
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
          iconBg: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          titleColor: "text-emerald-400",
          messageColor: "text-gray-300",
        };
      case "error":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-red-400"
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
          messageColor: "text-gray-300",
        };
      default:
        return {
          icon: null,
          iconBg: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          titleColor: "text-emerald-400",
          messageColor: "text-gray-300",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Gradient Border Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              type === "error"
                ? "from-red-500/20 to-orange-500/10"
                : "from-emerald-500/20 to-teal-500/10"
            } opacity-50`}
          ></div>

          {/* Content Container */}
          <div className="relative p-8">
            {/* Close Button */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}

            {/* Icon Container */}
            <div
              className={`w-24 h-24 ${styles.iconBg} ${styles.borderColor} border-2 rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {styles.icon}
            </div>

            {/* Title */}
            <h3
              className={`text-2xl font-bold text-center mb-3 ${styles.titleColor}`}
            >
              {title}
            </h3>

            {/* Message */}
            <p className={`text-center ${styles.messageColor} leading-relaxed`}>
              {message}
            </p>

            {/* Action Button for non-loading states */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                className={`mt-6 w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  type === "error"
                    ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
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
