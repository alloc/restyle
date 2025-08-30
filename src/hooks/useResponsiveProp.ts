import {useWindowDimensions} from 'react-native';

import {ResponsiveBaseTheme, ResponsiveValue} from '../types';
import {
  getThemeValue,
  getValueForScreenSize,
  isResponsiveObjectValue,
} from '../utilities';

import useTheme from './useTheme';

const useResponsiveProp = <Theme extends ResponsiveBaseTheme, TVal>(
  propValue: ResponsiveValue<TVal, Theme['breakpoints']>,
  themeKey?: keyof Theme,
) => {
  const theme = useTheme<Theme>();
  const dimensions = useWindowDimensions();

  let responsiveValue: any = propValue;
  if (isResponsiveObjectValue(propValue, theme)) {
    responsiveValue = getValueForScreenSize({
      responsiveValue,
      breakpoints: theme.breakpoints,
      dimensions,
    });
  }

  return themeKey
    ? getThemeValue(responsiveValue, {theme, themeKey})
    : responsiveValue;
};

export default useResponsiveProp;
