import {StyleSheet, ViewStyle} from 'react-native';

import {
  RestyleFunctionContainer,
  BaseTheme,
  Dimensions,
  RNStyle,
  RestyleFunction,
} from './types';
import {AllProps} from './restyleFunctions';

const composeRestyleFunctions = <
  Theme extends BaseTheme,
  TProps extends AllProps<Theme>,
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TProps, Theme>
    | RestyleFunctionContainer<TProps, Theme>[]
  )[],
) => {
  const properties: (keyof TProps)[] = [];
  const propertiesMap = {} as {[key in keyof TProps]: true};
  const funcsMap = {} as {
    [key in keyof TProps]: RestyleFunction<TProps, Theme, string>;
  };

  for (const {property, func} of restyleFunctions.flat()) {
    properties.push(property);
    propertiesMap[property] = true;
    funcsMap[property] = func;
  }

  const buildStyle = (
    props: TProps,
    {
      theme,
      dimensions,
    }: {
      theme: Theme;
      dimensions: Dimensions | null;
    },
  ): RNStyle => {
    const styles: any = {};
    const options = {theme, dimensions};

    // We make the assumption that the props object won't have extra prototype keys.
    // eslint-disable-next-line guard-for-in
    for (const key in props) {
      const mappedProps = funcsMap[key](props, options);
      // eslint-disable-next-line guard-for-in
      for (const mappedKey in mappedProps) {
        styles[mappedKey] = mappedProps[mappedKey];
      }
    }

    const {stylesheet} = StyleSheet.create({
      stylesheet: styles as ViewStyle,
    });
    return stylesheet;
  };

  return {
    buildStyle,
    properties,
    propertiesMap,
  };
};

export default composeRestyleFunctions;
