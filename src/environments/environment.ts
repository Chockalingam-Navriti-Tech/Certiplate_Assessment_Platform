// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_authentication:
    'https://uap-demo-api.certiplate.com/json/asynconeway/GetCandidateAssessmentAuthenticationRequest',
  URL_datarequest:
    'https://uap-demo-api.certiplate.com/json/asynconeway/GetCandidateAssessmentDataRequest',
  api_key: 'd353dd24-8612-4d56-a6df-e3b2f10b932f',
  Theory_TutorialVideo_URL: 'https://www.w3schools.com/html/mov_bbb.mp4',
  Practical_TutorialVideo_URL: 'https://www.w3schools.com/html/mov_bbb.mp4',
  Question_Image_URL: 'https://uap-demo.certiplate.com/Data/QB/Question/Original/',
  Option_Image_URL:'https://uap-demo.certiplate.com/Data/QB/OptionsImage/Original/',
  Viva_TutorialVideo_URL: 'https://www.w3schools.com/html/mov_bbb.mp4',
  Upload_files_URL:
    'https://uap-demo.certiplate.com/api/UploadCandidateOnlineAssessmentFile.php',
  Submit_Responsedata_URL:
    'https://uap-demo-api.certiplate.com/json/asynconeway/SubmitCandidateAssessmentDataRequest',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
