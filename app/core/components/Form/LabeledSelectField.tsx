import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import Select from "react-select"
import makeAnimated from "react-select/animated"
const animatedComponents = makeAnimated()

export interface OptionsForSelect {
  value: string | number
  label: string
}
export interface SelectOptions extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  data: OptionsForSelect[]
  isMulti: boolean
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledSelectAreaField = forwardRef<HTMLTextAreaElement, SelectOptions>(
  ({ name, label, isMulti, data, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label>
          {label}
          <Select
            {...input}
            isDisabled={submitting}
            {...props}
            options={data}
            ref={ref}
            components={animatedComponents}
            isMulti={isMulti}
            rows={4}
            className="w-full pt-1 rounded-sm border-black border-3 "
          />
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          .css-yk16xz-control {
            border-radius: 3px;
            border: 1px solid black;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledSelectAreaField
