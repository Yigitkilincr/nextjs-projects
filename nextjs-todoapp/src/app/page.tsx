import Image from 'next/image'
import { prisma } from '../../db'
import Link from 'next/link'
import { TodoItem } from '@/components/TodoItem'
import { redirect } from 'next/dist/server/api-utils'

function getTodos(){
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: {id}, data: {complete} })
}

export default async function Home() {
  const todos = await getTodos()
  return (
    <>
    <header className='flex justify-center items-center mb-4 gap-40'>
      <h1 className='text-2xl'>Todos</h1>
      <Link
        className='text-lg border border-slate-300 px-4 py-2 bg-slate-700 text-white rounded hover:bg-blue-600 focus-within:bg-blue-600'
        href='/new'
      >
        New Todo
      </Link>
    </header>
    <div>
      <ul className='flex flex-col items-center mt-20 pr-5 justify-center text-xl'>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />))}
      </ul>
    </div>
    </>
  )
}
