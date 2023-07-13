import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
//import { QuestionValidator } from '@/lib/validators/question'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { userId, questionId, chosenOption } = body

        const question = await db.question.findUnique({
          where: {
            id: questionId,
          },
          include: {
            options: true,
          },
        });

        if (!question) {
            return new Response('Question not found', { status: 404 })
        }

        const isCorrect = question.options[question.correctOption - 1].id === chosenOption;

        if (isCorrect) {
            await db.attempt.create({
              data: {
                userId,
                questionId,
                chosenOption: question.correctOption,
              },
            });
          }

        return new Response(JSON.stringify({correct: isCorrect}), {status: 200});
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    console.log(error);

    return new Response('Could not create subject', { status: 500 })
  }
}
