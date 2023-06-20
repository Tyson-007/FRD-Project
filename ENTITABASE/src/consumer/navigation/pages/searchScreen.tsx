/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import GameSearchModal from '../../modals/GameSearchModal';
import {
  gameImgStyle,
  gameListAreaStyle,
} from '../tab/consumer/conWishListScreen';
import axios from 'axios';
export const GameSearchScreen = ({route, navigation}: any) => {
  const {tagArr, platformArr, text, highest, newest} = route.params;
  const [texts, onChangeText] = React.useState(text);
  const form = {tagArr, platformArr, text, highest, newest};
  console.log(tagArr, platformArr, texts, highest, newest);

  return (
    <ScrollView style={{backgroundColor: '#202124', height: 600}}>
      <View>
        <View style={pageTitle.container}>
          <Text style={{fontSize: 20, color: 'white'}}>遊戲搜尋</Text>
          <View
            style={{
              position: 'absolute',
              bottom: -5,
              left: 60,
              width: 100,
              borderBottomWidth: 3,
              borderColor: '#7A04EB',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#B7C1DE',
            borderWidth: 2,
            marginLeft: 32,
            width: 350,
            borderRadius: 5,
            marginTop: 10,
            height: 40,
          }}>
          <TextInput
            onChangeText={(nextValue: React.SetStateAction<string>) =>
              onChangeText(nextValue)
            }
            value={Texting}
            style={{width: 310, color: '#e4e4e4'}}
          />

          <FontAwesome5
            name={'search'}
            size={25}
            color={'#E4E4E4'}
            style={{marginTop: 3}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const pageTitle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 30,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderColor: '#7D7D7D',
  },
});
