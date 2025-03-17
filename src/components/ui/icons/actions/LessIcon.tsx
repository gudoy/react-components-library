import Icon, { IconProps } from '@/components/ui/icons/icon/Icon';

function LessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    </Icon>
  );
}

export default LessIcon;
