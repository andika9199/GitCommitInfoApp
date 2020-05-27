import React from 'react';
import {connect} from 'react-redux';
import {Alert, AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {getCommit} from '../../redux/actions/commit';
import {Button, TextField} from '../../uikit/index';
import {ITEMS_CENTER, TEXT_SMALL, TEXT_BIG} from '../../configs/style';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
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
  titleText: {
    ...TEXT_BIG,
    marginBottom: 8,
  },
  noteContainer: {
    paddingHorizontal: 68,
    marginBottom: 8,
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
    const {commitList, navigation} = this.props;
    const {keyword} = this.state;
    if (prevProps.commitList.data !== commitList.data) {
      if (commitList && commitList.data && !commitList.error) {
        // Navigate when Repo is found
        navigation.navigate('CommitScreen', {repo: keyword});
      } else if (commitList && commitList.data) {
        // Show why it error
        Alert.alert('Info', commitList.data);
      }
    }
  }

  // Set value for keyword
  setKeyword = (keyword) => {
    this.setState({
      keyword,
    });
  };

  // Search Repo API
  search = async () => {
    const {getRepoCommitList} = this.props;
    const {keyword} = this.state;
    await getRepoCommitList(keyword, 1);
  };

  // Clear local storage and navigate to Login
  logOut = async () => {
    const {navigation} = this.props;
    await AsyncStorage.removeItem('loginData');
    global.basicAuth = null;
    navigation.replace('LoginScreen');
  };

  render() {
    const {keyword} = this.state;
    const {commitList} = this.props;
    return (
      <View style={styles.parentContainer}>
        <Button
          title="logout"
          onPress={this.logOut}
          style={styles.logoutButtonStyle}
        />
        <View style={styles.container}>
          <Text style={styles.titleText}>Find Repository</Text>
          <TextField
            useNativeDriver={true}
            label={'Ex: facebook/react-native'}
            containerStyle={styles.textFieldContainer}
            onChangeText={(input) => this.setKeyword(input)}
            autoCapitalize="none"
          />
          <View style={styles.noteContainer}>
            <Text style={TEXT_SMALL}>
              notes: You must include GitUserName/Repo, for now it only show
              commit from master
            </Text>
          </View>
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

export function mapDispatchToProps(dispatch) {
  return {
    getRepoCommitList: (keyword, page) => dispatch(getCommit({keyword, page})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
