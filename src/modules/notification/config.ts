import { Container } from "inversify";
import { NotificationStore } from "./store";
import { NotificationApi, NotificationService } from "./services";
import { LocalStorageNotificationApi } from "./services/platform/local/LocalStorageNotificationApi";

export function configureNotificationContainer(container: Container) {
  container.bind(NotificationService).toSelf();
  container.bind(NotificationStore).toSelf().inSingletonScope();
  container.bind(NotificationApi).to(LocalStorageNotificationApi);
}
