'use client'
import { create_new_account } from '@/actions/account'
import SubmitBtn from '@/ui/SubmitBtn'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

function LoginPage() {
    const [state, action] = useFormState(create_new_account, null)
    useEffect(() => {
        if (state?.message) {
            toast.success(state.message)
        }
    }, [state])

    return (
        <main className='w-screen h-screen flex pt-20 items-center flex-col gap-10 relative overflow-x-hidden'>

            <p className='text-center text-4xl tracking-tighter font-bold max-w-xs'>Kindergarten Management <span className='font-light'>&copy;</span>
            </p>
            <form action={action} className='border-2 p-10 rounded-xl border-neutral-900 bg-neutral-800/50 shadow-xl shadow-neutral-700/20 flex flex-col gap-2 mb-24'>
                <p className='text-center text-3xl tracking-tighter font-bold'>New Account
                </p>
                <p className='text-sm mx-auto mt-2 text-neutral-500 max-w-48 text-center '>
                    creating a new account
                </p>

                <div className='py-2  grid grid-cols-3 lg:grid-cols-6 gap-2 mt-8'>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name='firstName' required placeholder='your first name' className='col-span-2 bg-neutral-800 p-2 rounded-full pl-5 transition-all duration-150 ease-in-out' />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name='lastName' required placeholder='your last name' className='bg-neutral-800 p-2 rounded-full pl-5 transition-all duration-150 ease-in-out col-span-2' />
                </div>

                {
                    state?.errors?.firstName && (
                        <p className='text-red-500 text-xs'>
                            first name : {state?.errors?.firstName}
                        </p>
                    )
                }
                {
                    state?.errors?.lastName && (
                        <p className='text-red-500 text-xs'>
                            last name : {state?.errors?.lastName}
                        </p>
                    )
                }


                <div className='py-2  grid grid-cols-3 lg:grid-cols-6'>
                    <label htmlFor="role">Role</label>
                    <div className='col-span-2 bg-neutral-800 px-5 rounded-full '>
                        <select name="role" id="" className='w-full bg-neutral-800 p-2'
                            defaultValue={'STAFF'}
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="STAFF">Staff</option>
                            <option value="PARENT">Parent</option>
                        </select>
                    </div>
                </div>
                {
                    state?.errors?.role && (
                        <p className='text-red-500 text-xs'>
                            last name : {state?.errors?.role}
                        </p>
                    )
                }
                <div className='py-2  grid grid-cols-3 lg:grid-cols-6'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='email'
                        required
                        className='lg:col-span-5 col-span-2 bg-neutral-800 p-2 rounded-full pl-5 w-full transition-all duration-150 ease-in-out' />
                </div>
                {
                    state?.errors?.email && (
                        <ul className='text-red-500 text-xs flex flex-col list-disc list-inside'>
                            {
                                Object.values(state.errors.email).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    )
                }
                <div className='py-2  grid grid-cols-3 lg:grid-cols-6'>
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name='pwd' placeholder='password'
                        required className='lg:col-span-5 col-span-2 bg-neutral-800 p-2 rounded-full pl-5 w-full transition-all duration-150 ease-in-out' />
                </div>
                {
                    state?.errors?.password && (
                        <ul className='text-red-500 text-xs flex flex-col list-disc list-inside'>
                            {
                                Object.values(state.errors.password).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    )
                }

                <SubmitBtn>
                    Create
                </SubmitBtn >

                <p className='text-sm text-center mt-10 tracking-tight'>
                    you have an account?{' '}
                    <Link href={'/login'} className='text-blue-500 inline tracking-normal'>
                        Login here.
                    </Link>
                </p>
                <ul className='text-sm text-center mt-10 tracking-tight flex justify-center gap-2'>
                    <li>
                        <Link href={'/signup'} className='text-green-500 inline tracking-normal'>
                            Support
                        </Link>
                    </li>
                    <li>.</li>
                    <li>
                        <Link href={'/signup'} className='text-green-500 inline tracking-normal'>
                            Help
                        </Link>
                    </li>
                </ul>
            </form>
        </main>
    )
}

export default LoginPage