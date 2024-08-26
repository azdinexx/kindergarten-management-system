import React from 'react'

interface Props {
    params: {
        user: string
    }
}
function page({
    params: { user }
}: Props) {
    console.log(user)

    switch (user) {
        case 'admin':
            return (
                <p>
                    admin
                </p>
            )
            break;
        case 'teacher':
            return (
                <p>
                    teacher
                </p>
            )
            break;
        case 'staff':
            return (
                <p>
                    staff
                </p>
            )
            break;
        case 'parent':
            return (
                <p>
                    parent
                </p>
            )
            break;
        default:
            return <p>
                who tf are u?
            </p>
            break;
    }
    return (
        <div>page</div>
    )
}

export default page