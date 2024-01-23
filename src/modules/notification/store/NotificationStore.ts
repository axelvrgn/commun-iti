import { injectable, inject } from "inversify";
import { StateProvider } from "@/modules/infrastructure/store/StateProvider";
import { Store } from "@/modules/infrastructure/store/Store";
import type { NotificationState } from "../models/state/NotificationState";
import type { Notification } from "../models/domain/Notification";

@injectable()
export class NotificationStore extends Store<NotificationState> {
  constructor(@inject(StateProvider) stateProvider: StateProvider) {
    super(() =>
      stateProvider.new({
        currentRoomNotifications: []
      })
    );
  }

  prependNotification(notification: Notification) {
    this._state.mutate((s) => {
      s.currentRoomNotifications.unshift(notification);

      return s;
    });
  }

  appendNotification(notifications: Notification[]) {
    this._state.mutate((s) => {
      s.currentRoomNotifications.push(...notifications);

      return s;
    });
  }

  setNotifications(notifications: Notification[]) {
    this._state.mutate((s) => {
      s.currentRoomNotifications = [...notifications];

      return s;
    });
  }
}
