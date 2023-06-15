/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StackParamList} from '../../public/navigators/StackParamList';

import NavigatorButton from '../../objects/NavigatorButton';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ConsumerSettingModal() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <Pressable
            style={{width: 400, height: 600}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <View style={styles.modalStyle}>
            <View style={styles.modalTopLine} />
            <View
              style={{alignItems: 'flex-start', width: 350, marginBottom: 30}}>
              <TouchableOpacity
                style={styles.modalButtonFor1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ConsumerInfo');
                }}>
                <View style={{alignContent: 'center', width: 40}}>
                  <Icon name={'pencil-alt'} size={25} color={'#E4E4E4'} />
                </View>
                <Text style={{marginLeft: 5, fontSize: 20}}>修改用戶資料</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonFor1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ConsumerPW');
                }}>
                <View style={{alignContent: 'center', width: 40}}>
                  <Icon
                    name={'file-invoice-dollar'}
                    size={25}
                    color={'#E4E4E4'}
                  />
                </View>
                <Text style={{marginLeft: 5, fontSize: 20}}>更改密碼</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonFor1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ConsumerOrder');
                }}>
                <View style={{alignContent: 'center', width: 40}}>
                  <Icon name={'lock'} size={25} color={'#E4E4E4'} />
                </View>
                <Text style={{marginLeft: 5, fontSize: 20}}>訂單記錄</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonFor1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ConsumerAdmin');
                }}>
                <View style={{alignContent: 'center', width: 40}}>
                  <Icon name={'headphones'} size={25} color={'#E4E4E4'} />
                </View>
                <Text style={{marginLeft: 5, fontSize: 20}}>
                  聯絡網站管理員
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonFor1}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Public');
                }}>
                <View style={{alignContent: 'center', width: 40}}>
                  <Icon name={'sign-out-alt'} size={25} color={'#E4E4E4'} />
                </View>
                <Text style={{marginLeft: 5, fontSize: 20}}>登出</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <NavigatorButton icon="cog" name="帳號設定" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#rgba(0,0,0,0.8)',
  },
  modalStyle: {
    backgroundColor: '#2A2E32',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 2,
    borderColor: '#ffffff',
    width: 390,
    paddingHorizontal: 20,
  },
  modalTopLine: {
    margin: 10,
    width: 100,
    height: 5,
    backgroundColor: '#B7C1DE',
    borderRadius: 5,
  },
  modalButtonFor1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});