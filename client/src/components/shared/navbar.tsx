import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import CreatePost from '../create-post'
import { useCreatePost } from '@/hooks/use-create-post'
import { authStore } from '@/store/auth.store'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import $axios from '@/http'
import { IUser } from '@/interfaces'

function Navbar() {
	const { onOpen } = useCreatePost()
	const { isAuth, user, isLoading, setIsAuth, setUser } = authStore()
	const navigate = useNavigate()

	const logout = async () => {
		try {
			await $axios.post('/auth/logout')
			localStorage.removeItem('accessToken')
			setIsAuth(false)
			setUser({} as IUser)
			navigate('/auth')
		} catch (error) {
			// @ts-ignore
			toast(error.response?.data?.message)
		}
	}

	return (
		<>
			<div className='w-full h-24 bg-gray-900 fixed inset-0 '>
				<div className='container w-full h-full flex justify-between items-center mx-auto'>
					<Link
						to={'/'}
						className='flex items-center justify-center gap-2 ml-2'
					>
						<img src={'/logo.svg'} alt='Logo' />
						<p className='font-bold text-4xl text-white ml-1'>shoky.dev</p>
					</Link>

					<div className='flex gap-2'>
						{isAuth && (
							<Button
								className='rounded-full font-bold cursor-pointer'
								size={'lg'}
								variant={'outline'}
								onClick={onOpen}
							>
								Create Post
							</Button>
						)}

						{isLoading ? (
							<Loader2 className='animate-spin' />
						) : isAuth ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className='cursor-pointer'>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel className='line-clamp-1'>
										{user.email}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link to={'/auth'}>
								<Button
									className='rounded-full font-bold cursor-pointer'
									size={'lg'}
									variant={'default'}
								>
									Login
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>

			<CreatePost />
		</>
	)
}

export default Navbar
