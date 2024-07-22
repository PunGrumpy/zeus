import z from 'zod'

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  tagId: z.number().optional()
})

export const CreateLinkSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'Please enter a URL.' })
    .url({
      message:
        "Please enter a valid URL. Don't forget to include 'http://' or 'https://'."
    })
    .regex(/^(?!.*(?:http|https):\/\/(?:slug|slugr)\.vercel\.app).*$/, {
      message: 'You cannot use the Zeus URL as a redirect destination.'
    })
    .regex(/^\S+$/, {
      message: 'URL cannot contain spaces.' // No blank spaces
    }),
  slug: z
    .string()
    .min(4, {
      message: 'Short link must be at least 4 characters long.'
    })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message:
        'Short link can only contain letters, numbers, underscores, and hyphens.'
    })
    .regex(/^(?!.*&c$)/, {
      message: "Short link cannot end with '&c'."
    }),
  description: z
    .string()
    .max(100, { message: 'Description must be 100 characters or less.' })
})

export const EditLinkSchema = z.object({
  id: z.string(),
  url: z
    .string()
    .min(1, { message: 'Please enter a URL.' })
    .regex(/^(?!.*(?:http|https):\/\/(?:slug|slugr)\.vercel\.app).*$/, {
      message: 'You cannot use the Zeus URL as a redirect destination.'
    })
    .regex(/^\S+$/, {
      message: 'URL cannot contain spaces.' // No blank spaces
    }),
  slug: z
    .string()
    .min(4, {
      message: 'Short link must be at least 4 characters long.'
    })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message:
        'Short link can only contain letters, numbers, underscores, and hyphens.'
    })
    .regex(/^(?!.*&c$)/, {
      message: "Short link cannot end with '&c'."
    }),
  description: z
    .string()
    .max(100, { message: 'Description must be 100 characters or less.' })
})

export const DeleteLinkSchema = z.object({
  slug: z.string().min(1, { message: 'Please provide a slug to delete.' })
})

export const getSingleLinkSchema = z.object({
  linkId: z.number()
})

export const CreateTagSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a tag name.' }).max(15, {
    message: 'Tag name must be 15 characters or less.'
  }),
  color: z.string().min(1, { message: 'Please select a tag color.' })
})

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name.' }).max(40, {
    message: 'Name must be 40 characters or less.'
  }),
  username: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' })
})

export const SignUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' })
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' })
})

export type LinkSchema = z.TypeOf<typeof LinkSchema>
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>
export type UpdateProfileInput = z.TypeOf<typeof UpdateProfileSchema>
export type SignUpInput = z.TypeOf<typeof SignUpSchema>
export type LoginInput = z.TypeOf<typeof LoginSchema>
