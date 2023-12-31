/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccScreenSVG from '../../../../assets/AccScreenSVG';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TopNavigation} from '../../topBar';
import {GameSearchScreen} from '../../pages/searchScreen';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AppScreenSVG from '../../../../assets/AppscreenSVG';
import ConsumerQRcodeSVG from '../../../../assets/consumerSVG/ConsumerAppScreenSVG';
import ConsumerHeart from '../../../../assets/consumerSVG/ConsumerHeartSVG';
import ConsumerCartSVG from '../../../../assets/consumerSVG/ConsumerCartSVG';
import ConsumerCartScreen from './conCartScreen';

//style sheet
import {bottomBarStyles} from '../../../../assets/styleSheets/BottomBarStyleSheet';
import ConAppScreen from './conAppScreen';
import ConWishListScreen from './conWishListScreen';
import ConQRCodeScreen from './conQRCodeScreen';
import {Button} from '@ui-kitten/components';
import LogIn from './LogIn';
import ConAdminContact from './ConAdminContact';
import ConGameInfoScreen from './conGameInfoScreen';
import ConOrderRecord from './ConOrderRecord';
import ReverseHeader from '../../ReverseHeader';
import ConPasswordEditScreen from './ConPasswordEditScreen';
import ConProfileEditScreen from './ConProfileEditScreen';
import ConMerInfoScreen from './ConMerInfoScreen';
import ConRegister from './ConRegister';
import MerRegister from './MerRegister';

//

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PopUPButton = () => {
  return (
    <View style={bottomBarStyles.container}>
      <ConsumerQRcodeSVG
        width="60"
        height="60"
        fill="#E4E4E4"
        style={{top: -45}}
      />
    </View>
  );
};

// 包住BottomTabBar and TopNavigation，做search轉頁
const ConsumerAppTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        header: props => <TopNavigation {...props} />,
      }}>
      <Stack.Screen name="Tabs" component={BottomTabBar} />
      <Stack.Screen
        name="Search"
        component={GameSearchScreen}
        options={({}) => ({
          header: () => ReverseHeader('搜尋'),
        })}
      />
      <Stack.Screen
        name="ConAdminContact"
        component={ConAdminContact}
        options={({}) => ({
          header: () => ReverseHeader('聯絡客服'),
        })}
      />
      <Stack.Screen
        name="ConPasswordEditScreen"
        component={ConPasswordEditScreen}
        options={({}) => ({
          header: () => ReverseHeader('修改密碼'),
        })}
      />
      <Stack.Screen
        name="ConProfileEditScreen"
        component={ConProfileEditScreen}
        options={({}) => ({
          header: () => ReverseHeader('修改資料'),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={({}) => ({
          header: () => ReverseHeader('登入'),
        })}
      />
      <Stack.Screen
        name="ConOrderRecord"
        component={ConOrderRecord}
        options={({}) => ({
          header: () => ReverseHeader('訂單記錄'),
        })}
      />
      <Stack.Screen
        name="GameInfo"
        component={ConGameInfoScreen}
        options={({}) => ({
          header: () => ReverseHeader('遊戲資訊'),
        })}
      />
      <Stack.Screen
        name="MerInfo"
        component={ConMerInfoScreen}
        options={({}) => ({
          header: () => ReverseHeader('商戶資料'),
        })}
      />
      <Stack.Screen
        name="ConRes"
        component={ConRegister}
        options={({}) => ({
          header: () => ReverseHeader('ConRes'),
        })}
      />
      <Stack.Screen
        name="MerRes"
        component={MerRegister}
        options={({}) => ({
          header: () => ReverseHeader('MerRes'),
        })}
      />
    </Stack.Navigator>
  );
};

export const BottomTabBar = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [LoginStatus, setLoginStatus] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View
            style={{
              margin: 20,
              width: '30%',
              height: 5,
              borderRadius: 5,
              backgroundColor: 'white',
              alignSelf: 'center',
              borderWidth: 0,
            }}
          />

          <Button
            style={styles.text}
            status="primary"
            size="giant"
            accessoryLeft={<AntDesign name="edit" size={25} color="#E4E4E4" />}
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('ConProfileEditScreen');
            }}>
            修改用戶資料
          </Button>
          <Button
            style={styles.text}
            status="primary"
            size="giant"
            accessoryLeft={<Feather name="lock" size={25} color="#e4e4e4" />}
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('ConPasswordEditScreen');
            }}>
            更改密碼
          </Button>
          <Button
            style={styles.text}
            status="primary"
            size="giant"
            accessoryLeft={
              <FontAwesome5
                name="file-invoice-dollar"
                size={20}
                color="#e4e4e4"
              />
            }
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('ConOrderRecord');
            }}>
            訂單記錄
          </Button>
          <Button
            style={styles.text}
            status="primary"
            size="giant"
            accessoryLeft={
              <FontAwesome5 name="headphones-alt" size={25} color="#e4e4e4" />
            }
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('ConAdminContact');
            }}>
            聯絡網站管理員
          </Button>
          <Button
            style={styles.text}
            status="primary"
            size="giant"
            accessoryLeft={<Entypo name="login" size={25} color="#e4e4e4" />}
            onPress={() => {
              setIsModalVisible(false);
              setLoginStatus(false);
              navigation.navigate('Tabs');
            }}>
            登出
          </Button>
        </View>
      </Modal>

      <Tab.Navigator
        screenOptions={({}) => ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingTop: 5,
            backgroundColor: 'black',
          },
        })}>
        <Tab.Screen
          name="應用探索"
          component={ConAppScreen}
          options={() => ({
            tabBarLabelStyle: {
              color: '#E4E4E4',
            },
            tabBarIcon: ({}) => {
              return <AppScreenSVG width="60%" height="60%" fill="#E4E4E4" />;
            },
          })}
        />
        <Tab.Screen
          name="願望清單"
          component={ConWishListScreen}
          options={() => ({
            tabBarLabelStyle: {
              color: '#E4E4E4',
            },
            tabBarIcon: ({}) => {
              return <ConsumerHeart width="70%" height="70%" fill="#E4E4E4" />;
            },
          })}
        />
        {/* try */}
        <Tab.Screen
          name="qrCodeScreen"
          component={ConQRCodeScreen}
          options={() => ({
            tabBarLabelStyle: {
              display: 'none',
            },
            tabBarButton: ({onPress}: any) => (
              <TouchableOpacity
                onPress={onPress}
                style={{
                  alignItems: 'center',
                  top: -25,
                  width: 100,
                }}>
                <PopUPButton />
              </TouchableOpacity>
            ),
          })}
        />

        <Tab.Screen
          name="購物車"
          component={ConsumerCartScreen}
          options={() => ({
            tabBarLabelStyle: {
              color: '#E4E4E4',
            },
            tabBarIcon: ({}) => {
              return (
                <ConsumerCartSVG width="60%" height="60%" fill="#E4E4E4" />
              );
            },
          })}
        />
        <Tab.Screen
          name="帳號設定"
          component={ConQRCodeScreen} // <-- ignored
          options={{
            tabBarLabelStyle: {
              color: '#E4E4E4',
            },
            tabBarIcon: ({}) => {
              return <AccScreenSVG width="60%" height="60%" fill="#E4E4E4" />;
            },
          }}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              if (LoginStatus === false) {
                navigation.navigate('Login');
                setLoginStatus(true);
              } else {
                setIsModalVisible(true);
              }
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'black',
  },
  text: {
    color: '#e4e4e4',
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default ConsumerAppTabNavigator;
