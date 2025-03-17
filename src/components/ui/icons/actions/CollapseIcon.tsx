import Icon from '@/components/ui/icons/icon/Icon';

import type { IconProps } from '@/components/ui/icons/icon/Icon';

function CollapseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </Icon>
  );
}

export default CollapseIcon;
