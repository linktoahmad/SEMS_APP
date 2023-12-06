import React from 'react';
import firebase from 'firebase';
import Providers from './navigation';

export default function App() {
  var config = {
    databaseURL: "https://sems-6fa94.firebaseio.com/",
    projectId: "sems-6fa94",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

  return <Providers />;
}
