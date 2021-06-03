import { z } from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(),
  password,
  name: z.string().nonempty().min(4),
})
export const addMeal = z.object({
  title: z.string().min(5),
  description: z.string().nonempty(),
  cookTime: z.number().min(2),
  image: z.string().nonempty(),
  recipe: z.object({
    instruction: z.string().nonempty(),
    ingredients: z
      .array(
        z.object({
          qty: z.number(),
          name: z.string(),
          measure: z.string(),
        })
      )
      .nonempty()
      .min(2),
  }),
  category: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .min(1),
})
export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
