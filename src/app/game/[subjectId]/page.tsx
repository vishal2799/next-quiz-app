"use client"
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { useParams, useRouter } from "next/navigation"

export default async function GameBySubject() {
    const params = useParams();

    return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Game {params.subjectId}</h1>
            <Link href='/dashboard/subject/create' className={buttonVariants()}>Welcome</Link>           
        </div>
        <div className="container mx-auto py-10">
    </div>
    </div>
    )
}
  