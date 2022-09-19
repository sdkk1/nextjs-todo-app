import { FC } from 'react'

import Spinner from '@/components/common/Spinner'
import NoticeListItem from '@/components/pages/dashboard/NoticeListItem'
import { useQueryNotices } from '@/hooks/useQueryNotices'

const NoticeList: FC = () => {
  const { data: notices, status, error } = useQueryNotices()

  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{error.message}</p>
  return (
    <ul className='my-2'>
      {notices?.map((notice) => (
        <NoticeListItem
          key={notice.id}
          id={notice.id}
          content={notice.content}
          user_id={notice.user_id}
        />
      ))}
    </ul>
  )
}

export default NoticeList
