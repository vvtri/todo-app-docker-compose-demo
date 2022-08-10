import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Highlight,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AddTaskForm from './components/AddTaskForm'
import TaskItem from './components/TaskItem'
import { Task } from './interface'
import { TASK_API } from './services/api'
import { execute } from './services/config'

export const App = () => {
	const [taskName, setTaskName] = useState('')
	const toast = useToast()
	const [isOpenFormAddTask, setIsOpenFormAddTask] = useState(false)
	const [tasks, setTasks] = useState<Task[]>([])

	const handleAddTask = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const { data } = await execute.post(TASK_API, { name: taskName })
			toast({
				title: `Thêm task thành công`,
				status: 'success',
				isClosable: true,
				variant: 'subtle',
			})
			handleFetchTask()
			setIsOpenFormAddTask(false)
			setTaskName('')
		} catch (error) {
			toast({
				title: `Thêm task thất bại`,
				status: 'error',
				isClosable: true,
				variant: 'subtle',
			})
		}
	}

	const handleFetchTask = async () => {
		try {
			const { data } = await execute.get(TASK_API)
			setTasks(data)
		} catch (error) {
			console.log('error', error)
		}
	}

	const handleDeleteTask = async (id: number) => {
		try {
			await execute.delete(`${TASK_API}/${id}`)
			handleFetchTask()
		} catch (error) {
			console.log('error :>> ', error)
			toast({
				status: 'error',
				title: `Update task thất bại`,
				variant: 'subtle',
			})
		}
	}

	useEffect(() => {
		handleFetchTask()
	}, [])

	return (
		<VStack mt='10'>
			<>
				<Box>
					<Heading lineHeight='tall'>
						<Highlight
							query='spotlight'
							styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
						>
							To Do App
						</Highlight>
					</Heading>
				</Box>

				<Box>
					<Button
						onClick={() => setIsOpenFormAddTask(!isOpenFormAddTask)}
						colorScheme={isOpenFormAddTask ? 'red' : 'whatsapp'}
					>
						{isOpenFormAddTask ? 'Close' : 'Open'} add task form
					</Button>
				</Box>

				{isOpenFormAddTask && (
					<AddTaskForm
						taskName={taskName}
						setTaskName={setTaskName}
						handleAddTask={handleAddTask}
					/>
				)}

				<Divider my='10' />

				<Heading lineHeight='tall'>
					<Highlight
						query='spotlight'
						styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
					>
						List task
					</Highlight>
				</Heading>

				{tasks.map((task) => (
					<Flex key={task.id}>
						<TaskItem task={task} />
						<Button ml='2' onClick={() => handleDeleteTask(task.id)}>
							Delete
						</Button>
					</Flex>
				))}
			</>
		</VStack>
	)
}
