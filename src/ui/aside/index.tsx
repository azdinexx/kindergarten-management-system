import React from 'react'
import Navigation from './Navigation'
import Logout from '../Logout'

function Aside({
    user
}: {
    user: string
}) {

    let Nav = null
    switch (user) {
        case 'admin':
            Nav = <Navigation nav={adminNavigation} />
            break;

        default:
            break;
    }
    return (
        <aside className='min-w-80'>
            {Nav}
            <Logout />

        </aside>
    )
}

export default Aside


const adminNavigation = [
    {
        name: 'Users',
        href: '/admin/users'

    }, {
        name: 'Products',
        href: '/admin/products'
    },
    {
        name: 'rapports',
        href: '/admin/rapports'
    }
]