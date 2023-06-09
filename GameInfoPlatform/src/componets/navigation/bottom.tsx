import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components';
const {Navigator, Screen} = createBottomTabNavigator();

const AppScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1"></Text>
  </Layout>
);

const ProductListScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1"></Text>
  </Layout>
);
const QRcodeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1"></Text>
  </Layout>
);
const ProductUploadScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1"></Text>
  </Layout>
);


const TabNavigator = () => (
  <Navigator>
    <Screen name="應用探索" component={AppScreen} />
    <Screen name="商品一覽" component={ProductListScreen} />
    <Screen name="QRcode" component={QRcodeScreen} />
    <Screen name="商品上架" component={ProductUploadScreen} />
    <Screen name="帳號設定" component={AccScreen} />
  </Navigator>
);
