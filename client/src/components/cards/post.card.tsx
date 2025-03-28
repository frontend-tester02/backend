import { IPost } from '@/interfaces'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { API_URL } from '@/http'
import { Button } from '../ui/button'
import { useConfirm } from '@/hooks/use-confirm'

function PostCard({ post }: { post: IPost }) {
	const { onOpen, setPost } = useConfirm()

	const onDelete = () => {
		onOpen()
		setPost(post)
	}
	return (
		<Card className='py-0 mt-4'>
			<img
				src={`${API_URL}/${post.picture}`}
				alt={post.title}
				className='rounded-t-md'
			/>
			<CardContent>
				<CardTitle className='line-clamp-1 text-xl'>{post.title}</CardTitle>
				<p className='line-clamp-2 mt-1 text-muted-foreground text-sm'>
					{post.body}
				</p>
			</CardContent>
			<CardFooter className='grid grid-cols-2 gap-2 pb-4'>
				<Button>Edit</Button>
				<Button variant={'destructive'} onClick={onDelete}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	)
}

export default PostCard
