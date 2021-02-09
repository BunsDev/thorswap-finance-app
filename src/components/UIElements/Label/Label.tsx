import React from 'react'

import { LabelWrapper } from './Label.style'
import { Color, Size } from './types'

export type Props = {
  size?: Size
  color?: Color
  weight?: string
  loading?: boolean
  children: React.ReactNode
}

const Label = (props: Props) => {
  const {
    loading = false,
    size = 'normal',
    color = 'normal',
    weight = 'normal',
    children,
    ...others
  } = props

  return (
    <LabelWrapper sizeValue={size} color={color} weight={weight} {...others}>
      {loading && '...'}
      {!loading && children}
    </LabelWrapper>
  )
}

export default Label
