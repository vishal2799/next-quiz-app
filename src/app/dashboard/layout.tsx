import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BarChart2, Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { authOptions, getAuthSession } from "@/lib/auth"
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({children}:{
  children: React.ReactNode
}) => {
  const session = await getAuthSession();
  if(session?.user.role !== 'ADMIN'){
    redirect('/')
  }

  return (
    <div className="flex">
      {/* Navbar */}
      <aside className="bg-gray-800 text-white w-full md:w-1/4 min-h-screen">
        {/* Navbar content */}
        <nav>
          <ul>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Home className="mr-2 md:mr-4 text-xl" />
              <Link href='/dashboard' className="hidden md:inline">Dashboard</Link>
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700">
              <BarChart2 className="mr-2 md:mr-4 text-xl" />
              <Link href='/dashboard/subject' className="hidden md:inline">Subject</Link>
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Settings className="mr-2 md:mr-4 text-xl" />
              <Link href='/dashboard/question' className="hidden md:inline">Question</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="w-full md:w-3/4 bg-gray-100 p-8">{children}</main>
    </div>
    // <div className='absolute inset-0'>
    //   <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
    //     <Link
    //       href='/'
    //       className={cn(
    //         buttonVariants({ variant: 'ghost' }),
    //         'self-start -mt-20'
    //       )}>
    //       <ChevronLeft className='mr-2 h-4 w-4' />
    //       Home
    //     </Link>
    //     <div>
    //       <Link className={buttonVariants()} href='/dashboard/subject/create'>Create Subject</Link>
    //     </div>
    //   </div>
    // </div>
  )
}

export default page