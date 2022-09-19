import { useQueryClient, useMutation } from 'react-query'

import useStore from '@/store/store'
import { Notice, CreatedNotice, EditedNotice } from '@/types/types'
import { supabase } from '@/utils/supabase'

export const useMutateNotice = () => {
  const queryClient = useQueryClient()
  const resetEditedNotice = useStore((state) => state.resetEditedNotice)

  const createNoticeMutation = useMutation(
    async (notice: CreatedNotice) => {
      const { data, error } = await supabase
        .from<Notice>('notices')
        .insert(notice)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const prevNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (prevNotices) {
          queryClient.setQueryData(['notices'], [...prevNotices, res[0]])
        }
        resetEditedNotice()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNotice()
      },
    }
  )
  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from<Notice>('notices')
        .update({ content: notice.content })
        .eq('id', notice.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const prevNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (prevNotices) {
          queryClient.setQueryData(
            ['notices'],
            prevNotices.map((notice) =>
              notice.id === variables.id ? res[0] : notice
            )
          )
        }
        resetEditedNotice()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNotice()
      },
    }
  )
  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from<Notice>('notices')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_res, variables) => {
        const prevNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (prevNotices) {
          queryClient.setQueryData(
            ['notices'],
            prevNotices.filter((notice) => notice.id !== variables)
          )
        }
        resetEditedNotice()
      },
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNotice()
      },
    }
  )

  return {
    createNoticeMutation,
    updateNoticeMutation,
    deleteNoticeMutation,
  }
}
