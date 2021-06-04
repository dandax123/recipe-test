import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/Form/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CategoryForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Category Name" placeholder="Salads" type="text" />
    </Form>
  )
}
