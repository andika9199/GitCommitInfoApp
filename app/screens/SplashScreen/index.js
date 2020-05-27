import React from 'react';
import {connect} from 'react-redux';
import {reqLogin} from '../../redux/actions/login';
import {getToken} from '../../configs/apiconfig';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ITEMS_CENTER, TEXT_BIG} from '../../configs/style';

const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
});

export class SplashScreen extends React.Component {
  async componentDidMount() {
    const {navigation} = this.props;
    let basicAuth = null;

    // Get last basicAuth from last login
    basicAuth = await getToken();
    if (basicAuth) {
      // Basicauth exist and Login
      this.login(basicAuth);
    } else {
      // not exist Login first
      navigation.replace('LoginScreen');
    }
  }

  // Login succes and navigate to HomeScreen
  componentDidUpdate(prevProps) {
    const {login, navigation} = this.props;
    if (prevProps.login.data !== login.data) {
      if (login && login.data) {
        navigation.replace('HomeScreen');
      }
    }
  }

  // Called if basicAuth exist
  login = async (basicAuth) => {
    await this.props.reqLogin('', '', basicAuth);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/gitIcons.png')}
          style={styles.image}
        />
        <Text style={TEXT_BIG}>Monitor commit of the Repo</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    reqLogin: (username, password, isLogedIn) =>
      dispatch(reqLogin({username, password, isLogedIn})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
