import Icon, { IconProps } from '@/components/ui/icons/icon/Icon';

function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </Icon>
  );
}

export default InfoIcon;
