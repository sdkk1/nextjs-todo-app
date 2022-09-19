import { useQueryClient, useMutation } from 'react-query'

import useStore from '@/store/store'
import { Task, CreatedTask, EditedTask } from '@/types/types'
import { supabase } from '@/utils/supabase'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    async (task: CreatedTask) => {
      const { data, error } = await supabase.from<Task>('todos').insert(task)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const prevTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (prevTodos)
          queryClient.setQueryData(['todos'], [...prevTodos, res[0]])
        resetEditedTask()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedTask()
      },
    }
  )
  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from<Task>('todos')
        .update({ title: task.title })
        .eq('id', task.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const prevTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (prevTodos) {
          queryClient.setQueryData(
            ['todos'],
            prevTodos.map((task) => (task.id === variables.id ? res[0] : task))
          )
        }
        resetEditedTask()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedTask()
      },
    }
  )
  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from<Task>('todos')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_res, variables) => {
        const prevTodos = queryClient.getQueryData<Task[]>(['todos'])
        if (prevTodos) {
          queryClient.setQueryData(
            ['todos'],
            prevTodos.filter((task) => task.id !== variables)
          )
        }
        resetEditedTask()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedTask()
      },
    }
  )

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
