import Icon from '@/components/ui/icons/icon/Icon';

import type { IconProps } from '@/components/ui/icons/icon/Icon';

function StatsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    </Icon>
  );
}

export default StatsIcon;
