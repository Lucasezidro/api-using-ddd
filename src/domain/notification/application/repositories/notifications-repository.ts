import { Notification } from '../../enterprise/entities/notifications'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
}
