import Icon, { IconProps } from '@/components/ui/icons/icon/Icon';

function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    </Icon>
  );
}

export default UserIcon;
