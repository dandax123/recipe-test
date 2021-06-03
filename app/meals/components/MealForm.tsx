import { Form, FormProps } from "app/core/components/Form"
import LabeledSelectAreaField from "app/core/components/Form/LabeledSelectField"
import LabeledTextAreaField from "app/core/components/Form/LabeledTextAreaField"
import { LabeledTextField } from "app/core/components/Form/LabeledTextField"
import { applyFunction } from "app/pages/meals/new"

import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function MealForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const xoptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  return (
    <Form<S> {...props} applyFunction={applyFunction}>
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
                data={props.categories}
                isMulti
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
            <div className="col-span-1">
              <LabeledTextField
                name="cookTime"
                label="Cook Time(Mins)"
                placeholder="cookTime"
                type="number"
              />
            </div>
            <div className="col-span-1">
              <LabeledTextField name="image" label="Image url" placeholder="https://a.com/a" />
            </div>
          </div>
          <div className="grid grid-col-1">
            <div className="col-span-1">
              <LabeledTextAreaField name="recipe.instruction" label="Recipe Instruction" />
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
