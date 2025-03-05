import {
  type ReactNode,
  type ChangeEvent,
  type RefObject,
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';

import './SegmentedControl.scss';

type SegmentedControlOption = {
  value: string;
  label?: ReactNode;
  key?: string | number;
  disabled?: boolean;
};

export type SegmentedControlProps = {
  onChange?: (value: string) => void;
  name: string;
  options: SegmentedControlOption[];
  id?: string;
  disabled?: boolean;
  className?: string;
  initialValue?: string;
};

type SegmentedControlOptionWithRef = SegmentedControlOption & { ref: RefObject<HTMLLIElement | null> };

const SegmentedControl = (props: SegmentedControlProps) => {
  const {
    name = '',
    options = [],
    className = '',
    initialValue,
    onChange = () => undefined,
    disabled: globallyDisabled = false,
  } = props;
  const listRef = useRef<HTMLUListElement | null>(null);
  const selectedOptionRef = useRef(null);

  const [selected, setSelected] = useState(initialValue);
  const usedOptions: SegmentedControlOptionWithRef[] = options.map((option) => ({ ...option, ref: selectedOptionRef }));
  const selectedOption = usedOptions.find((option) => option.value === selected);

  const rePositionSelected = useCallback(() => {
    if (!selectedOption || !listRef?.current) {
      return;
    }

    const activeOptionRef = selectedOption?.ref;
    const { offsetWidth, offsetLeft } = activeOptionRef?.current || {};
    const { style } = listRef.current;

    style.setProperty('--segmented-control-item-with', `${offsetWidth}px`);
    style.setProperty('--segmented-control-selected-item-x-pos', `${offsetLeft}px`);
  }, [selectedOption]);

  const handleChange = useCallback(
    (event: ChangeEvent) => {
      const value = (event.target as HTMLInputElement).value;
      setSelected(value);
      onChange(value);
    },
    [onChange]
  );

  useLayoutEffect(() => {
    rePositionSelected();
  }, [rePositionSelected, selected]);

  useEffect(() => {
    if (!listRef?.current) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((_entries) => {
      // Debounce the call to rePositionSelected
      clearTimeout(timeoutId);
      timeoutId = setTimeout(rePositionSelected, 50);
    });
    resizeObserver.observe(listRef.current);

    return () => resizeObserver.disconnect();
  }, [rePositionSelected]);

  const classNames = `input-list radio-input-list ${name} ${className}`;

  return (
    <ul ref={listRef} className={classNames} role="radiogroup">
      {usedOptions.map((option, i) => {
        const { key, label, value, disabled = false, ref: itemRef } = option;
        const optionId = `${name}-${value}`;
        const isChecked = value === selected;
        const usedKey = key ?? value ?? i;

        return (
          <li
            key={usedKey}
            ref={itemRef as RefObject<HTMLLIElement>}
            className={`input-item radio-input-item ${isChecked ? 'is-checked' : ''}`}
          >
            <input
              checked={isChecked}
              disabled={globallyDisabled || disabled}
              id={optionId}
              name={name}
              type="radio"
              value={value}
              onChange={handleChange}
            />
            <label htmlFor={optionId}>{label || value}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default SegmentedControl;
