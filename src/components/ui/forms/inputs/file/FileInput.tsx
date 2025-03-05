import Input from 'src/components/ui/forms/inputs/Input/Input.tsx';

const FileInput = (props: any) => {
    const { value, ...others } = props;

    return (
        <span className="input-wrapper" data-placeholder={value !== undefined ? others?.placeholder : undefined}>
            <Input name={name} type="file" {...others} />
        </span>
    );
};

export default FileInput;
