/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StackParamList} from '../public/navigators/StackParamList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PublicTabButton() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.errorBackground} />
      <TouchableOpacity
        style={styles.QRCodeBox}
        onPress={() => navigation.navigate('LogIn')}>
        <MaterialCom name={'scan-helper'} size={55} color={'#E4E4E4'} />
        <View style={{position: 'absolute', backgroundColor: '#202124'}}>
          <FontAwesome5 name={'user-alt'} size={35} color={'#4B4B4B'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorBackground: {
    position: 'absolute',
    bottom: 68,
    width: 1000,
    height: 32,
    backgroundColor: '#2A2E32',
  },
  QRCodeBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    width: 80,
    height: 80,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#7A04EB',
  },
});
