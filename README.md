This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

Ardhendu readme for Ecotence 
Project Structure & Instructions:-- There is a splash screen then is a login authentication screen, here i have used email & password
third party authentication(firebase email/password auth), here i have just add one email and password for authentication,hence to sign in the app use that to login 
email: suresh@gmail.com
password: 123456
rather than that combination authentication fails , after authentication there is a createUser api call 
apicall : i have no scope for real backend hence i have created postman mock api and get the save response
after api call ther is a home screen, user can check in from here for that please allow all the permission and  allow all time location from setting that will promt for the user and then it will collect and show the location relevant information to the user and from that time i have added a background service that will call every 10 sec and it will collect the location information even the app is in background or the device is locked as it says(trace location when user move near 200 mtr also), and there is securely send that response to the api call
now as postman mock api have no data save just to show i call the mock api and now user go the check in history page and get the loaction related data list from api call again as it is mock api it collects only the save data no real time data
now the loaction tracking only get off when user only logout of the app , here we stop collecting location background task and logout from authentication provider and also locally and user get back to the login screen as usual.

Dependencise: -- There is react-native-firebase/app & /auth for authentication
axios for secure server connection
react-native background-geolocation for tarcking background location 
react-native background acction - for background activity
react-native-asyncstorage -for local data save & different navtive navigation library for navigating 


Run:-- after cloning the project using vscode using the url, then go to the project directory and then first hit "npm install" it will install all the required node_modules file for it and then run npx react-native run-android
