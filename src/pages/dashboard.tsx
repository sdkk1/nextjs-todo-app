import { NextPage } from 'next'
import { useQueryClient } from 'react-query'
import {
  LogoutIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid'

import Layout from '@/components/common/Layout'
import TaskForm from '@/components/pages/dashboard/TaskForm'
import TaskList from '@/components/pages/dashboard/TaskList'
import NoticeForm from '@/components/pages/dashboard/NoticeForm'
import NoticeList from '@/components/pages/dashboard/NoticeList'
import { supabase } from '@/utils/supabase'

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient()

  const signOut = () => {
    supabase.auth.signOut()
    queryClient.removeQueries(['todos'])
    queryClient.removeQueries(['notices'])
  }

  return (
    <Layout title='Dashboard'>
      <LogoutIcon
        className='mb-6 h-6 w-6 cursor-pointer text-blue-500'
        onClick={signOut}
      />
      <div className='grid grid-cols-2 gap-40'>
        <div>
          <div className='my-3 flex justify-center'>
            <DocumentTextIcon className=' h-8 w-8 text-blue-500' />
          </div>
          <TaskForm />
          <TaskList />
        </div>
        <div>
          <div className='my-3 flex justify-center '>
            <StatusOnlineIcon className=' h-8 w-8 text-blue-500' />
          </div>
          <NoticeForm />
          <NoticeList />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
