import { FC, useEffect, useState } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

import { useMutateNotice } from '@/hooks/useMutateNotice'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

type Props = {
  id: string
  content: string
  user_id?: string
}

const NoticeListItem: FC<Props> = ({ id, content, user_id }) => {
  const { updateEditedNotice } = useStore()
  const { deleteNoticeMutation } = useMutateNotice()

  const userId = supabase.auth.user()?.id

  return (
    <li className='my-3 text-lg font-extrabold'>
      <span>{content}</span>
      {userId === user_id && (
        <div className='float-right ml-20 flex'>
          <PencilAltIcon
            className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              updateEditedNotice({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className='h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              deleteNoticeMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}

export default NoticeListItem
