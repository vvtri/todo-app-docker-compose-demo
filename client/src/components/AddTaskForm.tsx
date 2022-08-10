import { Box, Button, Center, Input, useToast, VStack } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { TASK_API } from '../services/api'
import { execute } from '../services/config'

type Props = {
	handleAddTask: (e: FormEvent) => Promise<any>
	taskName: string
	setTaskName: (value: string) => void
}

export default function AddTaskForm({
	taskName,
	setTaskName,
	handleAddTask,
}: Props) {
	return (
		<form onSubmit={handleAddTask}>
			<VStack>
				<Input
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					placeholder='Nhập task name'
				/>
				<Button mt='6' type='submit'>
					Thêm task
				</Button>
			</VStack>
		</form>
	)
}
