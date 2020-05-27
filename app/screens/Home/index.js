import React from 'react';
import {connect} from 'react-redux';
import {Alert, AsyncStorage, StyleSheet, View} from 'react-native';
import {getCommit} from '../../redux/actions/commit';
import {Button, TextField} from '../../uikit/index';
import {ITEMS_CENTER} from '../../configs/style';
import {searchRepo} from '../../configs/apiconfig';
const styles = StyleSheet.create({
  container: {
    ...ITEMS_CENTER,
    flex: 1,
  },
  textFieldContainer: {
    width: '100%',
    paddingHorizontal: 64,
  },
  logoutButtonStyle: {
    ...ITEMS_CENTER,
    width: '100%',
    height: 40,
  },
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {commitList, route, navigation} = this.props;
    const {keyword} = this.state;
    if (prevProps.commitList.data !== commitList.data) {
      if (commitList && commitList.data && !commitList.error) {
        navigation.navigate('CommitScreen', {repo: keyword});
      } else if (commitList && commitList.data) {
        Alert.alert('Info', commitList.data);
      }
    }
  }

  setKeyword = (keyword) => {
    this.setState({
      keyword,
    });
  };

  search = async () => {
    const {getRepoCommitList} = this.props;
    const {keyword} = this.state;
    await getRepoCommitList(keyword, 1);
  };

  logOut = async () => {
    const {navigation} = this.props;
    await AsyncStorage.removeItem('loginData');
    navigation.replace('LoginScreen');
  };

  render() {
    const {keyword} = this.state;
    const {commitList} = this.props;
    return (
      <View style={{flex: 1}}>
        <Button
          title="logout"
          onPress={this.logOut}
          style={styles.logoutButtonStyle}
        />
        <View style={styles.container}>
          <TextField
            useNativeDriver={true}
            label={'Ex: facebook/react-native'}
            containerStyle={styles.textFieldContainer}
            onChangeText={(input) => this.setKeyword(input)}
            autoCapitalize="none"
          />
          <Button
            title="Search"
            disabled={keyword === '' || commitList.isFetching}
            onPress={this.search}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    commitList: state.commit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRepoCommitList: (keyword, page) => dispatch(getCommit({keyword, page})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
