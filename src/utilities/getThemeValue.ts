import {BaseTheme, PropValue, StyleTransformFunction} from '../types';

const allowUndefinedThemeValues: Partial<Record<PropertyKey, boolean>> = {
  colors: true,
  spacing: true,
  zIndices: true,
  borderRadii: true,
};

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
  if (transform) {
    return transform({value, theme, themeKey});
  }
  if (value && isThemeKey(theme, themeKey)) {
    const themeValue = theme[themeKey][value as string];
    if (themeValue !== undefined) {
      return themeValue;
    }
    if (!allowUndefinedThemeValues[themeKey])
      throw new Error(
        `Value '${value}' does not exist in theme['${String(themeKey)}']`,
      );
  }
  return value;
}

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}
