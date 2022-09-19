import { FC } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

import { useMutateTask } from '@/hooks/useMutateTask'
import useStore from '@/store/store'

type Props = {
  id: string
  title: string
}

const TaskItem: FC<Props> = ({ id, title }) => {
  const { updateEditedTask } = useStore()
  const { deleteTaskMutation } = useMutateTask()

  return (
    <li className='my-3 text-lg font-extrabold'>
      <span>{title}</span>
      <div className='float-right ml-20 flex'>
        <PencilAltIcon
          className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
          onClick={() => {
            updateEditedTask({
              id,
              title,
            })
          }}
        />
        <TrashIcon
          className='h-5 w-5 cursor-pointer text-blue-500'
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}

export default TaskItem
