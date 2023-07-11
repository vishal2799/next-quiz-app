import { db } from "@/lib/db";
import { DataTable } from "../../question/data-table"
import {  QuestionColumn, columns } from "../../question/columns"
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'


const SubjectPage = async ({
  params
}: {
  params: { subjectId: string }
}) => {
  const subject = await db.subject.findUnique({
    where: {
      id: params.subjectId
    }
  });

  const questions = await db.question.findMany({
    where: {
      subjectId: params.subjectId
    },
    include: {
        options: true,
        subject: true
    }
  });


  const formattedQuestions: QuestionColumn[] = questions.map((item) => ({
    id: item.id,
    description: item.description,
    isActive: item.isActive,
    option1: item.options[0].description,
    option2: item.options[1].description,
    option3: item.options[2].description,
    option4: item.options[3].description,
    correctOption: item.correctOption,
    subject: item.subject.name,
    subjectId: item.subjectId
    
  }));


  return ( 
    // <div className="flex-col">
    //   <div className="flex-1 space-y-4 p-8 pt-6">
    //     Subject {params.subjectId}
    //   </div>
    // </div>
    <div>
    <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Subject {subject?.name}</h1>
            <Link href='/dashboard/question/create' className={buttonVariants()}>Create Question</Link>           
        </div>
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={formattedQuestions} />
    </div>
    </div>
  );
}

export default SubjectPage;