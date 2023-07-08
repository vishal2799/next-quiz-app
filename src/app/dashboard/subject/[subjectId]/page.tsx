import { db } from "@/lib/db";
import { SubjectForm } from "@/components/Subject-Form";

const SubjectPage = async ({
  params
}: {
  params: { subjectId: string }
}) => {
  const category = await db.subject.findUnique({
    where: {
      id: params.subjectId
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubjectForm initialData={category} />
      </div>
    </div>
  );
}

export default SubjectPage;