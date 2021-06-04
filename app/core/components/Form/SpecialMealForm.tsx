import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
export { FORM_ERROR } from "final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import LabeledTextField from "./LabeledTextField"
import LabeledSelectAreaField from "./LabeledSelectField"
import LabeledTextAreaField from "./LabeledTextAreaField"
import { ingredientsValidation } from "app/validation"
import { useMutation, useQuery } from "blitz"
import getIngredientsMeasures from "app/meals/queries/getIngredientsMeasures"
import getCategories from "app/categories/queries/getCategories"
import createCategory from "app/categories/mutations/createCategory"
import addIngredientsMutation from "app/meals/mutations/addIngredientMeasures"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  headingText?: String
  bottomLink?: String
  applyFunction: <T>(values: T) => any
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}
const defaultFunction = (values) => values
const customValidation = (schema: z.ZodAny, value: any) => {
  try {
    schema.parse(value)
  } catch (error) {
    // console.log(Object.create(error))

    // return error

    return error?.formErrors?.fieldErrors[`${Object.keys(value)[0]}`]

    // return undefined
  }
}
export function SpecialMealForm<S extends z.ZodType<any, any>>({
  children,
  submitText,
  headingText,
  bottomLink,
  schema,
  initialValues,
  applyFunction = defaultFunction,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [categoryMutation] = useMutation(createCategory)
  const [ingredientsMutation] = useMutation(addIngredientsMutation)
  const addCategory = async (category) => {
    await categoryMutation({ title: category })
  }
  const addIngredients = async (name) => {
    await ingredientsMutation({ name })
  }
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        // console.log(values)
        if (!schema) return
        try {
          schema.parse(applyFunction(values))
        } catch (error) {
          const pureIngredientsError = error.errors.find(
            (x) => "ingredients" === x.path.reduce((acc, curr) => acc + curr, "")
          )?.message
          //   console.log(error?.formErrors?.fieldErrors)
          const y = {
            ...error?.formErrors?.fieldErrors,
            ingredientsError: [
              pureIngredientsError === "Required"
                ? "At least two ingredients are required. Click the 'Add Ingredients' to add ingredients"
                : pureIngredientsError,
            ],
          }
          return y
          //   console.log(error.issues)

          //   console.log("x:", x)
          //   console.log("standard:", error?.formErrors)
          //   return { ...error, errors: x }?.formErrors?.fieldErrors
          // return undefined
        }
      }}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        }, // injected from final-form-arrays above
        pristine,
        submitting,
        submitError,
        values,
      }) => {
        // push?.("ingredients", undefined)
        return (
          <form onSubmit={handleSubmit} className="p-3 bg-white rounded flex  flex-col" {...props}>
            {headingText && <p className="mb-1 text-xl uppercase text-blue-600">{headingText}</p>}
            {/* Form fields supplied as children are rendered here */}

            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-3 mb-4 ">
              <div className="col-span-1 ">
                <div className="grid md:grid-cols-2 gap-3 md:mb-10">
                  <div className="col-span-1">
                    <LabeledTextField name="title" label="Meal Name" placeholder="Name" />
                  </div>

                  <div className="col-span-1">
                    <LabeledSelectAreaField
                      name="category"
                      label="Category"
                      placeholder="Name"
                      queryHook={getCategories}
                      onCreate={addCategory}
                      isMulti
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-4 ">
                  <div className="col-span-1">
                    <LabeledTextField
                      name="cookTime"
                      label="Cook Time(Mins)"
                      placeholder="cookTime"
                      type="number"
                    />
                  </div>
                  <div className="col-span-1">
                    <LabeledTextField
                      name="image"
                      label="Image url"
                      placeholder="https://a.com/a"
                    />
                  </div>
                </div>
                <div className="grid grid-col-1">
                  <div className="col-span-1">
                    <LabeledTextAreaField name="description" label="Meal Description" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 ">
                <div className="grid md:grid-cols-2 gap-3 md:mb-10">
                  <div className="col-span-2">
                    <button
                      className="block px-3 py-1 rounded-md bg-blue-100 text-primary"
                      type="button"
                      onClick={() => push?.("ingredients", undefined)}
                    >
                      Add Ingredient
                    </button>
                    <LabeledTextAreaField name="ingredientsError" label="" hidden />
                  </div>
                </div>

                <div className="grid grid-col-1">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <FieldArray name="ingredients">
                        {({ fields }) =>
                          fields.map((name, index) => {
                            //   console.log(name)
                            return (
                              <div key={name} className="grid md:grid-cols-12 gap-4 mb-3">
                                <div className="col-span-2">
                                  <LabeledTextField
                                    canValidate
                                    customValidation={(x) =>
                                      customValidation(ingredientsValidation.pick({ qty: true }), {
                                        qty: x,
                                      })
                                    }
                                    name={`${name}.qty`}
                                    label="Qty"
                                    placeholder="1"
                                    type="number"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <LabeledSelectAreaField
                                    canValidate
                                    isMulti={false}
                                    queryHook={getIngredientsMeasures}
                                    onCreate={addIngredients}
                                    customValidation={(value) => {
                                      return customValidation(
                                        ingredientsValidation.pick({ measure: true }),
                                        {
                                          measure: value?.value,
                                        }
                                      )
                                    }}
                                    name={`${name}.measure`}
                                    label="Quantity type"
                                    placeholder="spoons"
                                  />
                                </div>
                                <div className="col-span-5">
                                  <LabeledTextField
                                    canValidate
                                    customValidation={(name) =>
                                      customValidation(ingredientsValidation.pick({ name: true }), {
                                        name,
                                      })
                                    }
                                    name={`${name}.name`}
                                    label="Name"
                                    placeholder="Salt"
                                    type="text"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <button
                                    onClick={() => fields.remove(index)}
                                    className="bg-secondary-100 rounded p-2 md:mt-7 flex  "
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6  inline-block"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )
                          })
                        }
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="col-span-1">
                    <LabeledTextAreaField name="instruction" label="Recipe Instruction" />
                  </div>
                </div>
              </div>
            </div>

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

export default SpecialMealForm
