import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubjectSubscriptionValidator } from '@/lib/validators/subject'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { subjectId } = SubjectSubscriptionValidator.parse(body)

    // check if subscription already exists
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        subjectId
      },
    })

    if (subscriptionExists) {
      return new Response('Subscription already exists', { status: 400 })
    }

    // create subscription
    const subscription = await db.subscription.create({
      data: {
        userId: session.user.id,
        subjectId
    }
})

    // creator also has to be subscribed
    // await db.subscription.create({
    //   data: {
    //     userId: session.user.id,
    //     subredditId: subreddit.id,
    //   },
    // })

    return new Response(JSON.stringify(subscription))
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

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    
    const subscriptions = await db.subscription.findMany({
      where: {
        userId: session.user.id
      }
    });

    return new Response(JSON.stringify(subscriptions))
  } catch (error) {
    return new Response('Could not fetch subscriptions', { status: 500 })
  }
}