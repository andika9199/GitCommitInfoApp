## Git Repo Commit Info App (GitRepoApp)

App is built by React Native,
The app can be used for see the commit in Repo (only master branch)

## Core Technologies

    - React Native V0.62.2
    - State management with Redux + saga
    - React navigation 5
    - Unit test with Jest

## How to run or install

- Instal all prerequisites
  https://facebook.github.io/react-native/docs/getting-started.html

- install all dependencies

```ssh
npm install
```

or

```ssh
yarn
```

- links

```ssh
react-native link
```

- pod install (I hope it can run in IOS, due im developing this not on mac)

```ssh
cd ios && pod install
```

- run

```ssh
react-native run-android or react-native run-ios
```

## Test Case

Login

- Open App
- Fill Username, click next
- Fill Password, click Login
- if Success will go to home screen
- if fail will show alert and go back to Login Screen

auto Login

- After successfully login close the app
- open it again it will direct user to Home Screen

Search Repo

- After successfully login
- input repo with the git user, ex: facebook/react-native
- if success will navigate to Commit screen
- if fail will show alert

## Link for The app

https://drive.google.com/file/d/1fC79sjOgjSfP2icOSSMP8fKq0YLmswsa/view?usp=sharing
![](./readme_app1.gif)
![](./readme_app2.gif)
