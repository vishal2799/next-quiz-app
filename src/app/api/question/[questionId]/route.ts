import { NextResponse } from "next/server";
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubjectValidator } from "@/lib/validators/subject";
import { QuestionValidator } from "@/lib/validators/question";

export async function GET(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!params.questionId) {
      return new NextResponse("Question id is required", { status: 400 });
    }

    const question = await db.question.findUnique({
      where: {
        id: params.questionId
      },
      include: {
        options: true,
        subject: true
      }
    });
  
    return NextResponse.json(question);
  } catch (error) {
    console.log('[QUESTION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!params.questionId) {
      return new NextResponse("Question id is required", { status: 400 });
    }

    const options = await db.option.deleteMany({
      where: {
        questionId: params.questionId
      }
    })

    const question = await db.question.delete({
      where: {
        id: params.questionId,
      }
    });
  
    return NextResponse.json(question);
  } catch (error) {
    console.log('[QUESTION_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { questionId: string} }
) {
  try {   
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json();
    
    const { description, options, correctOption, subjectId } = QuestionValidator.parse(body);  

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!correctOption) {
        return new NextResponse("Correct Option is required", { status: 400 });
    }

    if (!subjectId) {
        return new NextResponse("Subject Id is required", { status: 400 });
    }

    if(!options || !options.length){
        return new NextResponse("Options is required is required", { status: 400 });
    }

    if (!params.questionId) {
      return new NextResponse("Question id is required", { status: 400 });
    }


    const subject = await db.question.update({
      where: {
        id: params.questionId,
      },
      data: {
        description,
        subjectId,
        correctOption,
        options: {
            deleteMany: {},
            create: options.map((option) => ({
              description: option,
            })),
          },
      }
    });
  
    return NextResponse.json(subject);
  } catch (error) {
    console.log('[QUESTION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};