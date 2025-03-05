import { type ChangeEvent } from 'react'

import './RadioGroup.scss'

export type RadioOption = {
  label?: string
  value: string
  disabled?: boolean
  key?: string | number
  checked?: boolean
}

type RadioGroupProps = {
  id?: string
  name: string
  options: RadioOption[]
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
}

const RadioGroup = (props: RadioGroupProps) => {
  const { id, name, options, onChange } = props

  return (
    <ul className="radio-group" role="radiogroup">
      {options?.map((option) => {
        const { value, label, key, disabled, checked } = option
        const isChecked = checked || value === props.value
        const itemId = `${id}-${value}`

        return (
          <li className="radio-item" role="radio">
            <input
              checked={isChecked}
              disabled={disabled}
              id={itemId}
              name={name}
              type="radio"
              value={value}
              onChange={onChange}
            />
            <label key={key || value} htmlFor={itemId}>
              {label || value}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export default RadioGroup
