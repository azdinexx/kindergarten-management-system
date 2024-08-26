'use client'
import { logout } from '@/actions/auth'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function Logout() {
    const [state, action] = useFormState(logout, null)
    return (
        <form action={action}>
            <LogoutBtn />
        </form>

    )
}

export default Logout

function LogoutBtn() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' className='bg-red-500 text-white py-2 px-4 rounded-full'>
            {
                pending ? 'logging out...' : 'logout'
            }
        </button>
    )
}