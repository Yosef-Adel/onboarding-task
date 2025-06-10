import type { AlertColor } from "@mui/material";
import { Subject } from "rxjs";


export type INotification = {
  msg: string;
  type?: AlertColor;
  duration?: number;
}

export const NotificationSubject = new Subject<INotification>()

export const notify = (notification: INotification) => {
  NotificationSubject.next(notification)
}
