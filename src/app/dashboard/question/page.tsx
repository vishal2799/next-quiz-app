import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Question() {
    return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Question</h1>
            <Link href='/dashboard/question/create' className={buttonVariants()}>Create Question</Link>           
        </div>
    </div>
    )
}
  