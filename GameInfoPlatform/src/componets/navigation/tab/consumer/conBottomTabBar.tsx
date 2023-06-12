/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccScreenSVG from '../../../../assets/AccScreenSVG';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TopNavigation} from '../../topBar';
import {ProfileScreen} from '../../pages/searchScreen';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import ReverseHeader from '../../ReverseHeader';

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
      screenOptions={{
        header: props => <TopNavigation {...props} />,
      }}>
      <Stack.Screen name="Tabs" component={BottomTabBar} />
      <Stack.Screen
        name="Search"
        component={ProfileScreen}
        options={({}) => ({
          header: () => ReverseHeader('Search'),
        })}
      />
    </Stack.Navigator>
  );
};
//

// try下拉上效果
const BottomTabBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
              margin: 8,
              width: '30%',
              height: 5,
              borderRadius: 5,
              backgroundColor: '#e4e4e4',
              alignSelf: 'center',
              borderWidth: 0,
            }}
          />

          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={<AntDesign name="edit" size={20} color="#E4E4E4" />}>
            修改用戶資料
          </Button>
          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={<Feather name="lock" size={20} color="#e4e4e4" />}>
            更改密碼
          </Button>
          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={
              <FontAwesome5
                name="file-invoice-dollar"
                size={20}
                color="#e4e4e4"
              />
            }>
            訂單記錄
          </Button>
          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={
              <Octicons name="comment-discussion" size={20} color="#e4e4e4" />
            }>
            我的評論
          </Button>
          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={
              <FontAwesome5 name="headphones-alt" size={20} color="#e4e4e4" />
            }>
            聯絡網站管理員
          </Button>
          <Button
            style={styles.text}
            appearance="fill"
            accessoryLeft={<Entypo name="login" size={20} color="#e4e4e4" />}>
            登出
          </Button>
        </View>
      </Modal>
      <Tab.Navigator
        screenOptions={({}) => ({
          headerShown: false,
          tabBarStyle: {
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
        <Tab.Screen
          name="qrCodeScreen"
          component={ConQRCodeScreen}
          options={() => ({
            tabBarLabelStyle: {
              display: 'none',
            },
            tabBarButton: () => <PopUPButton />,
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
              setIsModalVisible(true);
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

//

// const BottomTabBar = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: 'black',
//         },
//       })}>
//       <Tab.Screen
//         name="應用探索"
//         component={ConAppScreen}
//         options={focused => ({
//           tabBarLabelStyle: {
//             color: '#E4E4E4',
//           },
//           tabBarIcon: ({focused}) => {
//             return <AppScreenSVG width="60%" height="60%" fill="#E4E4E4" />;
//           },
//         })}
//       />
//       <Tab.Screen
//         name="願望清單"
//         component={ConWishListScreen}
//         options={focused => ({
//           tabBarLabelStyle: {
//             color: '#E4E4E4',
//           },
//           tabBarIcon: ({focused}) => {
//             return <ConsumerHeart width="70%" height="70%" fill="#E4E4E4" />;
//           },
//         })}
//       />
//       <Tab.Screen
//         name="qrCodeScreen"
//         component={ConQRCodeScreen}
//         options={focused => ({
//           tabBarLabelStyle: {
//             display: 'none',
//           },
//           tabBarButton: () => <PopUPButton />,
//         })}
//       />
//       <Tab.Screen
//         name="購物車"
//         component={ConsumerCartScreen}
//         options={focused => ({
//           tabBarLabelStyle: {
//             color: '#E4E4E4',
//           },
//           tabBarIcon: ({focused}) => {
//             return <ConsumerCartSVG width="60%" height="60%" fill="#E4E4E4" />;
//           },
//         })}
//       />

//       <Tab.Screen
//         name="帳號設定"
//         component={ConAccScreen}
//         options={focused => ({
//           tabBarLabelStyle: {
//             color: '#E4E4E4',
//           },
//           tabBarIcon: ({focused}) => {
//             return <AccScreenSVG width="60%" height="60%" fill="#E4E4E4" />;
//           },
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

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
    height: '80%',
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
