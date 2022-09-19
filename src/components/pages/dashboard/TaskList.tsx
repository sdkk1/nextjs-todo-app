import { FC } from 'react'

import Spinner from '@/components/common/Spinner'
import TaskListItem from '@/components/pages/dashboard/TaskListItem'
import { useQueryTasks } from '@/hooks/useQueryTasks'

const TaskList: FC = () => {
  const { data: tasks, status, error } = useQueryTasks()

  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{error.message}</p>
  return (
    <ul className='my-2'>
      {tasks?.map((task) => (
        <TaskListItem
          key={task.id}
          id={task.id}
          title={task.title}
        />
      ))}
    </ul>
  )
}

export default TaskList
