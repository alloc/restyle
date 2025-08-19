import {BaseTheme, PropValue, StyleTransformFunction} from '../types';

/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export function getThemeValue<
  TVal extends PropValue,
  Theme extends BaseTheme,
  K extends keyof Theme | undefined,
>(
  value: TVal | undefined,
  {
    theme,
    transform,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal>;
    themeKey?: K;
  },
) {
  if (transform) return transform({value, theme, themeKey});
  if (isThemeKey(theme, themeKey)) {
    return value != null && typeof value === 'string'
      ? theme[themeKey][value] || value
      : value;
  }

  return value;
}

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}
