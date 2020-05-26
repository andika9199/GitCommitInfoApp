import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextField} from '../../uikit/index';
import {ITEMS_CENTER} from '../../configs/style';
const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
  },
  textFieldContainer: {
    width: '100%',
    paddingHorizontal: 64,
  },
});

export default class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextField
          useNativeDriver={true}
          label="Password"
          containerStyle={styles.textFieldContainer}
        />
        <Button />
      </View>
    );
  }
}
