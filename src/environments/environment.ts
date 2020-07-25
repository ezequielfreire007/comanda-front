// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url_api: 'http://localhost:8080',
  url_api: 'https://comandautn.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyC7-u68TuEYo5nNAq1V5GxLLhcCw5Ga8yg',
    authDomain: 'comandautn.firebaseapp.com',
    databaseURL: 'https://comandautn.firebaseio.com',
    projectId: 'comandautn',
    storageBucket: 'comandautn.appspot.com',
    messagingSenderId: '1080922447740',
    appId: '1:1080922447740:web:ec8a7082032f537ab30ef9'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
