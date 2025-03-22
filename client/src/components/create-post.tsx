import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from './ui/sheet'

function CreatePost() {
	return (
		<Sheet>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Post</SheetTitle>
					<SheetDescription>Write what is in your mind</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default CreatePost
