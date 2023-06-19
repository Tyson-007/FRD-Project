/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as eva from '@eva-design/eva';
import {Button, Layout, ApplicationProvider} from '@ui-kitten/components';
import GameInfo from '../../pages/gameInfoModule';

export default function ConAppScreen() {
  const HotArr = [
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/splatoon3.png')}
        />
      ),
      name: '斯普拉遁 3',
      date: '2022年9月9日',
      status: '現貨發售中',
    },
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/Kirby.jpg')}
        />
      ),
      name: '星之卡比 探索發現',
      date: '2022年3月25日',
      status: '現貨發售中',
    },
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/arceus.jpg')}
        />
      ),
      name: '寶可夢傳說 阿爾宙斯',
      date: '2022年1月28日',
      status: '現貨發售中',
    },
  ];
  const ComingArr = [
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/pikmin4.jpg')}
        />
      ),
      name: '皮克敏 4',
      date: '2023年7月21日',
      status: '預購進行中',
    },
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/island.jpg')}
        />
      ),
      name: '迪士尼奇幻島：米奇與好朋友大冒險',
      date: '2023年7月28日',
      status: '預購進行中',
    },
    {
      image: (
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
          source={require('../../../../assets/images/zelda.jpg')}
        />
      ),
      name: '薩爾達傳說 王國之淚',
      date: '2023年5月12日',
      status: '預購進行中',
    },
  ];
  const [select, setSelect] = useState('熱門遊戲');
  const [list, setList] = useState(HotArr);

  const isSelect = (button: string) => {
    if (button === '熱門遊戲') {
      setList(HotArr);
      setSelect('熱門遊戲');
    } else if (button === '即將發行') {
      setList(ComingArr);
      setSelect('即將發行');
    }
    return [list, select];
  };

  const findSwitchGames = async () => {
    try {
      const process = await fetch(
        `http://192.168.160.142:3000/public/filter/platform/?platformId=${1}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await process.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <ApplicationProvider {...eva} theme={eva.light}>
        <View style={consumerPageStyle.container}>
          <View>
            <SliderSVG />
          </View>

          <View style={platformStyle.container}>
            {/* <Text style={smallWordsStyle.container}>Consumer App Screen</Text> */}

            <View style={switchStyle.container}>
              <SwitchSVG
                style={{
                  position: 'relative',
                  left: 3,
                  bottom: 2,
                }}
              />
              <Text style={smallWordsStyle.container}>SWITCH</Text>
            </View>
            <View style={playStationStyle.container}>
              <PlayStationSVG
                style={{
                  position: 'relative',
                  left: 16,
                  bottom: 2,
                }}
              />
              <Text style={smallWordsStyle.container}>PLAYSTATION</Text>
            </View>
            <View style={xboxStyle.container}>
              <XboxSVG
                style={{
                  position: 'relative',
                  right: 1,
                  bottom: 2,
                }}
              />
              <Text style={smallWordsStyle.container}>XBOX</Text>
            </View>
          </View>
          <GameTypeSlider />
          <View style={{marginLeft: 5}}>
            <FontAwesome5 name={'chevron-right'} size={25} color={'#E4E4E4'} />
          </View>
        </View>
        <View style={styles.tabButtonBox}>
          <TouchableOpacity
            style={
              select === '熱門遊戲'
                ? styles.tabButtonTrue
                : styles.tabButtonFalse
            }
            onPress={() => {
              isSelect('熱門遊戲');
            }}>
            <Text style={{width: 80, fontSize: 20, color: '#E4E4E4'}}>
              熱門遊戲
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              select === '即將發行'
                ? styles.tabButtonTrue
                : styles.tabButtonFalse
            }
            onPress={() => {
              isSelect('即將發行');
            }}>
            <Text style={{width: 80, fontSize: 20, color: '#E4E4E4'}}>
              即將發行
            </Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center', width: 40}}>
            <Text style={{width: 80, fontSize: 20}} />
          </View>
        </View>
        <View style={{width: 350, marginBottom: 100}}>
          {list.map(items => (
            <HomeItemCard
              name={items.name}
              image={items.image}
              date={items.date}
              status={items.status}
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTypeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 330,
  },
  tabButtonBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 350,
  },
  tabButtonTrue: {
    alignItems: 'center',
    width: 40,
    borderBottomWidth: 3,
    borderColor: '#7A04EB',
  },
  tabButtonFalse: {
    alignItems: 'center',
    width: 40,
    borderBottomWidth: 3,
    borderColor: '#2A2E32',
  },
  SwitchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 101,
    height: 55,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF2A6D',
  },
  PlayStatButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 101,
    height: 55,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#05D9E8',
  },
  XboxButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 101,
    height: 55,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#65DC98',
  },
});
