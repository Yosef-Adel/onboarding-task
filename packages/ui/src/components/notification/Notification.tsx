import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

export interface NotificationProps {
  message: string;
  type?: AlertColor;
  onClose?: () => void;
  duration?: number; // in ms
  open: boolean;
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Notification = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  open,
}: NotificationProps) => {
  useEffect(() => {
    if (!open) return;
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  return (
    <Snackbar open={open} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );

}
