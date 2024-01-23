import { type Notification } from "../domain/Notification";

export interface NotificationState {
  currentRoomNotifications: Notification[];
}
