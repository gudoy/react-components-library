import Icon from '@/components/ui/icons/icon/Icon';

function ErrorIcon() {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    </Icon>
  );
}

export default ErrorIcon;
