import { FormProps } from "app/core/components/Form"

import SpecialMealForm from "app/core/components/Form/SpecialMealForm"
import { applyFunction } from "app/pages/meals/new"

import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function MealForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return <SpecialMealForm {...props} applyFunction={applyFunction} />
}
