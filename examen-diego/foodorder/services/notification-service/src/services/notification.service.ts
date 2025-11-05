export class NotificationService {
  async notify(event: string, data: any) {
    console.log(`[Notification] Event: ${event}`, data);
    return { delivered: true };
  }
}
