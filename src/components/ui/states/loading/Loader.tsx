import { ReactNode } from 'react';

import Label from '@/components/ui/label/Label';
import LoadingIcon from '@/components/ui/icons/loading/LoadingIcon.tsx';

import './Loader.scss';

export type LoaderProps = {
  label?: string | ReactNode;
};

const Loader = (props: LoaderProps) => {
  const { label } = props;

  return (
    <span className="is-loading">
      <LoadingIcon />
      {label ? <Label value={label} /> : undefined}
    </span>
  );
};

export default Loader;
