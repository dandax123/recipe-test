import { z } from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(),
  password,
  name: z.string().nonempty().min(4),
})
export const addMeal = z.object({
  title: z.string().min(5),
  description: z.string().nonempty().min(20, "Description requires at least 20 characters"),
  cookTime: z.number().min(2),
  image: z.string().nonempty("Provide the Image Url"),
  instruction: z
    .array(z.object({ instruction: z.string().min(20) }))
    .min(3, "At least three steps are required for the instructions"),
  ingredients: z
    .array(
      z.object({
        qty: z.number(),
        name: z.object({ value: z.string() }),
        measure: z.object({ value: z.string() }),
      })
    )
    .nonempty()
    .min(2),

  category: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .min(1),
})
export const createCategoryValidation = z.object({ title: z.string() })
export const ingredientsValidation = z.object({
  qty: z.number(),
  name: z.string(),
  measure: z.string(),
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
