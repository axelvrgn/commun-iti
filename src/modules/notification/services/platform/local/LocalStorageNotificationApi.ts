import { injectable } from "inversify";
import { TypedLocalStorage } from "@/modules/infrastructure/storage";
import { NotificationApi } from "../../NotificationApi";
import type { Notification } from "@/modules/notification/models/domain";

export interface NotificationsStorageData {
  notifications: Notification[];
}

@injectable()
export class LocalStorageNotificationApi extends NotificationApi {
  static STORAGE_KEY = "iti.notifications";

  private storage = new TypedLocalStorage<NotificationsStorageData>(
    LocalStorageNotificationApi.STORAGE_KEY,
    {
      notifications: []
    }
  );

  async addNotification(notification: Notification): Promise<Notification> {
    const data = this.storage.getValue();
    const notif: Notification = {
      text: notification.text,
      type: notification.type
    };

    data.notifications.unshift(notif);
    this.storage.setValue(data);
    return notif;
  }
}
