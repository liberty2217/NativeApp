# Native App

React-native cli application to add places in your list, following included:

  - access to camera to take a photo;
  - access to user's geolocation to get current place;
  - access to map (mapView) for ios (Apple Maps) and android (Google Maps);
    - selecting place on map;
  - saving each place using SQlite3 for react-native;

<img width="455" alt="iDB 2022-01-16 at 10 05 56 PM" src="https://user-images.githubusercontent.com/71078231/149674198-62365567-8459-414a-b7ed-7e3858701581.png">
<img width="603" alt="iDB 2022-01-16 at 10 07 40 PM" src="https://user-images.githubusercontent.com/71078231/149674254-508f5bc2-73a2-4452-a7af-1e875ae70b92.png">

Please note: 
  - for getting and transforming geolcation Google API key was used. For example to convert longitude and latitude in real address. Now the API key expired (new payment is required)
  - it is recommended to launch the app on real device since emualators have limitations (e.g. impossible to open camera on Xcode emulator or get proper user location on Android emulator)


## Installation

Use yarn on npm package manager to install dependencies.

```bash
yarn install
```
or

```bash
npm install
```
Add paid Google API key in env.ts file for sending requests. Add this key also in meta-data of Android Manifeset 

`
   <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="API_KEY_HERE"/>
`
## Emulator launching

For Android after package installation run:

```bash
react-native run-android
```

For IOS device Pods needs to be installed first. From the root directory open ios folder and run the following:

```bash
cd ios/ && pod install
```

after pods installation run ios from root directory

```bash
react-native run-ios
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
