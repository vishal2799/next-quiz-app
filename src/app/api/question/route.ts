import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { QuestionValidator } from '@/lib/validators/question'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { subjectId, description, options, correctOption } = QuestionValidator.parse(body)

    // check if subject already exists
    const subjectExists = await db.subject.findFirst({
      where: {
        id: subjectId,
      },
    })

    if (!subjectExists) {
      return new Response('Subject not exists', { status: 409 })
    }

    const question = await db.question.create({
        data: {
          subjectId,
          description,
          options: {
            create: options.map((option) => ({
              description: option,
            })),
          },
          correctOption,
        },
        include: {
          options: true,
        },
      });

    return new Response(question.description, {status: 200});
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    console.log(error);

    return new Response('Could not create subject', { status: 500 })
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)

  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }
    
    // Fetch the user's attempted question IDs
    const attemptedQuestions = await db.attempt.findMany({
      where: {
        userId: url.searchParams.get('userId')?.toString(),
      },
      select: {
        questionId: true,
      },
    });

    // Extract the attempted question IDs into an array
    const attemptedQuestionIds = attemptedQuestions.map((attempt) => attempt.questionId);

    // Fetch all unanswered question IDs
    const unansweredQuestions = await db.question.findMany({
      where: {
        NOT: {
          id: {
            in: attemptedQuestionIds,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (unansweredQuestions.length === 0) {
      return new Response('No unanswered questions found', {status: 404})
    }

    // Randomly select a question ID from the unanswered questions
    const randomQuestionId =
      unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)].id;

    // Fetch the complete question along with options
    const question = await db.question.findUnique({
      where: {
        id: randomQuestionId,
      },
      include: {
        options: true,
      },
    });

    return new Response(JSON.stringify(question))
  } catch (error) {
    return new Response('Could not fetch subject', { status: 500 })
  }
}