import './Textarea.scss';

// TODO: Add proper types?
type TextAreaProps = Record<string, unknown>;

const Textarea = (props: TextAreaProps) => {
  return <textarea {...props} />;
};

export default Textarea;
