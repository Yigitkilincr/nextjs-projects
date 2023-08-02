import Image from 'next/image'
import { prisma } from '../../../db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
async function createTodo(data: FormData) {
  "use server"

  const title = data.get('title')?.valueOf()
  if (typeof title !== "string" || title.length === 0) {
    throw new Error('Title is required')
  }

  await prisma.todo.create({ data: { title, complete: false }})

  await redirect('/')

}

export default function Page() {
  return (
    <>
    <header className='flex justify-between itesms-center mb-4'>
      <h1 className='text-2x1'>New Todo</h1>
    </header>
    <form action={createTodo} className='flex gap-2 flex-col'>
      <input 
        type="text" 
        name='title'
        className='border border-slate-300 bg-transparent px-4 py-2 rounded outline-none focus-within:border-blue-500'
        />
      
      <div className='flex gap-1 justify-end'>
        <Link href={'..'} className='border border-slate-300 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 focus-within:bg-slate-600'>
          Cancel
        </Link>
        <button type='submit' className='border border-slate-300 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 focus-within:bg-slate-600'>
          Add Todo
        </button>
      </div>
    </form>
    </>
    
  )
}
