import * as React from "react";
import { MessageType } from "./Message";

interface Props {
  id: string;
  title: React.ReactNode | string;
  onClose: () => void;
  type?: MessageType;
}

const Alert = ({ id, title, onClose, type }: Props) => {
  return (
    <div id={id} className="Toaster__alert">
      {typeof title === "string" ? (
        <div className={`Toaster__alert_text ${type === 'error' ? 'danger' : type}`}>{title}</div>
      ) : (
        title
      )}

      {onClose && <Close onClose={onClose} />}
    </div>
  );
};

const Close = ({ onClose }: { onClose: () => void }) => (
  <button
    className="Toaster__alert_close"
    type="button"
    aria-label="Close"
    onClick={onClose}
  >
    <span aria-hidden="true">×</span>
  </button>
);

export default Alert;