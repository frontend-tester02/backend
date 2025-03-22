import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import CreatePost from '../create-post'

function Navbar() {
	return (
		<>
			<div className='w-full h-24 bg-gray-900 fixed inset-0'>
				<div className='w-full h-full flex justify-between items-center container'>
					<Link to={'/'} className='flex items-center justify-betweenap-2 ml-2'>
						<img src={'/logo.svg'} alt='Logo' />
						<p className='font-bold text-4xl text-white ml-1'>Sammi</p>
					</Link>

					<div className='flex gap-2'>
						<Button className='rounded-full font-bold' size={'lg'}>
							Create Post
						</Button>
						<Link to={'/auth'}>
							<Button className='rounded-full font-bold' size={'lg'}>
								Login
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<CreatePost />
		</>
	)
}

export default Navbar
