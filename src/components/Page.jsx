import React from 'react'

const Page = ({header, children}) => {
  return (
    <section className='h-screen w-full flex flex-col'>
        <header className='flex items-center justify-between w-full bg-blue-500 h-16 px-6 shadow-md'>
            {header}
        </header>
        <main className='flex-1 overflow-hidden'>
            {children}
        </main>
    </section>
  )
}

export default Page;