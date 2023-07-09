import { z } from 'zod'

export const QuestionValidator = z.object({
//   title: z
//     .string()
//     .min(3, {
//       message: 'Title must be at least 3 characters long',
//     })
//     .max(128, {
//       message: 'Title must be less than 128 characters long',
//     }),
  subjectId: z.string(),
  description: z.string().min(3 , {
    message: "Question must be at least 2 characters.",
  }),
  options: z.array(z.string().refine((value) => value.trim() !== '', {
    message: 'Invalid input. Please provide a valid value.',
  })),
  correctOption: z.number(),
})

export type CreateQuestionPayload = z.infer<typeof QuestionValidator>