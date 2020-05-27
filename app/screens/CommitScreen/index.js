import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import CommitCard from './CommitCard';
import {Button, Spinner} from '../../uikit/index';
import {getCommit} from '../../redux/actions/commit';
import {AsyncStorage, ScrollView, StyleSheet, View} from 'react-native';
import {ITEMS_CENTER} from '../../configs/style';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  separator: {width: 20},
  logoutButtonStyle: {
    ...ITEMS_CENTER,
    width: '100%',
    height: 40,
  },
});
export class Commit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  // Render List of the Commit in Repo
  commitDataList = () => {
    const {commitList} = this.props;
    return commitList.data.map((data, index) => {
      // Proccess data that will be used
      const commitData = {
        message: data.commit.message,
        date: moment(data.commit.committer.date, 'YYYYMMDD').fromNow(),
        authorAvatar:
          data.author && data.author.avatar_url ? data.author.avatar_url : null,
        authorName: data.author && data.author.login ? data.author.login : null,
        commiterAvatar: data.committer.avatar_url,
        commiterName: data.committer.login,
        index,
      };
      return <CommitCard props={commitData} />;
    });
  };

  // Pagination go to newer commit
  newerCommit = async () => {
    const {getRepoCommitList, route} = this.props;
    const {page} = this.state;
    await getRepoCommitList(route.params.repo, page - 1);
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  };

  // Pagination go to older commit
  olderCommit = async () => {
    const {getRepoCommitList, route} = this.props;
    const {page} = this.state;
    await getRepoCommitList(route.params.repo, page + 1);
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  // Logout clear local storage and bavugate to LoginScreen
  logOut = async () => {
    const {navigation} = this.props;
    await AsyncStorage.removeItem('loginData');
    global.basicAuth = null;
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  render() {
    const {page} = this.state;
    const {commitList} = this.props;
    if (commitList.isFetching) {
      return (
        <View style={{...ITEMS_CENTER, flex: 1}}>
          <Spinner />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <Button
            title="logout"
            onPress={this.logOut}
            style={styles.logoutButtonStyle}
          />
          {this.commitDataList()}
          <View style={styles.buttonContainer}>
            <Button
              disabled={page <= 1 || commitList.isFetching}
              title="Newer"
              onPress={this.newerCommit}
            />
            <View style={styles.separator} />
            <Button
              disabled={commitList.isFetching || commitList.data.length < 30}
              title="Older"
              onPress={this.olderCommit}
            />
          </View>
        </ScrollView>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
