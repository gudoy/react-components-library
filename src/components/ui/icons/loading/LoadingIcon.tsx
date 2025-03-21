import Icon from '@/components/ui/icons/icon/Icon';

import type { IconProps } from '@/components/ui/icons/icon/Icon';

function LoadingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </Icon>
  );
}

export default LoadingIcon;
