import { authSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useMutation } from '@tanstack/react-query'
import $axios from '@/http'
import { authStore } from '@/store/auth.store'
import { useNavigate } from 'react-router-dom'
import FillLoading from '../shared/fill-loading'

function Register() {
	const { setAuth } = useAuth()
	const { setIsAuth, setUser } = authStore()

	const navigate = useNavigate()

	const form = useForm<z.infer<typeof authSchema>>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (values: z.infer<typeof authSchema>) => {
			const { data } = await $axios.post(`/auth/register`, values)
			return data
		},

		onSuccess: data => {
			setUser(data.user)
			setIsAuth(true)
			localStorage.setItem('accessToken', data.accessToken)
			navigate('/')
		},
		onError: error => {
			// @ts-ignore
			toast(error.response?.data?.message)
		},
	})

	function onSubmit(values: z.infer<typeof authSchema>) {
		mutate(values)
	}
	return (
		<>
			{isPending && <FillLoading />}
			<h1 className='text-2xl font-bold'>Register</h1>
			<p className='text-sm text-muted-foreground mb-2'>
				Already have an account?{' '}
				<span
					className='cursor-pointer hover:underline text-blue-500'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder='example@email.com'
										type='email'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder='*****' type='password' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end'>
						<span
							className='text-sm text-blue-500 hover:underline cursor-pointer'
							onClick={() => setAuth('forgot-password')}
						>
							Forgot password?
						</span>
					</div>

					<Button type='submit' size={'sm'}>
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}

export default Register
