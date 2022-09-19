import create from 'zustand'

import { State } from '@/types/types'

const useStore = create<State>((set) => ({
  editedTask: { id: '', title: '' },
  editedNotice: { id: '', content: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      },
    }),
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedTask: () => set({ editedTask: { id: '', title: '' } }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
}))

export default useStore
