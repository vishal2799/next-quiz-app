import { z } from 'zod'

export const SubjectValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubjectSubscriptionValidator = z.object({
  subjectId: z.string(),
})

export type CreateSubjectPayload = z.infer<typeof SubjectValidator>
export type SubscribeToSubjectPayload = z.infer<
  typeof SubjectSubscriptionValidator
>