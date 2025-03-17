import Icon, { IconProps } from '@/components/ui/icons/icon/Icon';

function MoreIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    </Icon>
  );
}

export default MoreIcon;
