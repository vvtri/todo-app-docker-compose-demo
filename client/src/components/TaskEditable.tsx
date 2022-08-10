import {
	useEditableControls,
	ButtonGroup,
	IconButton,
	Flex,
	Button,
	Box,
} from '@chakra-ui/react'

type Props = {}

export default function TaskEditable({}: Props) {
	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls()

	return (
		<Box ml='6'>
			{isEditing ? (
				<ButtonGroup justifyContent='center' size='sm'>
					<Button {...getSubmitButtonProps()}>Lưu</Button>
					<Button {...getCancelButtonProps()}>Huỷ</Button>
				</ButtonGroup>
			) : (
				<Flex justifyContent='center'>
					<Button {...getEditButtonProps()}>Chỉnh sửa</Button>
				</Flex>
			)}
		</Box>
	)
}
