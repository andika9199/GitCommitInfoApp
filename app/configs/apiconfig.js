import base64 from 'react-native-base64';
import {AsyncStorage} from 'react-native';
const API_GITHUB = 'https://api.github.com/';
const API_LOGIN_GITHUB = API_GITHUB + 'user';
const API_OTHER_REPO = API_GITHUB + 'repos/';

export async function getToken() {
  try {
    let userData = await AsyncStorage.getItem('loginData');
    let data = await JSON.parse(userData);
    return data;
  } catch (error) {
    return null;
  }
}

export async function loginGit(payload) {
  // for authentication api in Github need basicAuth (username:password)
  const encodedData = payload.isLogedIn
    ? payload.isLogedIn
    : `Basic ${base64.encode(`${payload.username}:${payload.password}`)}`;
  const headers = {
    Authorization: encodedData,
  };
  const options = {
    method: 'GET',
    headers,
  };
  try {
    let response = await fetch(API_LOGIN_GITHUB, options);
    let data = await response.json();
    await AsyncStorage.setItem('loginData', JSON.stringify(encodedData));
    // using this to easily called it when needed
    global.basicAuth = encodedData;
    return data;
  } catch (error) {
    return 'error';
  }
}

export async function searchRepo(payload) {
  const route =
    API_OTHER_REPO +
    payload.keyword +
    '/commits' +
    `?per_page=30&page=${payload.page}`;

  try {
    const headers = {
      Authorization: global.basicAuth,
    };
    const options = {
      method: 'GET',
      headers,
    };
    let response = await fetch(route, options);
    let data = await response.json();
    return data;
  } catch (error) {
    return 'error';
  }
}
