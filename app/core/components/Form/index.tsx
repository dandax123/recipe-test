import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  headingText?: String
  bottomLink?: String
  shouldApplyFunction?: boolean
  applyFunction?: <T>(values: T) => any
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}
const defaultFunction = (values) => values
export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  headingText,
  bottomLink,
  schema,
  shouldApplyFunction = false,
  initialValues,
  applyFunction = defaultFunction,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          const updatedValues = shouldApplyFunction ? applyFunction(values) : values

          schema.parse(updatedValues)
        } catch (error) {
          // console.error(error?.formErrors)
          return error?.formErrors?.fieldErrors
          // return undefined
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, values }) => {
        console.log(values)
        return (
          <form onSubmit={handleSubmit} className="p-3 bg-white rounded flex  flex-col" {...props}>
            {headingText && <p className="mb-1 text-xl uppercase text-blue-600">{headingText}</p>}
            {/* Form fields supplied as children are rendered here */}
            {children}

            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            {submitText && (
              <button
                type="submit"
                className="bg-primary hover:bg-secondary-100 hover:text-primary text-white font-bold p-2 rounded w-80 my-4 mx-auto"
                disabled={submitting}
              >
                {submitText}
              </button>
            )}
            {bottomLink && <div>Or {bottomLink}</div>}
            <style global jsx>{`
              .form > * + * {
                margin-top: 0.8rem;
              }
            `}</style>
          </form>
        )
      }}
    />
  )
}

export default Form
