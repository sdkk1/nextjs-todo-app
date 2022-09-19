import { useQuery } from 'react-query'

import { Notice } from '@/types/types'
import { supabase } from '@/utils/supabase'

export const useQueryNotices = () => {
  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from<Notice>('notices')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }

    return data
  }

  return useQuery<Notice[], Error>({
    queryKey: ['notices'],
    queryFn: fetchNotices,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
