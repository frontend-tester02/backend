import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

function Auth() {
	const { authState } = useAuth()

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<Card className='w-1/3 p-3 bg-secondary relative'>
				<CardContent>
					{authState === 'login' && <Login />}
					{authState === 'register' && <Register />}
				</CardContent>
			</Card>
		</div>
	)
}

export default Auth
