import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/Layout'
import { Task, Notice } from '@/types/types'
import { supabase } from '@/utils/supabase'

type Props = {
  tasks: Task[]
  notices: Notice[]
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/isr invoked')

  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })

  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return {
    props: { tasks, notices },
    revalidate: 5,
  }
}

const Isr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter()

  return (
    <Layout title='ISR'>
      <p className='mb-3 text-blue-500'>ISR</p>
      <ul className='mb-3'>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className='text-lg font-extrabold'>{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className='mb-3'>
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className='text-lg font-extrabold'>{notice.content}</p>
            </li>
          )
        })}
      </ul>
      <Link
        href='/ssr'
        prefetch={false}
      >
        <a className='my-3 text-xs'> Link to ssr</a>
      </Link>
      <button
        className='mb-3 text-xs'
        onClick={() => router.push('/ssr')}
      >
        Route to ssr
      </button>
    </Layout>
  )
}

export default Isr
