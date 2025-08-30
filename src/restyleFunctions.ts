import {TextStyle, FlexStyle, ViewStyle, DimensionValue} from 'react-native';

import createRestyleFunction from './createRestyleFunction';
import {BaseTheme, ResponsiveValue, RNStyleProperty} from './types';
import {getKeys} from './typeHelpers';

const spacingProperties = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  marginHorizontal: true,
  marginVertical: true,
  marginStart: true,
  marginEnd: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingHorizontal: true,
  paddingVertical: true,
  paddingStart: true,
  paddingEnd: true,
  columnGap: true,
  rowGap: true,
  gap: true,
};

const spacingPropertiesShorthand = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginStart',
  me: 'marginEnd',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'paddingStart',
  pe: 'paddingEnd',
  g: 'gap',
  rg: 'rowGap',
  cg: 'columnGap',
};

const typographyProperties = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  includeFontPadding: true,
  fontVariant: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  textAlignVertical: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
  verticalAlign: true,
  writingDirection: true,
};

const layoutProperties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
};

const positionProperties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  start: true,
  end: true,
};

const borderProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderStartWidth: true,
  borderEndWidth: true,
  borderWidth: true,
};

const borderRadiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomStartRadius: true,
  borderBottomEndRadius: true,
  borderTopStartRadius: true,
  borderTopEndRadius: true,
};

const borderColorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
  borderStartColor: true,
  borderEndColor: true,
};

const shadowProperties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
};

const textShadowProperties = {
  textShadowOffset: true,
  textShadowRadius: true,
};

export const backgroundColor = createRestyleFunction({
  property: 'backgroundColor',
  themeKey: 'colors',
});

export const backgroundColorShorthand = createRestyleFunction({
  property: 'bg',
  styleProperty: 'backgroundColor',
  themeKey: 'colors',
});

export const color = [
  createRestyleFunction({
    property: 'color',
    themeKey: 'colors',
  }),
  createRestyleFunction({
    property: 'textDecorationColor',
    themeKey: 'colors',
  }),
];

export const opacity = createRestyleFunction({
  property: 'opacity',
});

export const visible = createRestyleFunction({
  property: 'visible',
  styleProperty: 'display',
  transform: ({value}) => (value === false ? 'none' : 'flex'),
});

export const spacing = getKeys(spacingProperties).map(property => {
  return createRestyleFunction({
    property,
    themeKey: 'spacing',
  });
});

export const spacingShorthand = getKeys(spacingPropertiesShorthand).map(
  property => {
    const styleProperty = spacingPropertiesShorthand[
      property
    ] as RNStyleProperty;

    return createRestyleFunction({
      property,
      styleProperty,
      themeKey: 'spacing',
    });
  },
);

export const typography = getKeys(typographyProperties).map(property => {
  return createRestyleFunction({
    property,
  });
});

export const layout = getKeys(layoutProperties).map(property => {
  return createRestyleFunction({
    property,
  });
});

export const position = [
  ...getKeys(positionProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'zIndex',
    themeKey: 'zIndices',
  }),
  createRestyleFunction({
    property: 'inset',
    expand: true,
    transform({value}) {
      if (value === undefined) {
        return undefined;
      }
      if (!Array.isArray(value)) {
        return {
          top: value,
          right: value,
          bottom: value,
          left: value,
        };
      }
      let [top, right, bottom, left] = value;
      if (value.length < 2) {
        right = bottom = left = top;
      } else {
        if (value.length < 3) {
          bottom = top;
        }
        if (value.length < 4) {
          left = right;
        }
      }
      return {
        top,
        right,
        bottom,
        left,
      };
    },
  }),
];

export const border = [
  ...getKeys(borderProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  ...getKeys(borderColorProperties).map(property => {
    return createRestyleFunction({
      property,
      themeKey: 'colors',
    });
  }),
  ...getKeys(borderRadiusProperties).map(property => {
    return createRestyleFunction({
      property,
      themeKey: 'borderRadii',
    });
  }),
  createRestyleFunction({
    property: 'borderCurve',
  }),
];

export const shadow = [
  ...getKeys(shadowProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'shadowColor',
    themeKey: 'colors',
  }),
];

