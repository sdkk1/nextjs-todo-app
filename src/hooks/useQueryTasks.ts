import { useQuery } from 'react-query'

import { Task } from '@/types/types'
import { supabase } from '@/utils/supabase'

export const useQueryTasks = () => {
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from<Task>('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }

    return data
  }

  return useQuery<Task[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTasks,
    staleTime: Infinity,
  })
}
