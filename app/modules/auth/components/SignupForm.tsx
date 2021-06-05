import { Link, Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/Form/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/modules/auth/mutations/signup"
import { Signup } from "app/validation"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="shadow-md p-2 bg-white rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-24 md:w-24 text-black mx-auto"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Full Name" placeholder="Full Name" type="text" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
      <div className="text-left pl-2 mb-1 underline font-medium text-primary">
        <Link href={Routes.LoginPage()}>Login to your account </Link>
      </div>
    </div>
  )
}

export default SignupForm
