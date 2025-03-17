import Icon, { IconProps } from '@/components/ui/icons/icon/Icon';

function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </Icon>
  );
}

export default MenuIcon;
