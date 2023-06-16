import * as React from 'react';
import * as eva from '@eva-design/eva';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
// import ScreenNavigator from './src/public/navigators/ScreenNavigator';

import ConsumerTabNavigator from './src/consumer/navigation/ConsumerTabNavigator';
import MerchantTabNavigator from './src/merchant/navigators/MerchantTabNavigator';
import PublicTabNavigator from './src/public/navigators/PublicTabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Public" component={PublicTabNavigator} />
          <Stack.Screen name="Consumer" component={ConsumerTabNavigator} />
          <Stack.Screen name="Merchant" component={MerchantTabNavigator} />
          {/* <ScreenNavigator /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
