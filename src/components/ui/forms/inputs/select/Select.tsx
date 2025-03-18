import { type ChangeEvent, type FocusEventHandler } from 'react';

import './Select.scss';

export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
  key?: string | number;
  disabled?: boolean;
};

export type SelectOption = {
  label?: string;
  value: string;
  disabled?: boolean;
  key?: string | number;
};

export type SelectOptions = SelectOption[] | SelectOptionGroup[];

type SelectProps = {
  name: string;
  options: SelectOptions;
  value?: string | number;
  id?: string;
  onBlur?: FocusEventHandler;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

const Select = (props: SelectProps) => {
  const {
    name,
    id,
    value,
    options,
    onBlur = (_event) => undefined,
    onChange = (_event) => undefined,
    placeholder,
    disabled,
    ...rest
  } = props;

  const usedId = id || name;

  return (
    // The following wrapper is used to display the placeholder text when no value is selected
    <span className="input-wrapper select-wrapper" data-placeholder={value !== undefined ? placeholder : undefined}>
      <select disabled={disabled} id={usedId} name={name} value={value} onBlur={onBlur} onChange={onChange} {...rest}>
        {options.map((item: SelectOption | SelectOptionGroup) => {
          const isOptionGroup = 'options' in item;

          if (isOptionGroup) {
            const { label, options, key } = item;
            const groupKey = key || label;

            return (
              <optgroup key={groupKey} label={label}>
                {options.map((item) => {
                  const { key, value, label, disabled } = item;
                  const itemKey = key ?? value;
                  const displayedLabel = label || value;

                  return (
                    <option key={itemKey} disabled={disabled} value={value}>
                      {displayedLabel}
                    </option>
                  );
                })}
              </optgroup>
            );
          }

          const { key, value, label, disabled } = item;
          const itemKey = key ?? value;
          const displayedLabel = label || value;

          return (
            <option key={itemKey} disabled={disabled} value={value}>
              {displayedLabel}
            </option>
          );
        })}
      </select>
    </span>
  );
};

export default Select;
