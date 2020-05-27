import React from 'react';
import {connect} from 'react-redux';
import {reqLogin} from '../../redux/actions/login';
import {getToken} from '../../configs/apiconfig';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {ITEMS_CENTER, TEXT_BIG} from '../../configs/style';
const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
  },
});
export class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginAuth: null,
    };
  }

  setPassword = (password) => {
    this.setState({
      password,
    });
  };

  async componentDidMount() {
    const {navigation} = this.props;
    let basicAuth = null;
    basicAuth = await getToken();
    console.log(basicAuth);
    if (basicAuth) {
      this.login(basicAuth);
    } else {
      navigation.replace('LoginScreen');
    }
  }

  componentDidUpdate(prevProps) {
    const {login, navigation} = this.props;
    if (prevProps.login.data !== login.data) {
      if (login && login.data) {
        navigation.replace('HomeScreen');
      }
    }
  }

  login = async (basicAuth) => {
    await this.props.reqLogin('', '', basicAuth);
  };

  render() {
    return (
      <View style={styles.container}>
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

function mapDispatchToProps(dispatch) {
  return {
    reqLogin: (username, password, isLogedIn) =>
      dispatch(reqLogin({username, password, isLogedIn})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
