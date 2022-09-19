import { FC, FormEvent } from 'react'

import { useMutateNotice } from '@/hooks/useMutateNotice'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

const NoticeForm: FC = () => {
  const { editedNotice, updateEditedNotice } = useStore()
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedNotice.id) {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    } else {
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: supabase.auth.user()?.id,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='my-2 rounded border border-gray-300 px-3  py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
        placeholder='New notice ?'
        value={editedNotice.content}
        onChange={(e) =>
          updateEditedNotice({ ...editedNotice, content: e.target.value })
        }
      />
      <button
        type='submit'
        className='ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 '
      >
        {editedNotice.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}

export default NoticeForm
