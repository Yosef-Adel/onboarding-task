import { useEffect, useState } from "react"
import { INotification, NotificationSubject } from "./notificationSubject"
import { Notification } from "./Notification"
import { v4 as uuidv4 } from "uuid"

interface NotificationWithId extends INotification {
  id: string
}

export const NotificationProvider = () => {
  const [notifications, setNotifications] = useState<NotificationWithId[]>([])

  useEffect(() => {
    const sub = NotificationSubject.subscribe((not) => {
      const notWithId = { ...not, id: uuidv4() }
      setNotifications((prev) => [...prev, notWithId])
    })
    return () => sub.unsubscribe()
  }, [])

  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          open={true}
          message={notification.msg}
          type={notification.type}
          duration={notification.duration}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </>
  )
}
