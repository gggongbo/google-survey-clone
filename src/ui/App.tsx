import React from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {GestureHandlerRootView} from '@lib/react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from '@lib/react-native-safe-area';
import {
  DefaultTheme,
  NavigationContainer as NavigationProvider,
} from '@lib/react-navigation/native';
import {Provider} from '@lib/react-redux';
import {PersistGate} from '@lib/redux-persist/integration/react';
import {ThemeProvider} from '@lib/styled-components';
import {RootNavigator} from '@ui/navigations';
import store, {persistor} from '@ui/store';
import theme, {ColorScheme} from '~/theme';

export default function App() {
  const colorScheme = useColorScheme();
  const {height} = useWindowDimensions();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationProvider
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background:
                theme[colorScheme ?? ColorScheme.LIGHT].color.appBackground,
            },
          }}>
          <SafeAreaProvider>
            <SafeAreaView>
              <ThemeProvider theme={theme[colorScheme ?? ColorScheme.LIGHT]}>
                <GestureHandlerRootView style={{height}}>
                  <View style={styles.container}>
                    <RootNavigator />
                  </View>
                </GestureHandlerRootView>
              </ThemeProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </NavigationProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
