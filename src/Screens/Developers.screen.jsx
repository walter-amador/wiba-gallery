import Dev from '../components/Dev';

const Developers = () => {
  return (
    <div className='flex items-center justify-center py-8 md:py-0'>
        <div className='w-max grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center'>
            <Dev 
                name="Alex Sandoval"
                img="/alex.png"
                bgColor="bg-orange-200"
                desc='"Don`t worry if it doesn`t work well. If everything worked well, you`d be out of job."'
            />
            <Dev 
                name="Isis Zapata"
                img="/isis.png"
                bgColor="bg-indigo-300"
                desc='"Solve the problem first. Then write the code"'
            />
            <Dev 
                name="Bryan Martínez"
                img="/bryan.png"
                bgColor="bg-teal-600"
                desc='"Computer Science Engineer, aspiring to become a Frontend Developer"'
            />
            <Dev 
                name="Walter Amador"
                img="/walter.png"
                bgColor="bg-blue-500"
                desc='"Computer Science Engineer, specialized in Full stack web development with JavaScript technologies, SQL and NoSQL databases, and Amazon Web Services."'
            />
        </div>
    </div>
  )
}

export default Developers;