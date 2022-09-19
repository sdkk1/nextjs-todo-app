export type Task = {
  id: string
  created_at: string
  title: string
  user_id?: string
}
export type CreatedTask = Omit<Task, 'id' | 'created_at'>
export type EditedTask = Omit<Task, 'created_at' | 'user_id'>

export type Notice = {
  id: string
  created_at: string
  content: string
  user_id?: string
}
export type CreatedNotice = Omit<Notice, 'id' | 'created_at'>
export type EditedNotice = Omit<Notice, 'created_at' | 'user_id'>

export type State = {
  editedTask: EditedTask
  editedNotice: EditedNotice
  updateEditedTask: (payload: EditedTask) => void
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedTask: () => void
  resetEditedNotice: () => void
}
