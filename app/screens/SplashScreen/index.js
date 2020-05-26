import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ITEMS_CENTER, TEXT_BIG} from '../../configs/style';
const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={TEXT_BIG}>Monitor commit of the Repo</Text>
    </View>
  );
}
