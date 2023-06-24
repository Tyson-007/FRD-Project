import * as React from 'react';
import {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useState} from 'react';
import HomeItemCard from '../../../objects/HomeItemCard';

interface info {
  tagArr: Array<string> | string;
  platformArr: Array<string> | string;
  text: string;
  highest: boolean;
  newest: boolean;
}

interface Product {
  id: number;
  platform_id: number;
  product_image: string;
  product_name: string;
  product_status: boolean;
  release_date: string;
  versions: Array<any>;
  view: number;
}

export const GameSearchScreen = ({route, navigation}: any) => {
  const {tagArr, platformArr, text, highest, newest}: info = route.params;
  const [Texts, onChangeTexts] = React.useState(text);
  const [result, setResult] = useState<Product[]>([]);
  //未拆到個array object

  const unique = (arr: Array<any>, track = new Set()) =>
    arr.filter(({id}) => (track.has(id) ? false : track.add(id)));

  //game types search

  //search bar text

  useEffect(() => {
    const tagSearch = async () => {
      let tagArrPush: Array<any> = result.slice();

      if (Array.isArray(tagArr)) {
        for (let i = 0; i < tagArr.length; i++) {
          await fetch(`http://10.0.2.2:3000/public/filter/tag/${tagArr[i]}`)
            .then(response => response.json())
            .then(data => {
              data.map((items: Product) => {
                tagArrPush.push(items);
              });
            });
        }
      }

      if (Array.isArray(platformArr)) {
        for (let i = 0; i < platformArr.length; i++) {
          await fetch(
            `http://10.0.2.2:3000/public/filter/platform/${platformArr[i]}`,
          )
            .then(response => response.json())
            .then(data => {
              console.log(data);
              data[0].products.forEach((items: Product) => {
                tagArrPush.push(items);
              });
            });
        }
      }
      try {
        await fetch(`http://10.0.2.2:3000/public/filter/search/${Texts}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            data.map((items: Product) => {
              tagArrPush.push(items);
            });
          });
      } catch (error) {
        console.log(error);
      }
      console.log(tagArrPush);
      setResult(unique(tagArrPush));
    };
    const clear = async () => {
      console.log('clean');
      setResult([]);
    };

    //   let platformArrPush: Array<any> = Platform.slice();
    //   if (platformArr == undefined) {
    //     console.log(platformArr);
    //     return;
    //   } else if (platformArr) {
    //     if (Array.isArray(platformArr)) {
    //       for (let i = 0; i <= platformArr.length; i++) {
    //         fetch(
    //           `http://10.0.2.2:3000/public/filter/platform/${platformArr[i]}`,
    //         )
    //           .then(response => {
    //             return response.json();
    //           })
    //           .then(data => {
    //             data[0].products.map((items: products) => {
    //               platformArrPush.push(items);
    //               let result = platformArrPush.filter(unique);
    //               console.log(result);
    //               setPlatform(result);
    //             });
    //           })
    //           .then(async () => {
    //             await console.log(Platform);
    //           });
    //       }
    //     } else if (Array.isArray(platformArr) == false) {
    //       console.log('notarray');
    //       fetch(`http://10.0.2.2:3000/public/filter/platform/${platformArr}`)
    //         .then(response => {
    //           return response.json();
    //         })
    //         .then(data => {
    //           data[0].products.map((items: products) => {
    //             platformArrPush.push(items);
    //             let result = platformArrPush.filter(unique);
    //             console.log(result);
    //             setPlatform(result);
    //           });
    //         })
    //         .then(async () => {
    //           await console.log(Platform);
    //         });
    //     }
    //   }
    // };

    // platformSearch();

    clear().finally(() => tagSearch());
    return () => {
      clear();
    };
  }, [Texts]);

  return (
    <ScrollView style={{backgroundColor: 'rgb(40,40,40)'}}>
      <View id="search">
        <View style={styles.pageTitle}>
          <Text style={{fontSize: 20, color: '#E4E4E4'}}>搜尋商品</Text>
          <View style={styles.pageTitleLine} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={styles.modalInput}>
            <TextInput
              style={{fontSize: 20, padding: 0, color: '#E4E4E4'}}
              onChangeText={value => {
                onChangeTexts(value);
                setResult([]);
              }}
              value={Texts}
              placeholder="請輸入關鍵字"
            />
            <Icon name={'search'} size={25} color={'#E4E4E4'} />
          </View>
        </View>
      </View>
      <View id="Result" style={{alignSelf: 'center'}}>
        {result.map((items: Product) => (
          <View style={{width: 350}}>
            <HomeItemCard
              name={items.product_name}
              image={
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 5,
                  }}
                  source={require('../../../assets/images/Pokemon_purple_and_red.jpeg')}
                />
              }
              date={items.release_date}
              status={'pre-order'}
              id={items.id}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
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
    borderWidth: 3,
    borderColor: '#ffffff',
    width: 350,
  },
  pageTitle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderColor: '#7D7D7D',
  },
  pageTitleLine: {
    position: 'absolute',
    bottom: -3,
    left: 60,
    width: 100,
    borderBottomWidth: 3,
    borderColor: '#7A04EB',
  },
  subTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  subTitleText: {width: 80, marginLeft: 10, fontSize: 17, color: '#E4E4E4'},
  modalButtonBox: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
    marginBottom: 10,
    marginHorizontal: 8,
    width: 320,
  },
  modalButtonFor1: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    marginVertical: 15,
    width: 320,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7A04EB',
  },
  modalButtonFor2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 155,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7C1DE',
  },
  modalButtonFor2Select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 155,
    height: 35,
    backgroundColor: '#b57acf',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7C1DE',
  },
  modalButtonFor3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7C1DE',
  },
  modalButtonFor3Select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#b57acf',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7C1DE',
  },
  buttonTextWithIcon: {fontSize: 15, marginLeft: 8, color: '#E4E4E4'},
  modalButtonSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF2A6D',
  },
  modalButtonSwitchSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#FF2A6D',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF2A6D',
  },
  modalButtonPSX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#05D9E8',
  },
  modalButtonPSXSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#05D9E8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#05D9E8',
  },
  modalButtonXBOX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#65DC98',
  },
  modalButtonXBOXSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#65DC98',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#65DC98',
  },
  modalInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 10,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    width: 320,
    height: 45,
    backgroundColor: '#202124',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7C1DE',
  },
});