export const textShadow = [
  ...getKeys(textShadowProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'textShadowColor',
    themeKey: 'colors',
  }),
];

export const all = [
  color,
  opacity,
  backgroundColor,
  backgroundColorShorthand,
  ...spacing,
  ...spacingShorthand,
  ...typography,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...textShadow,
];

type ThemeKey<
  Theme extends BaseTheme,
  K extends keyof BaseTheme,
> = K extends keyof Theme ? keyof Theme[K] : never;

export type HexColor = `#${string}`;
export type RgbColor = `rgb(${string})`;
export type RgbaColor = `rgba(${string})`;
export type HslColor = `hsl(${string})`;
export type HslaColor = `hsla(${string})`;

export type ResponsiveColor<Theme extends BaseTheme> = ResponsiveValue<
  | ThemeKey<Theme, 'colors'>
  | HexColor
  | RgbColor
  | RgbaColor
  | HslColor
  | HslaColor,
  Theme['breakpoints']
>;

export interface ColorProps<Theme extends BaseTheme> {
  color?: ResponsiveColor<Theme>;
  textDecorationColor?: ResponsiveColor<Theme>;
}

export interface OpacityProps<Theme extends BaseTheme> {
  opacity?: ResponsiveValue<number, Theme['breakpoints']>;
}

export interface VisibleProps<Theme extends BaseTheme> {
  visible?: ResponsiveValue<boolean, Theme['breakpoints']>;
}

export interface BackgroundColorProps<Theme extends BaseTheme> {
  backgroundColor?: ResponsiveColor<Theme>;
}

export interface BackgroundColorShorthandProps<Theme extends BaseTheme> {
  bg?: ResponsiveColor<Theme>;
}

export type SpacingProps<Theme extends BaseTheme> = {
  [Key in keyof typeof spacingProperties]?: ResponsiveValue<
    ThemeKey<Theme, 'spacing'> | number,
    Theme['breakpoints']
  >;
};

export type SpacingShorthandProps<Theme extends BaseTheme> = {
  [Key in keyof typeof spacingPropertiesShorthand]?: ResponsiveValue<
    ThemeKey<Theme, 'spacing'> | number,
    Theme['breakpoints']
  >;
};

export type TypographyProps<Theme extends BaseTheme> = {
  [Key in keyof typeof typographyProperties]?: ResponsiveValue<
    TextStyle[Key],
    Theme['breakpoints']
  >;
};

export type LayoutProps<Theme extends BaseTheme> = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme['breakpoints']
  >;
};

export type PositionProps<Theme extends BaseTheme> = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme['breakpoints']
  >;
} & {
  zIndex?: ResponsiveValue<
    ThemeKey<Theme, 'zIndices'> | number,
    Theme['breakpoints']
  >;
  inset?: ResponsiveValue<
    | DimensionValue
    | [DimensionValue?, DimensionValue?, DimensionValue?, DimensionValue?],
    Theme['breakpoints']
  >;
};

export type BorderProps<Theme extends BaseTheme> = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme['breakpoints']
  >;
} & {
  [Key in keyof typeof borderColorProperties]?: ResponsiveColor<Theme>;
} & {
  [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
    ThemeKey<Theme, 'borderRadii'> | number,
    Theme['breakpoints']
  >;
} & {
  /**
   * On iOS 13+, it is possible to change the corner curve of borders.
   * @platform ios
   */
  borderCurve?: ResponsiveValue<ViewStyle['borderCurve'], Theme['breakpoints']>;
};

export type ShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme['breakpoints']
  >;
} & {
  shadowColor?: ResponsiveColor<Theme>;
};

export type TextShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<
    TextStyle[Key],
    Theme['breakpoints']
  >;
} & {
  textShadowColor?: ResponsiveColor<Theme>;
};

export type AllProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  OpacityProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  TextShadowProps<Theme>;
