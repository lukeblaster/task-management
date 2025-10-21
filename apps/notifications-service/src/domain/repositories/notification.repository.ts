import { NotificationEntity } from '../entities/notification.entity';

export abstract class NotificationRepository {
  abstract create(Notification: NotificationEntity): Promise<void>;
  // abstract delete(id: string): Promise<void>;
}
