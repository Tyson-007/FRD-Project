/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StackParamList} from './StackParamList';

import ConAppScreen from '../../consumer/navigation/tab/consumer/conAppScreen';
import AdminContactScreen from '../screens/PublicAdminContactScreen';
import LogIn from '../screens/LogIn';
import ConRegister from '../screens/ConRegister';
import MerRegister from '../screens/MerRegister';

import SearchModal from '../../merchant/modals/MerchantSearchModal';

import Icon from 'react-native-vector-icons/FontAwesome5';
const Stack = createNativeStackNavigator();

const PublicScreenNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublicHome"
        component={ConAppScreen}
        options={{
          headerTitle: 'ENTITÀBASE',
          headerRight: () => <SearchModal />,
          headerStyle: styles.topBarBackground,
          headerTitleStyle: styles.topBarText,
        }}
      />
      <Stack.Screen
        name="PublicAdmin"
        component={AdminContactScreen}
        options={{
          headerBackVisible: false,
          headerTitle: 'CONTACT ADMIN',
          headerRight: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name={'arrow-left'} size={30} color={'#E4E4E4'} />
            </TouchableOpacity>
          ),
          headerStyle: styles.topBarBackground,
          headerTitleStyle: styles.topBarText,
        }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          headerBackVisible: false,
          headerTitle: 'LOG IN',
          headerRight: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name={'arrow-left'} size={30} color={'#E4E4E4'} />
            </TouchableOpacity>
          ),
          headerStyle: styles.topBarBackground,
          headerTitleStyle: styles.topBarText,
        }}
      />
      <Stack.Screen
        name="ConsumerRegis"
        component={ConRegister}
        options={{
          headerBackVisible: false,
          headerTitle: 'REGISTRATION',
          headerRight: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name={'arrow-left'} size={30} color={'#E4E4E4'} />
            </TouchableOpacity>
          ),
          headerStyle: styles.topBarBackground,
          headerTitleStyle: styles.topBarText,
        }}
      />
      <Stack.Screen
        name="MerchantRegis"
        component={MerRegister}
        options={{
          headerBackVisible: false,
          headerTitle: 'REGISTRATION',
          headerRight: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name={'arrow-left'} size={30} color={'#E4E4E4'} />
            </TouchableOpacity>
          ),
          headerStyle: styles.topBarBackground,
          headerTitleStyle: styles.topBarText,
        }}
      />
    </Stack.Navigator>
  );
};

export default PublicScreenNavigator;

const styles = StyleSheet.create({
  topBarBackground: {
    backgroundColor: '#202124',
  },
  topBarText: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'BrunoAceSC-Regular',
  },
});