import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import styled from 'styled-components'
import { palette, key } from 'styled-theme'

import { ButtonColor, ButtonSize, ButtonWeight, ButtonType } from './types'

const fontSettings = {
  small: {
    size: key('sizes.font.small', '10px'),
    spacing: '0.5px',
  },
  normal: {
    size: key('sizes.font.normal', '11px'),
    spacing: '2.5px',
  },
  big: {
    size: key('sizes.font.large', '18px'),
    spacing: '2.5px',
  },
}

const sizes = {
  small: {
    width: key('sizes.button.small.width', '55px'),
    height: key('sizes.button.small.height', '20px'),
    borderBottom: '2px',
  },
  normal: {
    width: key('sizes.button.normal.width', '100px'),
    height: key('sizes.button.normal.height', '30px'),
    borderBottom: '3px',
  },
  big: {
    width: key('sizes.button.big.width', '300px'),
    height: key('sizes.button.big.height', '70px'),
    borderBottom: '4px',
  },
}

type ColorGroup = {
  main: string
  darken: string
  lighten: string
  text: string
  borderBottom: string
}

type ColorGroups = {
  [key in ButtonColor]: ColorGroup
}

const colorGroups: ColorGroups = {
  primary: {
    main: palette('gradient', 0),
    darken: palette('gradient', 1),
    lighten: palette('gradient', 2),
    text: palette('primary', 0),
    borderBottom: palette('gradient', 0),
  },
  success: {
    main: palette('success', 0),
    darken: palette('success', 1),
    lighten: palette('success', 2),
    text: palette('success', 0),
    borderBottom: palette('success', 3),
  },
  warning: {
    main: palette('warning', 0),
    darken: palette('warning', 1),
    lighten: palette('warning', 2),
    text: palette('warning', 0),
    borderBottom: palette('warning', 3),
  },
  error: {
    main: palette('error', 0),
    darken: palette('error', 1),
    lighten: palette('error', 2),
    text: palette('error', 0),
    borderBottom: palette('error', 3),
  },
}

type ButtonThemeValue = {
  text: string
  border: string
  background: string
  action: {
    text: string
    border: string
    background: string
  }
  focus: {
    border: string
    borderBottom?: string
  }
}

type ButtonTheme = {
  [key in ButtonType]?: ButtonThemeValue
}

type ButtonThemes = {
  [key in ButtonColor]?: ButtonTheme
}

const getThemes = () => {
  const theme: ButtonThemes = {}

  Object.keys(colorGroups).forEach((colorType) => {
    const value: ButtonTheme = {}
    const { darken, text, borderBottom } = colorGroups[colorType as ButtonColor]

    const gradient = 'linear-gradient(to left, #00ccff, #23dcc8)'

    value.default = {
      text: palette('text', 3),
      border: text,
      background: gradient,
      action: {
        text: palette('text', 3),
        border: darken,
        background: darken,
      },
      focus: {
        border: darken,
      },
    }

    value.outline = {
      text,
      border: text,
      background: 'transparent',
      action: {
        text: palette('text', 3),
        border: text,
        background: gradient,
      },
      focus: {
        border: text,
      },
    }
    value.ghost = {
      text: palette('text', 0),
      border: palette('gray', 0),
      background: 'transparent',
      action: {
        text: palette('text', 3),
        border: text,
        background: gradient,
      },
      focus: {
        border: gradient,
      },
    }
    value.normal = {
      text: palette('text', 0),
      border: palette('gray', 0),
      background: 'transparent',
      action: {
        text: palette('text', 0),
        border: palette('gray', 0),
        background: 'transparent',
      },
      focus: {
        border: palette('gray', 0),
        borderBottom,
      },
    }

    theme[colorType as ButtonColor] = value
  })

  return theme
}

const themes: ButtonThemes = getThemes()

const getThemeValue = (color: ButtonColor, typeValue: ButtonType) => {
  const theme = themes[color]
  const themValue = theme && theme[typeValue]
  return themValue
}

export type ButtonWrapperProps = {
  round: string
  color: ButtonColor
  sizevalue: ButtonSize
  weight: ButtonWeight
  typevalue: ButtonType
  fixedWidth: string
}

type Props = ButtonWrapperProps & ButtonProps

export const ButtonWrapper = styled(Button)<Props>`
  &.ant-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;

    border-radius: ${(props) =>
      props.round === 'true' ? sizes[props.sizevalue].height : '3px'};
    width: ${(props) =>
      props.fixedWidth === 'true' ? sizes[props.sizevalue].width : 'auto'};
    height: ${(props) => sizes[props.sizevalue].height};
    font-size: ${(props) => fontSettings[props.sizevalue].size};
    font-weight: ${(props) => props.weight};
    letter-spacing: ${(props) => fontSettings[props.sizevalue].spacing};

    text-transform: uppercase;

    /* set theme colors away from antd defaults */
    &,
    &:active,
    &:focus {
      color: ${(props) =>
        getThemeValue(props.color, props.typevalue)?.text ?? ''};
      border-color: ${(props) =>
        getThemeValue(props.color, props.typevalue)?.border ?? ''};
      background: ${(props) =>
        getThemeValue(props.color, props.typevalue)?.background ?? ''};
      ${(props) =>
        props.typevalue === 'normal' &&
        `
          background-position: 0 100%;
          background-repeat: no-repeat;
          -webkit-background-size: 100% 3px;
          -moz-background-size: 100% 3px;
          background-size: 100% 3px;
        `}
    }

    /* provide focus styles over the underlying styles */
    &:focus,
    &:active {
      border-color: ${(props) =>
        getThemeValue(props.color, props.typevalue)?.focus.border ??
        ''} !important; /* (Rudi): HACK: Border is overridden in selection.style.js buttons we need to create a new style for these buttons remove this when ready */
    }

    /* apply special override styles for .focused class */
    &.focused,
    &:hover {
      &,
      &:focus,
      &:active {
        color: ${(props) =>
          getThemeValue(props.color, props.typevalue)?.action.text ?? ''};
        border-color: ${(props) =>
          getThemeValue(props.color, props.typevalue)?.action.border ?? ''};
        background: ${(props) =>
          props.typevalue === 'normal'
            ? getThemeValue(props.color, props.typevalue)?.focus.borderBottom ??
              ''
            : getThemeValue(props.color, props.typevalue)?.action.background ??
              ''};
        ${(props) =>
          props.typevalue === 'normal' &&
          `
          background-position: 0 100%;
          background-repeat: no-repeat;
          -webkit-background-size: 100% 3px;
          -moz-background-size: 100% 3px;
          background-size: 100% 3px;
        `}
      }
    }

    svg {
      display: flex;
      font-size: 18px;
    }
  }
`
