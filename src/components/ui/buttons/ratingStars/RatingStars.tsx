import { useCallback } from 'react'

import RatingStar from '@/components/ui/RatingStars/RatingStar/RatingStar'

import './RatingStars.scss'

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5

type RatingStarsProps = {
  rating: RatingValue
  onChange: (value: RatingValue) => void
}

const RatingStars = (props: RatingStarsProps) => {
  const { rating, onChange = () => undefined } = props

  const handleClick = useCallback(
    (value: number) => {
      const newValue = value === rating ? 0 : (value as RatingValue)
      onChange(newValue)
    },
    [onChange, rating]
  )

  return (
    <ul className="rating-stars">
      <li className={rating === 1 ? 'is-current' : ''} onClick={() => handleClick(1)}>
        <RatingStar />
      </li>
      <li className={rating === 2 ? 'is-current' : ''} onClick={() => handleClick(2)}>
        <RatingStar />
      </li>
      <li className={rating === 3 ? 'is-current' : ''} onClick={() => handleClick(3)}>
        <RatingStar />
      </li>
      <li className={rating === 4 ? 'is-current' : ''} onClick={() => handleClick(4)}>
        <RatingStar />
      </li>
      <li className={rating === 5 ? 'is-current' : ''} onClick={() => handleClick(5)}>
        <RatingStar />
      </li>
    </ul>
  )
}

export default RatingStars
