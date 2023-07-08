import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubjectValidator } from '@/lib/validators/subject'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user && session?.user?.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubjectValidator.parse(body)

    // check if subreddit already exists
    const subjectExists = await db.subject.findFirst({
      where: {
        name,
      },
    })

    if (subjectExists) {
      return new Response('Subject already exists', { status: 409 })
    }

    // create subreddit and associate it with the user
    const subject = await db.subject.create({
      data: {
        name,
        //creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    // await db.subscription.create({
    //   data: {
    //     userId: session.user.id,
    //     subredditId: subreddit.id,
    //   },
    // })

    return new Response(subject.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

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
    
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    const subjects = await db.subject.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      }
    });

    return new Response(JSON.stringify(subjects))
  } catch (error) {
    return new Response('Could not fetch subject', { status: 500 })
  }
}