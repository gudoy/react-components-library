import Input from '@/components/ui/forms/inputs/Input';

type FileInputProps = Record<string, unknown>;

const FileInput = (props: FileInputProps) => {
  const { value, ...others } = props;

  return (
    <span className="input-wrapper" data-placeholder={value !== undefined ? others?.placeholder : undefined}>
      <Input name={name} type="file" {...others} />
    </span>
  );
};

export default FileInput;
