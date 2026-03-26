//  Stack

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuickNotesAddNote from '../inputquiqqksvws/QuickNotesAddNote';
import QuickNotesAwards from '../inputquiqqksvws/QuickNotesAwards';
import QuickNotesHistory from '../inputquiqqksvws/QuickNotesHistory';
import QuickNotesHome from '../inputquiqqksvws/QuickNotesHome';

import QuickNotesLoader from '../inputquiqqksvws/QuickNotesLoader';

import QuickNotesMarkNow from '../inputquiqqksvws/QuickNotesMarkNow';

import QuickNotesOnboard from '../inputquiqqksvws/QuickNotesOnboard';
import QuickNotesSettings from '../inputquiqqksvws/QuickNotesSettings';
import QuickNotesNumbers from '../inputquiqqksvws/QuickNotesNumbers';
import QuickNotesStories from '../inputquiqqksvws/QuickNotesStories';
import QuickNotesStoryDetails from '../inputquiqqksvws/QuickNotesStoryDetails';

const StackRoute = createStackNavigator();

const QuickNotesStack: React.FC = () => {
  return (
    <StackRoute.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="QuickNotesLoader"
    >
      <StackRoute.Screen name="QuickNotesLoader" component={QuickNotesLoader} />
      <StackRoute.Screen
        name="QuickNotesOnboard"
        component={QuickNotesOnboard}
      />
      <StackRoute.Screen name="QuickNotesHome" component={QuickNotesHome} />
      <StackRoute.Screen
        name="QuickNotesAddNote"
        component={QuickNotesAddNote}
      />
      <StackRoute.Screen
        name="QuickNotesMarkNow"
        component={QuickNotesMarkNow}
      />
      <StackRoute.Screen
        name="QuickNotesNumbers"
        component={QuickNotesNumbers}
      />
      <StackRoute.Screen
        name="QuickNotesHistory"
        component={QuickNotesHistory}
      />
      <StackRoute.Screen
        name="QuickNotesSettings"
        component={QuickNotesSettings}
      />
      <StackRoute.Screen name="QuickNotesAwards" component={QuickNotesAwards} />
      <StackRoute.Screen
        name="QuickNotesStories"
        component={QuickNotesStories}
      />
      <StackRoute.Screen
        name="QuickNotesStoryDetails"
        component={QuickNotesStoryDetails}
      />
    </StackRoute.Navigator>
  );
};

export default QuickNotesStack;
