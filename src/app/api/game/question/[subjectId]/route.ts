import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubjectValidator } from '@/lib/validators/subject'
import { z } from 'zod'

import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { subjectId: string } }
    ) {
  const url = new URL(req.url)

  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!params.subjectId) {
        return new NextResponse("Subject id is required", { status: 400 });
      }
    
    const userId = req.nextUrl.searchParams.get('userId');
    
    const attemptedQuestions = await db.attempt.findMany({
        where: {
          userId: userId?.toString()
        },
        select: {
          questionId: true,
        },
      });
    
    if(attemptedQuestions.length > 0){

    // Extract the attempted question IDs into an array
    const attemptedQuestionIds = attemptedQuestions.map((attempt) => attempt.questionId);  

    // Fetch a random question for the specified subject that the user has not attempted
    const question = await db.question.findFirst({
        where: {
          subjectId: params.subjectId,
          NOT: {
            id: {
              in: attemptedQuestionIds,
            },
          },
        },
        include: {
          options: true,
        },
        orderBy: {
            id: 'desc'
        },
      }); 

      if (!question) {
        return new Response('No unanswered questions found for the subject', {status: 500});
      }

      return new Response(JSON.stringify(question));
    
    } else {

      const question = await db.question.findFirst({
        where: {
          subjectId: params.subjectId,
        },
        include: {
          options: true,
        },
        orderBy: {
            id: 'desc'
        },
      }); 

      if (!question) {
        return new Response('No unanswered questions found for the subject', {status: 500});
      }

      return new Response(JSON.stringify(question));

    }

      

  } catch (error) {
    return new Response('Could not fetch subject', { status: 500 })
  }
}