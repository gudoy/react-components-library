import {
  useState,
  useCallback,
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
  type FocusEvent,
  type ComponentProps,
  useMemo,
  useEffect,
} from 'react'
import DataListInput from 'react-datalist-input'
import { useTranslation } from 'react-i18next'
import { FaCircleCheck, FaCircleXmark, FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'

// import DataListInput from '@/components/Form/Field/DatalistInput/DataListInput'
import CheckboxInput from '@/components/Form/Field/CheckboxInput/CheckboxInput'
import FileInput from '@/components/Form/Field/FileInput/FileInput'
import Input from '@/components/Form/Field/Input/Input'
import RadioGroup from '@/components/Form/Field/RadioGroup/RadioGroup'
import Select from '@/components/Form/Field/Select/Select'
import Textarea from '@/components/Form/Field/Textarea/Textarea'

import type { RadioOption } from '@/components/Form/Field/RadioGroup/RadioGroup'
import type { SelectOptions } from '@/components/Form/Field/Select/Select'

import './Field.scss'

type InputType =
  | 'custom'
  | 'datalist'
  | 'checkbox'
  | 'date'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'search'
  | 'select'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url'

type Validator = { test: (value: string | number | undefined) => boolean; errorMessage: string }

type DatalistOption = {
  label?: string
  value: string
  disabled?: boolean
  key?: string | number
}

type ErrorMessagesKey = 'required' | 'pattern' | 'min' | 'max' | 'minLength' | 'maxLength'
type ErrorMessages = {
  [key in ErrorMessagesKey]?: string
}

type InputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void
type SelectOnChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => void
type TextareaOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => void

// type InputOnBlurHandler = (event: FocusEvent<HTMLInputElement>) => void
// type SelectOnBlurHandler = (event: FocusEvent<HTMLSelectElement>) => void
// type TextareaOnBlurHandler = (event: FocusEvent<HTMLTextAreaElement>) => void

const sanitizeNumberInputValue = (value: string | number) => Number(value.toString().replace(',', '.'))

type CommonFieldProps = {
  /** Name of the input */
  name: string

  /** Type of the field. Default to text **/
  type?: InputType

  /** Value of the field */
  value?: string | number
  /** The event handler to be fired when the field value change */
  onChange?: InputOnChangeHandler | SelectOnChangeHandler | TextareaOnChangeHandler

  /** List of possible values for the field. Used for 'select' , 'radio' or 'datalist' inputs */
  options?: SelectOptions | RadioOption[] | DatalistOption[]

  /**
   * ----------------------------------------
   * Labeling related props
   * ----------------------------------------
   */
  /** Field label */
  label?: string | ReactNode
  /** A placeholder to be displayed in the field until the user set a value */
  placeholder?: string
  /** Description used to give more details about what the field is meant to be for */
  description?: string | ReactNode

  /**
   * ----------------------------------------
   * State related props
   * ----------------------------------------
   */
  /** Is the field disabled */
  disabled?: boolean
  /** Is the field checked (used for radio/checkbox) */
  checked?: boolean

  /**
   * ----------------------------------------
   * Validation related props
   * ----------------------------------------
   */
  /** Is the field required */
  required?: boolean
  /** Minimum allowed value for the field. Only applicable to number fields */
  min?: number
  /** Maximum allowed value for the field. Only applicable to number fields */
  max?: number
  /** Step (increment) for the field. Only applicable to number fields */
  step?: number
  /** Number of rows for a textarea */
  rows?: number
  /** Number of columns for a textarea */
  cols?: number
  /** Regular expression pattern to validate the field value */
  pattern?: string
  /** Maximum length of the field value */
  maxLength?: number
  /** Minimum length of the field value */
  minLength?: number
  /** List (array) of custom validators to apply to the field. Each validator is an object with a 'test' function  and 'errorMessage' string to be displayed in case of invalid value. */
  validators?: Validator[]
  validation?: boolean /** Enable/disable field validation. Default = true */
  /** Small string about how to fill the field and the constraints/validation rules applied to it. Will be displayed as small ⓘ icon with the hint text as popover */
  hint?: string | ReactNode
  /** Custom error messages to display when the field value does not match one of the default validator ('required', 'pattern', 'min', 'max' 'minLength', 'maxLength')  */
  errorMessages?: ErrorMessages
  onValidityChange?: (isValid: boolean) => void

  /**
   * ----------------------------------------
   * Misc other props
   * ----------------------------------------
   */
  /** ID of the field */
  id?: string
  /** Additional classnames */
  className?: string
  autoComplete?: string
  children?: ReactNode
  'data-tooltip'?: string
  'data-tooltip-position'?: string
  input?: ReactNode
}

type InputFieldProps = CommonFieldProps & {
  type?: Exclude<InputType, 'select' | 'textarea'>
  onChange?: InputOnChangeHandler
} & ComponentProps<'input'>
type SelectFieldProps = CommonFieldProps & {
  type?: 'select'
  onChange?: SelectOnChangeHandler
} & ComponentProps<'select'>
type TextareaFieldProps = CommonFieldProps & {
  type?: 'textarea'
  onChange?: TextareaOnChangeHandler
} & ComponentProps<'textarea'>

type FieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps

const Field = (props: FieldProps) => {
  const {
    label,
    type = 'text',
    id: providedId,
    options,
    hint,
    description,
    children,
    validation = true,
    validators = [],
    onChange = () => undefined,
    onValidityChange = () => undefined,
    'data-tooltip': dataTooltip,
    'data-tooltip-position': dataTooltipPosition,
    input,
    minLength,
    errorMessages,
    ...forwardableProps
  } = props
  const { name, value, className } = forwardableProps
  const { disabled, required, checked } = forwardableProps
  const { min, max, step, pattern, maxLength } = forwardableProps

  const { t } = useTranslation()

  // Forwardable props:
  // name, id, className, value,
  // disabled, checked, required,
  // autoComplete,
  // min, max, pattern, step,
  // rows, cols, maxlength

  // Has the field been touched/modified by the user
  const [isPristine, setIsPristine] = useState<boolean>(value === undefined)
  const [isError, setIsError] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const isMultiple = type === 'radio' && options?.length
  const id = providedId || name ? `${providedId || name}-input` : ''

  const checkValidity = useCallback(
    (value: string | number | undefined, isChecked?: boolean | undefined) => {
      const hasNotValue = value === null || value === undefined || value === ''
      const hasValue = value !== null && value !== undefined && value !== ''

      if (required) {
        // Special case for checkboxes where we need to check if the checkbox is checked
        if (type === 'checkbox' && !isChecked) {
          return { isValid: false, errorMessage: errorMessages?.required || t('commonRequiredCheckboxFieldError') }
        }

        if (hasNotValue) {
          return { isValid: false, errorMessage: errorMessages?.required || t('commonRequiredFieldError') }
        }
      }

      if (pattern && hasValue && !new RegExp(pattern).test(value as string)) {
        return { isValid: false, errorMessage: errorMessages?.pattern || t('commonPatternValueError') }
      }

      if (type === 'number' && hasValue) {
        const sanitizedValue = sanitizeNumberInputValue(value)

        if (min && sanitizedValue < min) {
          return { isValid: false, errorMessage: errorMessages?.min || t('commonMinValueError', { min }) }
        }

        if (max && sanitizedValue > max) {
          return { isValid: false, errorMessage: errorMessages?.max || t('commonMaxValueError', { max }) }
        }
      }

      if (minLength && hasValue && value.toString().trim().length < minLength) {
        return {
          isValid: false,
          errorMessage: errorMessages?.minLength || t('commonMinLengthValueError', { min: minLength }),
        }
      }

      if (maxLength && hasValue && value.toString().length > maxLength) {
        return {
          isValid: false,
          errorMessage: errorMessages?.maxLength || t('commonMaxLengthValueError', { maxLength }),
        }
      }

      const firstFoundError = validators.find(({ test }) => !test(value))
      const isValid = !firstFoundError

      return { isValid, errorMessage: firstFoundError?.errorMessage || '' }
    },
    [required, type, min, max, minLength, t, validators, step, pattern, errorMessages]
  )

  const hasValue =
    (type !== 'checkbox' &&
      ['string', 'number'].includes(typeof value) &&
      value !== null &&
      value !== undefined &&
      value !== '') ||
    (Array.isArray(value) && (value as Array<any>).length > 0)

  const [isValid, setIsValid] = useState<boolean | null>(
    !disabled && (isPristine || hasValue) ? checkValidity(value, checked).isValid : null
  )

  const validateField = useCallback(
    (value: string | undefined, isChecked?: boolean | undefined) => {
      if (!validation || disabled) {
        setIsValid(null)
        setIsError(null)
        return
      }

      const { isValid: newIsValid, errorMessage } = checkValidity(value, isChecked)

      if (newIsValid !== isValid) {
        onValidityChange(newIsValid)
      }

      setIsValid(newIsValid)
      setIsError(Boolean(errorMessage))
      setErrorMessage(errorMessage)
    },
    [validation, isValid, disabled, onValidityChange, checkValidity]
  )

  let fieldValidationTimeoutId: ReturnType<typeof setTimeout>

  /**
   * Handler called when the value of the field change
   */
  const handleChange = useCallback(
    (event: ChangeEvent) => {
      // @ts-expect-error fixme
      const value = event.target.value
      const isChecked = type === 'checkbox' ? (event?.target as HTMLInputElement).checked : undefined

      setIsPristine(false)

      clearTimeout(fieldValidationTimeoutId)
      fieldValidationTimeoutId = setTimeout(() => {
        validateField(value, isChecked)
      }, 300)

      // @ts-expect-error fixme
      onChange(event)
    },
    [onChange, validateField]
  )

  const handleDatalistSelectItem = useCallback(
    (item) => {
      const { value } = item
      setIsPristine(false)
      validateField(value)
      // @ts-expect-error fixme
      onChange({ target: { value } })
    },
    [onChange]
  )

  /**
   * Handler called when the input lose focus
   */
  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setIsPristine(false)
      validateField((event.target as HTMLInputElement).value)
    },
    [validateField]
  )

  const handleShowPasswordClick = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation()
      setIsPasswordShown(!isPasswordShown)
    },
    [isPasswordShown]
  )

  // On mount, if an initial value is set, we need to trigger validity change event
  useEffect(() => {
    //
    // if (!hasValue) {
    //   return
    // }

    onValidityChange(checkValidity(value, checked).isValid)
  }, [value, checked])

  const fieldId = `${providedId || name ? `${(providedId || name).replace('-field', '')}-field` : ''}`
  const classNames =
    `field ${fieldId} ${className || ''} ${name && name.indexOf('[') === -1 ? name : ''} ${isPristine ? 'is-pristine' : ''} ${checked ? 'is-checked' : ''} ${disabled ? 'is-disabled' : ''} ${isValid ? 'is-valid' : ''} ${isError ? 'is-error' : ''}`
      .replace(/\s{2,}/g, ' ')
      .trimEnd()
  const usedType = type === 'password' && isPasswordShown ? 'text' : type
  const shouldUseBaseInput = !['select', 'textarea', 'datalist', 'radio', 'checkbox', 'file', 'custom'].includes(type)
  const datalistOptions = useMemo(() => {
    return type === 'datalist'
      ? ((options || []) as DatalistOption[]).map(({ label, value }) => ({ label, value, key: value || label }))
      : []
  }, [type, options])

  return (
    <div
      className={classNames}
      data-required={required}
      data-tooltip={dataTooltip}
      data-tooltip-position={dataTooltipPosition}
      data-type={type}
      id={fieldId}
    >
      {label && (type !== 'checkbox' || isMultiple) && (
        <div className="label field-label">
          <label htmlFor={isMultiple ? undefined : id}>
            {label}
            {required && <span className="required">*</span>}
          </label>
          {description && <p className="description">{description}</p>}
        </div>
      )}

      <div className="input field-input" data-disabled={disabled ? disabled : undefined}>
        {type === 'checkbox' && (
          // @ts-expect-error fixme
          <CheckboxInput checked={checked} id={id} label={label} onChange={handleChange} {...forwardableProps} />
        )}
        {type === 'radio' && (
          <RadioGroup options={(options || []) as RadioOption[]} {...forwardableProps} onChange={handleChange} />
        )}
        {type === 'select' && (
          <Select
            disabled={disabled}
            options={options || []}
            onBlur={handleBlur}
            onChange={handleChange}
            {...forwardableProps}
          />
        )}
        {type === 'textarea' &&
          (() => {
            // const { placeholder, rows = 3, ..._others } = rest
            return <Textarea onBlur={handleBlur} onChange={handleChange} {...forwardableProps} />
          })()}
        {type === 'datalist' && (
          // TODO: Finish implementing the below custom component instead of using the react-datalist-input
          // <DataListInput name={name} options={options} onChange={handleChange} {...forwardableProps} />
          <DataListInput
            itemClassName="datalist-item"
            items={datalistOptions}
            value={value}
            onBlur={handleBlur}
            onSelect={handleDatalistSelectItem}
            {...forwardableProps}
          />
        )}
        {type === 'file' && <FileInput onBlur={handleBlur} onChange={handleChange} {...forwardableProps} />}
        {type === 'custom' && <>{input && input}</>}
        {shouldUseBaseInput && (
          <Input
            id={id}
            type={usedType}
            onBlur={handleBlur}
            onChange={handleChange}
            // onInput={handleInput}
            {...forwardableProps}
          />
        )}
        {type === 'password' && (
          <button className="show-password-action" type="button" onClick={handleShowPasswordClick}>
            {isPasswordShown && <FaRegEyeSlash />}
            {!isPasswordShown && <FaRegEye />}
          </button>
        )}

        {isValid === true && <FaCircleCheck className="status is-valid" />}
        {!isValid && isError === true && <FaCircleXmark className="status is-error" />}
        {hint && (
          <div className="hint">
            <span className="icon">ⓘ</span>
            <p className="message">{hint}</p>
          </div>
        )}
        {!isValid && isError && errorMessage && (
          <div className="message error error-message">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {children}
    </div>
  )
}

export default Field
