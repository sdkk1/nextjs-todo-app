import { FC, FormEvent } from 'react'

import { useMutateTask } from '@/hooks/useMutateTask'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

const TaskForm: FC = () => {
  const { editedTask, updateEditedTask } = useStore()
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedTask.id) {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      })
    } else {
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
        placeholder='New task ?'
        value={editedTask.title}
        onChange={(e) =>
          updateEditedTask({ ...editedTask, title: e.target.value })
        }
      />
      <button
        type='submit'
        className='ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 '
      >
        {editedTask.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}

export default TaskForm
