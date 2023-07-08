import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from "./data-table"
import { Payment, columns } from "./columns"
import { db } from '@/lib/db'
import { SubjectColumn } from './columns'
import { format } from 'date-fns'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}


export default async function Subject() {

  const subjects = await db.subject.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  console.log('data', subjects)

  const formattedSubjects: SubjectColumn[] = subjects.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.isActive,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  const data = await getData()
   
    return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Subject</h1>
            <Link href='/dashboard/subject/create' className={buttonVariants()}>Create Subject</Link>           
        </div>
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={formattedSubjects} />
    </div>
    </div>
    )
}
  