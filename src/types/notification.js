// @flow
export type NotificationT = {
  id: string,
  title: string,
  message: string,
  type: 'danger' | 'warning' | 'success' | 'info',
  createdAt: string,
}
