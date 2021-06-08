import { ReactNode, PropsWithoutRef, useRef, useEffect } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import LabeledTextField from "./LabeledTextField"
import LabeledSelectAreaField from "./LabeledSelectField"
import LabeledTextAreaField from "./LabeledTextAreaField"
import { ingredientsValidation } from "app/validation"
import { useMutation, useQuery } from "blitz"
import getIngredientsMeasures from "app/modules/meals/queries/getIngredients"
import getCategories from "app/modules/categories/queries/getCategories"
import createCategory from "app/modules/categories/mutations/createCategory"
import addIngredientsMutation from "app/modules/meals/mutations/addIngredients"
import addIngredientName from "app/modules/meals/mutations/addIngredientName"
export { FORM_ERROR } from "final-form"
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
  // console.log(value)
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
  const [addIngredientNameMutation] = useMutation(addIngredientName)
  const [categoryData] = useQuery(getCategories, {})
  const [measuresData] = useQuery(getIngredientsMeasures, {})
  const addIngredientRef = useRef()
  const addInstructionRef = useRef()
  console.log("initialValues", initialValues)

  useEffect(() => {
    if ("current" in addIngredientRef && !initialValues?.title) {
      addIngredientRef.current.click()
      addIngredientRef.current.click()
    }
    if ("current" in addInstructionRef && !initialValues?.title) {
      addInstructionRef.current.click()
    }
  }, [])
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
          const pureManualError = error.errors
            .filter((x) => {
              const path = x.path.reduce((acc, curr) => acc + curr, "")
              if (path === "ingredients" || path === "instruction") {
                return true
              }
              return false
            })
            .reduce((acc, curr) => ({ ...acc, [`${curr.path}Error`]: [curr.message] }), {})
          // console.log(Object.create(error?.formErrors))

          const y = {
            ...error?.formErrors?.fieldErrors,
            ...pureManualError,
          }
          // console.log(y)
          return y
        }
      }}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form: {
          mutators: { push },
        },
        submitting,
        submitError,
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
                      data={categoryData}
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
                      min={1}
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
                    <LabeledTextAreaField name="description" label="Meal Description" rows={2} />
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div>
                    <h1>Recipe Instruction</h1>

                    <FieldArray
                      name="instruction"
                      initialValue={
                        initialValues?.Recipe?.instruction?.map((x) => ({ instruction: x })) || []
                      }
                    >
                      {({ fields }) =>
                        fields.map((name, index) => {
                          return (
                            <div className="grid grid-cols-1" key={index}>
                              <div className="col-span-1">
                                <LabeledTextAreaField
                                  name={`${name}.instruction`}
                                  label={`Step ${index + 1}`}
                                  rows={3}
                                  canValidate
                                  customValidation={(x) =>
                                    customValidation(
                                      z.object({
                                        instruction: z
                                          .string()
                                          .nonempty("Provide the instruction for this step")
                                          .min(
                                            20,
                                            "This instruction should contains at least 20 characters"
                                          ),
                                      }),
                                      {
                                        instruction: x,
                                      }
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )
                        })
                      }
                    </FieldArray>
                    <button
                      className="block px-3 py-1 rounded-md text-black shadow-lg bg-gray-300 font-normal mt-5 "
                      type="button"
                      ref={addInstructionRef}
                      onClick={() => push?.("instruction", undefined)}
                    >
                      Add Instruction
                    </button>
                    <div className="grid md:grid-cols-2 gap-3 md:mb-0">
                      <div className="col-span-2">
                        <LabeledTextAreaField name="instructionError" label="" hidden />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 ">
                <div className="grid grid-col-1">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="col-span-2">
                      <FieldArray
                        name="ingredients"
                        initialValue={
                          initialValues?.Recipe?.ingredients?.map((x) => ({
                            qty: x.qty,
                            name: x.ingredientName,
                            measure: x.measures.name,
                          })) || []
                        }
                      >
                        {({ fields }) =>
                          fields.map((name, index) => {
                            //   console.log(name)
                            return (
                              <div key={name} className="grid md:grid-cols-12 gap-4 mb-0">
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
                                    min={1}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <LabeledSelectAreaField
                                    canValidate
                                    isMulti={false}
                                    data={measuresData.categories}
                                    onCreate={addIngredients}
                                    // defaultValue =
                                    customValidation={(value) => {
                                      // console.log(value)
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
                                  <LabeledSelectAreaField
                                    canValidate
                                    isMulti={false}
                                    data={measuresData.ingredientsName}
                                    onCreate={addIngredientNameMutation}
                                    customValidation={(name) => {
                                      return customValidation(
                                        ingredientsValidation.pick({ name: true }),
                                        {
                                          name: name?.value,
                                        }
                                      )
                                    }}
                                    name={`${name}.name`}
                                    label="Name"
                                    placeholder="Salt"
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
                      <button
                        className="block px-3 py-1 rounded-md text-black shadow-lg bg-gray-300 font-normal mt-5 "
                        type="button"
                        ref={addIngredientRef}
                        onClick={() => push?.("ingredients", undefined)}
                      >
                        Add Ingredient
                      </button>
                      <div className="grid md:grid-cols-2 gap-3 md:mb-0">
                        <div className="col-span-2">
                          <LabeledTextAreaField name="ingredientsError" label="" hidden />
                        </div>
                      </div>
                    </div>
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
