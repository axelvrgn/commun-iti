import { injectable, inject } from "inversify";
import { NotificationStore } from "../store";
import type { Notification } from "../models/domain/Notification";
import { NotificationApi } from "./NotificationApi";

@injectable()
export class NotificationService {
  @inject(NotificationApi) private readonly api!: NotificationApi;
  @inject(NotificationStore) private readonly store!: NotificationStore;

  async addNotification(newNotif: Notification) {
    this.store.prependNotification(newNotif);
  }
}
