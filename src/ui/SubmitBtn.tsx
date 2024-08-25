'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Loader } from './loader'

function SubmitBtn({
    children
}: {
    children: React.ReactNode
}) {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            className='p-2 bg-green-500/30 hover:bg-green-500/80 w-full mx-auto rounded-full transition-all duration-150 ease-in-out'>
            {
                pending ? <Loader
                    className='mx-auto w-6 h-6'
                /> : children
            }
        </button>
    )
}

export default SubmitBtn