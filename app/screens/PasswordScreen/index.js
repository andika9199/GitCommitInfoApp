import React from 'react';
import {connect} from 'react-redux';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {reqLogin} from '../../redux/actions/login';
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
  image: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
});

export class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  // Setstate for Password
  setPassword = (password) => {
    this.setState({
      password,
    });
  };

  componentDidUpdate(prevProps) {
    const {login, route, navigation} = this.props;
    if (prevProps.login.data !== login.data) {
      if (login && login.data && login.data.login === route.params.username) {
        // Login succes navigate to home
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else if (login && login.error) {
        // Login failed show alert, ex: User not found or bad credential, navigate to LoginScreen
        Alert.alert('Info', login.data);
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    }
  }

  // Call the Login Api
  login = async () => {
    const {route} = this.props;
    const {password} = this.state;
    await this.props.reqLogin(route.params.username, password);
  };

  render() {
    const {login} = this.props;
    const {password} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/gitIcons.png')}
          style={styles.image}
        />
        <TextField
          useNativeDriver={true}
          label={'Password'}
          containerStyle={styles.textFieldContainer}
          onChangeText={(input) => this.setPassword(input)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button
          title="Login"
          disabled={password === '' || login.isFetching}
          onPress={this.login}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reqLogin: (username, password, isLogedIn) =>
      dispatch(reqLogin({username, password, isLogedIn})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);
