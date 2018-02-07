import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from './MainLayout.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <MainLayout />,
    document.getElementById('app')
  );
});
