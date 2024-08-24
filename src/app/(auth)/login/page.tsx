'use client'
import { login } from '@/actions/auth'
import React from 'react'
import { useFormState } from 'react-dom'

function LoginPage() {
    const [state, action] = useFormState(login, null)
    return (
        <form action={action}></form>
    )
}

export default LoginPage