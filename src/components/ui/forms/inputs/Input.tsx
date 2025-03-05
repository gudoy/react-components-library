import './Input.scss';

type InputProps = Record<string, unknown>;

const Input = (props: InputProps) => {
  const { ...rest } = props;

  return <input {...rest} />;
};

export default Input;
