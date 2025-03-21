import Icon from '@/components/ui/icons/icon/Icon';

import type { IconProps } from '@/components/ui/icons/icon/Icon';

function ViewIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </Icon>
  );
}

export default ViewIcon;
