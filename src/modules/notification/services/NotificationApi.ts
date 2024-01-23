import { injectable } from "inversify";
import type { Notification } from "../models/domain";

@injectable()
export abstract class NotificationApi {
  abstract addNotification(notification: Notification): Promise<Notification>;
}
