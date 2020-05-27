import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, TextField} from '../../uikit/index';
import {ITEMS_CENTER, TEXT_BIG} from '../../configs/style';
const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
  },
  textFieldContainer: {
    width: '100%',
    paddingHorizontal: 64,
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  // SetState for Username
  setUsername = (username) => {
    this.setState({
      username,
    });
  };

  // Navigate to Password Screen and pass USername data
  goToPasswordScreen = () => {
    const {navigation} = this.props;
    const {username} = this.state;
    navigation.navigate('PasswordScreen', {username});
  };

  render() {
    const {username} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/gitIcons.png')}
          style={styles.image}
        />
        <TextField
          useNativeDriver={true}
          label="Your GIT Username"
          containerStyle={styles.textFieldContainer}
          onChangeText={(input) => this.setUsername(input)}
          autoCapitalize="none"
        />
        <Button
          title="Next"
          disabled={username === ''}
          onPress={this.goToPasswordScreen}
        />
      </View>
    );
  }
}
