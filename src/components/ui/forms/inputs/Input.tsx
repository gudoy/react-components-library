import './Input.scss'

type InputProps = any

const Input = (props: InputProps) => {
  const { ...rest } = props

  return <input {...rest} />
}

export default Input
