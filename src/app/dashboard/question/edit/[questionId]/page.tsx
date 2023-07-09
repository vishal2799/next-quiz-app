import { db } from "@/lib/db";
import { QuestionForm } from "@/components/Question-Form";

const QuestionPage = async ({
  params
}: {
  params: { questionId: string }
}) => {
  const question = await db.question.findUnique({
    where: {
      id: params.questionId
    },
    include: {
        options: true,
        subject: true
    }
  });

  const item = question; 

  const formattedQuestion = {
    id: item?.id,
    description: item?.description,
    isActive: item?.isActive,
    options: item?.options.map((el) => {
      return el.description
    }),
    correctOption: item?.correctOption,
    subject: item?.subject.name,
    subjectId: item?.subjectId
  }

  const subjects = await db.subject.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <QuestionForm initialData={formattedQuestion} subjects={subjects} />
      </div>
    </div>
  );
}

export default QuestionPage;