import React from 'react'

function Navigation({
    nav
}: {
    nav: {
        name: string,
        href: string
    }[]
}) {
    return (
        <nav>
            <ul className='flex flex-col gap-4'>
                {
                    nav.map((item) => (
                        <li key={item.name}>
                            <a href={item.href}>{item.name}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navigation