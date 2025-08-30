import React from 'react';
import {View} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme, RestyleFunctionContainer} from './types';
import {
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  layout,
  spacing,
  border,
  boxShadow,
  position,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  BoxShadowProps,
  PositionProps,
  visible,
  VisibleProps,
  SpacingShorthandProps,
  BackgroundColorShorthandProps,
  spacingShorthand,
  transform,
  TransformProps,
} from './restyleFunctions';

type BaseBoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TransformProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  BoxShadowProps<Theme> &
  PositionProps<Theme>;

export type BoxProps<
  Theme extends BaseTheme,
  EnableShorthand extends boolean = true,
> = BaseBoxProps<Theme> & EnableShorthand extends true
  ? BaseBoxProps<Theme> &
      SpacingShorthandProps<Theme> &
      BackgroundColorShorthandProps<Theme>
  : BaseBoxProps<Theme>;

export const boxRestyleFunctions = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  transform,
  layout,
  spacing,
  spacingShorthand,
  border,
  boxShadow,
  position,
];

const createBox = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof View> & {children?: React.ReactNode},
  Ref = View,
  EnableShorthand extends boolean = true,
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createRestyleComponent<
    BoxProps<Theme, EnableShorthand> &
      Omit<Props, keyof BoxProps<Theme, EnableShorthand>>,
    Theme,
    Ref
  >(
    boxRestyleFunctions as RestyleFunctionContainer<
      BoxProps<Theme, EnableShorthand>,
      Theme
    >[],
    BaseComponent,
  );
};

export default createBox;
