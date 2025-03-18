import { useCallback, type ReactNode, type FormEventHandler } from 'react';

import ErrorIcon from '@/components/ui/icons/notifications/ErrorIcon';

type FormProps = {
  /** Content */
  children: ReactNode;

  /** ID of the form */
  id?: string;

  /** Additional classes */
  className?: string;

  /** Action attribute of the form */
  action?: string;

  /** Method of the form */
  method?: 'get' | 'post';

  /** The event handler to be fired when the form is submitted */
  onSubmit?: FormEventHandler;

  /** Error message to display */
  error?: string;

  /** Whether the form submission was successful */
  success?: boolean;

  /** Success message to display */
  successMessage?: string;
};

import './Form.scss';

const Form = (props: FormProps) => {
  const {
    id,
    method = 'post',
    action,
    className,
    children,
    success,
    successMessage,
    onSubmit = () => undefined,
    error,
  } = props;

  /**
   * Handler called when the form is submitted
   */
  const handleSubmit = useCallback<FormEventHandler>(
    async (event) => {
      event.preventDefault();

      onSubmit(event);
    },
    [onSubmit]
  );

  const idAttr = id ? id : undefined;
  const classNames = `form ${idAttr || ''} ${className || ''} ${success ? 'is-success' : ''} ${error ? 'is-error' : ''}`
    .replace(/\s{2,}/g, ' ')
    .trimEnd();

  return (
    <form action={action} className={classNames} id={idAttr} method={method} noValidate={true} onSubmit={handleSubmit}>
      {success && successMessage && (
        <div className="message is-success">
          <ErrorIcon />
          <p>{successMessage}</p>
        </div>
      )}
      {!success && error && (
        <div className="message is-error">
          <ErrorIcon />
          <p>{error}</p>
        </div>
      )}
      {children}
    </form>
  );
};

export default Form;
