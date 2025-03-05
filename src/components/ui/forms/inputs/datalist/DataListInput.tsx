import { useCallback } from 'react';

import Input from 'src/components/ui/forms/inputs/Input/Input.tsx';

import './DatalistInput.scss';

type DatalistOption = {
    value: string;
    label?: string;
    key?: string;
};

type DataListInputProps = {
    name: string;
    options: DatalistOption[];
    onFocus: (e: React.FocusEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataListInput = (props: DataListInputProps) => {
    const { onBlur = () => undefined, onFocus = () => undefined, onChange = () => undefined, options, ...rest } = props;

    const datalistId = `${name}-options`;

    const handleChange = useCallback((event) => {
        const value = (event.target as HTMLInputElement).value;

        const cleanValue = value.trim().toLowerCase();
        const dataList = document.getElementById(datalistId);
        const options = dataList?.children || [];
        (Array.from(options) as HTMLOptionElement[]).forEach((opt: HTMLOptionElement) => {
            opt.style.display = !value || opt.label.toLowerCase().includes(cleanValue) ? 'block' : 'none';
        });

        onChange(event);
    }, []);

    const handleFocus = useCallback(
        (event: React.FocusEvent) => {
            const dataList = document.getElementById(datalistId);
            const input = dataList?.previousElementSibling as HTMLInputElement | null;
            input?.removeAttribute('list');

            if (!dataList) {
                return;
            }
            dataList.hidden = false;

            onFocus(event);
        },
        [datalistId, onFocus]
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent) => {
            // const input = document.getElementById(idAttr)
            const dataList = document.getElementById(datalistId);
            // input?.setAttribute('list', '')

            if (!dataList) {
                return;
            }
            dataList.hidden = true;

            onBlur(event);
        },
        [datalistId, onBlur]
    );

    return (
        <>
            <Input
                list={`${name}-options`}
                role="combobox"
                type="search"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                {...rest}
            />
            <datalist hidden={true} id={datalistId} role="listbox">
                {options?.map((option) => {
                    const { value, label, key } = option;
                    return (
                        <option key={key || value} value={value}>
                            {label || value}
                        </option>
                    );
                })}
            </datalist>
        </>
    );
};

export default DataListInput;
