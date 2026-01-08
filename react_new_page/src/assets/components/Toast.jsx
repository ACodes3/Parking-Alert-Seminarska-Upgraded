import { useEffect, useRef } from "react";
import "../styles/additional-styles/toast.css";

/**
 * Toast component
 *
 * Props:
 * - message: string – content to display
 * - open: boolean – controls visibility
 * - type: "success" | "error" | "info" | "warning" (default: "info")
 * - duration: number – auto-dismiss in ms; set 0 to disable (default: 3000)
 * - position: "top-right" | "top-left" | "bottom-right" | "bottom-left" (default: "top-right")
 * - onClose: () => void – called when toast closes
 * - actions: Array<{ label: string, onClick: () => void }> – optional action buttons
 */
const Toast = ({
  message,
  open = false,
  type = "info",
  duration = 3000,
  position = "top-right",
  onClose,
  actions = [],
}) => {
  const timerRef = useRef(null);

  // Auto-dismiss logic
  useEffect(() => {
    if (!open) return;
    if (duration > 0 && typeof onClose === "function") {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, duration, onClose]);

  // Close on Escape for accessibility
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const typeClassMap = {
    success: "toast--success",
    error: "toast--error",
    info: "toast--info",
    warning: "toast--warning",
  };

  const ariaLive = type === "error" || type === "warning" ? "assertive" : "polite";

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const restartTimer = () => {
    if (duration > 0 && typeof onClose === "function") {
      stopTimer();
      timerRef.current = setTimeout(onClose, duration);
    }
  };

  return (
    <div className={`toast-container ${position}`} aria-live={ariaLive} aria-atomic="true">
      <div
        className={`toast ${typeClassMap[type] || typeClassMap.info}`}
        role={type === "error" || type === "warning" ? "alert" : "status"}
        onMouseEnter={stopTimer}
        onMouseLeave={restartTimer}
      >
        <div className="toast__content">{message}</div>
        {actions?.length > 0 && (
          <div className="toast__actions">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className="toast__action-btn"
                type="button"
                onClick={() => {
                  stopTimer();
                  action.onClick?.();
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        {typeof onClose === "function" && (
          <button
            className="toast__close"
            type="button"
            aria-label="Close notification"
            onClick={() => {
              stopTimer();
              onClose();
            }}
          >
            ×
          </button>
        )}
      </div>
      {/* Minimal fallback styling if CSS is empty */}
      <style>{`
        .toast-container { position: fixed; z-index: 1000000; padding: 12px; pointer-events: none; }
        .toast-container.top-right { top: 12px; right: 12px; }
        .toast-container.top-left { top: 12px; left: 12px; }
        .toast-container.bottom-right { bottom: 12px; right: 12px; }
        .toast-container.bottom-left { bottom: 12px; left: 12px; }

        .toast { display: flex; align-items: center; gap: 10px; min-width: 260px; max-width: 420px; padding: 12px 14px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); color: #0f172a; background: #ffffff; pointer-events: auto; }
        .toast--success { border-left: 4px solid #22c55e; }
        .toast--error { border-left: 4px solid #ef4444; }
        .toast--info { border-left: 4px solid #3b82f6; }
        .toast--warning { border-left: 4px solid #f59e0b; }
        .toast__content { flex: 1; }
        .toast__actions { display: flex; gap: 6px; }
        .toast__action-btn { background: transparent; border: 1px solid #cbd5e1; color: #0f172a; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
        .toast__action-btn:hover { background: #f1f5f9; }
        .toast__close { background: transparent; border: none; color: #334155; font-size: 18px; line-height: 1; cursor: pointer; }
        .toast__close:hover { color: #0f172a; }
      `}</style>
    </div>
  );
};

export default Toast;