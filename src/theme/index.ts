import * as colors from './colors';

export const enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}
export type Color<T extends ColorScheme> = Recursive<(typeof colors)[T]>;

export type Theme<T extends ColorScheme> = {
  color: Color<T>;
};

const themeWithColorScheme: Record<ColorScheme, Theme<ColorScheme>> = {
  light: {color: colors.light},
  dark: {color: colors.dark},
};

export default themeWithColorScheme;
