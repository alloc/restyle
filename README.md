# @alloc/restyle

`@alloc/restyle` is a fork of `@shopify/restyle` for building **consistent, themeable, type-safe UI** in React Native + TypeScript.

It differs from the original in three key ways:

1. **Optional theme properties** — All properties of `createTheme` (`colors`, `spacing`, etc.) are optional.
2. **Arbitrary values allowed** — You can pass raw values (colors, spacing, etc.) directly to JSX props without declaring them in the theme.
3. **TypeScript ref typing** — Forward refs are properly typed, allowing you to specify the ref type for full type safety with any base component.

---

## 1. Core Concepts

### ThemeProvider

Wrap your app in a `ThemeProvider` to supply a theme:

```tsx
import {ThemeProvider} from '@alloc/restyle';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  );
}
```

### Creating Components

- `createBox<Theme>()` → Base layout component with forward ref support
- `createText<Theme>()` → Text component with typography support and forward ref support

```tsx
import {createBox, createText} from '@alloc/restyle';
import {Theme} from './theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

// Forward refs are automatically supported
const MyComponent = () => {
  const boxRef = useRef();
  const textRef = useRef();

  return (
    <>
      <Box ref={boxRef} padding="m" />
      <Text ref={textRef} variant="body">
        Hello
      </Text>
    </>
  );
};
```

You can also wrap third-party components and specify their ref type:

```tsx
import {createBox} from '@alloc/restyle';
import {FlashList} from '@shopify/flash-list';
import type {FlashListRef} from '@shopify/flash-list';

// Wrap FlashList with restyle props and proper ref typing
const StyledFlashList = createBox<
  Theme,
  React.ComponentProps<typeof FlashList<any>>,
  FlashListRef<any>
>(FlashList);

const MyComponent = () => {
  const flashListRef = useRef<FlashListRef<any>>();

  return (
    <StyledFlashList
      ref={flashListRef}
      padding="m"
      backgroundColor="white"
      data={data}
      renderItem={renderItem}
      estimatedItemSize={50}
    />
  );
};
```

### Defining a Theme

```tsx
import {createTheme} from '@alloc/restyle';

const theme = createTheme({
  colors: {
    mainBackground: '#fff',
    primary: '#007AFF',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  textVariants: {
    header: {fontSize: 32, fontWeight: 'bold'},
    body: {fontSize: 16, lineHeight: 24},
  },
});

export type Theme = typeof theme;
export default theme;
```

✅ With `@alloc/restyle`, **any of these keys can be omitted**, and you may still pass values directly:

```tsx
<Box padding={12} backgroundColor="#f00" />
```

---

## 2. Styling with Props

### Restyle Props

Every Restyle component accepts props like:

- `backgroundColor="primary"`
- `padding="m"`
- `flexDirection="row"`

These props map directly to style objects and can be **responsive**.

### Responsive Values

Use the `breakpoints` key in your theme:

```tsx
const theme = createTheme({
  breakpoints: {phone: 0, tablet: 768},
});

// Usage
return <Box flexDirection={{phone: 'column', tablet: 'row'}} />;
```

Or read responsive values inside components:

```tsx
import {useResponsiveProp} from '@alloc/restyle';
const color = useResponsiveProp({phone: 'red', tablet: 'blue'});
```

---

## 3. Variants

Variants let you define reusable style presets in your theme.

```tsx
const theme = createTheme({
  cardVariants: {
    regular: {padding: 'm', backgroundColor: 'white'},
    elevated: {padding: 'm', shadowOpacity: 0.2, elevation: 4},
  },
});

import {
  createVariant,
  createRestyleComponent,
  VariantProps,
} from '@alloc/restyle';

type Theme = typeof theme;

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

// Usage
return <Card variant="elevated" />;
```

---

## 4. Hooks

### `useTheme`

Access the current theme:

```tsx
import {useTheme} from '@alloc/restyle';

const MyComponent = () => {
  const theme = useTheme<Theme>();
  return <Box backgroundColor={theme.colors.primary} />;
};
```

### `useRestyle`

Compose custom components with multiple Restyle functions:

```tsx
import {useRestyle, spacing, border, backgroundColor} from '@alloc/restyle';

const restyleFns = [spacing, border, backgroundColor];

const Button = props => {
  const restyled = useRestyle(restyleFns, props);
  return <TouchableOpacity {...restyled} />;
};
```

---

## 5. Predefined Functions & Components

### Built-in Restyle Functions

- **Colors**: `backgroundColor`, `color`, `shadowColor`, `textShadowColor`
- **Spacing**: `margin`, `padding`, `gap`
- **Layout**: `width`, `height`, `flex`, `alignItems`, `justifyContent`
- **Border**: `borderWidth`, `borderColor`, `borderRadius`
- **Typography**: `fontSize`, `lineHeight`, `fontWeight`
- **Shadows**: `shadowOpacity`, `elevation`
- **Position**: `position`, `top`, `left`, `zIndex`
- …and more

### Predefined Components

- **Box** → includes `backgroundColor`, `spacing`, `border`, `shadow`, `layout`, etc.
- **Text** → includes `color`, `typography`, `spacing`, `layout`, and supports `textVariants`

Both components automatically forward refs to their underlying React Native components (`View` and `Text` respectively), giving you access to native methods like `measure()`, `focus()`, etc.

---

## 6. Advanced Features

### Custom Restyle Functions

Custom restyle functions allow you to create reusable style transformations:

```tsx
import {createRestyleFunction, createRestyleComponent} from '@alloc/restyle';
import {ViewProps, View} from 'react-native';

const transparency = createRestyleFunction({
  property: 'transparency',
  styleProperty: 'opacity',
  transform: ({value}) => 1 - value,
});

type TransparencyProps = {
  transparency?: number;
};

const TransparentView = createRestyleComponent<
  TransparencyProps & ViewProps,
  Theme
>([transparency]);

// Usage
return <TransparentView transparency={0.3} />;
```

### Overriding Styles

Every Restyle component still accepts a `style` prop for last-layer overrides:

```tsx
<Box padding="m" style={{backgroundColor: '#f0f'}} />
```

### Dark Mode

Swap themes dynamically:

```tsx
<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
  <App />
</ThemeProvider>
```
