import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {reqLogin} from '../../redux/actions/login';
import {Button, TextField} from '../../uikit/index';
import {ITEMS_CENTER} from '../../configs/style';
import {loginGit} from '../../configs/apiconfig';
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

export class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isLogedin: false,
    };
  }

  setPassword = (password) => {
    this.setState({
      password,
    });
  };

  componentDidUpdate(prevProps) {
    const {login, route, navigation} = this.props;
    if (prevProps.login.data !== login.data) {
      if (login && login.data && login.data.login === route.params.username) {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }
    }
  }

  login = async () => {
    const {route, navigation} = this.props;
    const {password} = this.state;
    await this.props.reqLogin(route.params.username, password);
  };

  render() {
    const {login} = this.props;
    const {password} = this.state;
    return (
      <View style={styles.container}>
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
