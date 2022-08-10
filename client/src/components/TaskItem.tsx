import {
	Editable,
	EditablePreview,
	Input,
	EditableInput,
	useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Task } from '../interface'
import { TASK_API } from '../services/api'
import { execute } from '../services/config'
import TaskEditable from './TaskEditable'

type Props = {
	task: Task
}

const TaskItem = ({ task }: Props) => {
	const [taskInput, setTaskInput] = useState(task.name)
	const toast = useToast()

	const handleSubmit = async (value: string) => {
		try {
			const { data } = await execute.patch(`${TASK_API}/${task.id}`, {
				name: value,
			})
		} catch (error) {
			setTaskInput(task.name)
			toast({
				status: 'error',
				title: `Update task thất bại`,
				variant: 'subtle',
			})
		}
	}

	const handleCancel = () => {
		setTaskInput(task.name)
	}

	return (
		<Editable
			value={taskInput}
			onChange={setTaskInput}
			key={task.id}
			isPreviewFocusable={false}
			fontSize='2xl'
			display='flex'
			onCancel={handleCancel}
			onSubmit={handleSubmit}
		>
			<EditablePreview />
			<Input as={EditableInput} />
			<TaskEditable />
		</Editable>
	)
}

export default TaskItem
