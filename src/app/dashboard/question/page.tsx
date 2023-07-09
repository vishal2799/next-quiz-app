// import Link from 'next/link'
// import { buttonVariants } from '@/components/ui/button'

// export default function Question() {
//     return (
//     <div>
//         <div className='flex justify-between items-center'>
//             <h1 className='text-3xl font-semibold tracking-tight'>Question</h1>
//             <Link href='/dashboard/question/create' className={buttonVariants()}>Create Question</Link>           
//         </div>
//     </div>
//     )
// }
  
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { DataTable } from "./data-table"
import {  QuestionColumn, columns } from "./columns"
import { db } from '@/lib/db'




export default async function Question() {

  const questions = await db.question.findMany({
    include: {
        options: true,
        subject: true
    }
  });

  console.log('data', questions)

  const formattedQuestions: QuestionColumn[] = questions.map((item) => ({
    id: item.id,
    description: item.description,
    isActive: item.isActive,
    options: item.options[0].description,
    option2: item.options[1].description,
    option3: item.options[2].description,
    option4: item.options[3].description,
    correctOption: item.correctOption,
    subject: item.subject.name,
    subjectId: item.subjectId
    
  }));

   
    return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Question</h1>
            <Link href='/dashboard/question/create' className={buttonVariants()}>Create Question</Link>           
        </div>
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={formattedQuestions} />
    </div>
    </div>
    )
}
  
