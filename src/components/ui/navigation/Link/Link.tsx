import Loader from '@/components/ui/states/loading/Loader'

import { useCallback, type AnchorHTMLAttributes, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react'

import './Link.scss'

export type TooltipPosition = 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right'

export type LinkType = 'default' | 'primary' | 'secondary'

export type LinkProps = {
  className?: string
  type?: LinkType
  children?: ReactNode
  disabled?: boolean
  href?: string
  icon?: ReactNode
  loading?: boolean
  onClick?: (event?: SyntheticEvent) => void
  target?: string
  tooltip?: string
  tooltipPosition?: TooltipPosition
} & AnchorHTMLAttributes<HTMLAnchorElement>

const Link = (props: LinkProps) => {
  const { children, className, href, icon, type, target } = props
  const { onClick, loading, disabled } = props
  const { tooltip, tooltipPosition } = props

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
    }

    if (onClick) {
      onClick(event)
    }
  }, [disabled, onClick])

  const classNames = `link ${type || ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled ' : ''} ${className || ''}`.replace(/\s+/g, ' ').trim()

  return (
    <a
      aria-disabled={disabled}
      className={classNames}
      data-tooltip={tooltip}
      data-tooltip-position={tooltip ? tooltipPosition || 'bottom center' : undefined}
      href={href}
      target={target}
      onClick={handleClick}
    >
      {loading && (
          <Loader />
      )}
      {children}
      {icon}
    </a>
  )
}

export default Link
