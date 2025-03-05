import { type ReactNode } from 'react'

import './CheckboxInput.scss'

type CheckBoxInputProps = {
  checked?: boolean
  label?: ReactNode
  value?: string | number
  id?: string
}

const CheckboxInput = (props: CheckBoxInputProps) => {
  const { checked, label, value, id, ...others } = props

  return (
    <span className="checkbox-input input-wrapper">
      <input id={id} type="checkbox" value={checked ? 1 : 0} {...others} />
      <label className="radio" htmlFor={id}>
        {label || value}
      </label>
    </span>
  )
}

export default CheckboxInput
