import { emailSchema } from '@/lib/validation'
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
import { toast } from 'sonner'
import FillLoading from '../shared/fill-loading'
import { useState } from 'react'

function ForgotPassword() {
	const [success, setSuccess] = useState(false)

	const { setAuth } = useAuth()

	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['forgot-password'],
		mutationFn: async (values: z.infer<typeof emailSchema>) => {
			const { data } = await $axios.post(`/auth/forgot-password`, values)
			return data
		},

		onSuccess: () => {
			setSuccess(true)
		},
		onError: error => {
			// @ts-ignore
			toast(error.response?.data?.message)
		},
	})

	function onSubmit(values: z.infer<typeof emailSchema>) {
		mutate(values)
	}

	if (!success) {
		return (
			<>
				<h1 className='text-2xl font-bold'>Success</h1>
				<p className='text-sm text-muted-foreground mb-2'>
					Please check your email address
				</p>
			</>
		)
	}
	return (
		<>
			{isPending && <FillLoading />}
			<h1 className='text-2xl font-bold'>Forgot password</h1>
			<p className='text-sm text-muted-foreground mb-2'>
				Don't have an account?{' '}
				<span
					className='cursor-pointer hover:underline text-blue-500'
					onClick={() => setAuth('register')}
				>
					Sign up
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

					<Button type='submit' size={'sm'}>
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}

export default ForgotPassword
