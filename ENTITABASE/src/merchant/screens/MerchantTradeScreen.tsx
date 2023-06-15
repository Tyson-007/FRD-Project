/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

import TradeRecordModal from '../modals/MerchantTradeRecordModal';

import ForeheadView from '../../objects/MerchantForeheadView';
import PageView from '../../objects/PageView';

export default function TradeScreen({}) {
  return (
    <ScrollView
      style={{
        backgroundColor: '#2A2E32',
      }}>
      <SafeAreaView style={styles.safeArea}>
        {ForeheadView()}
        <View style={styles.pageTitle}>
          <Text style={{fontSize: 20}}>過往交易</Text>
          <View style={styles.pageTitleLine} />
        </View>
        <View style={{width: 350}}>
          <TradeRecordModal />
          <TradeRecordModal />
          <TradeRecordModal />
          <TradeRecordModal />
          <TradeRecordModal />
        </View>
        {PageView()}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    paddingLeft: 10,
    width: 350,
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
});