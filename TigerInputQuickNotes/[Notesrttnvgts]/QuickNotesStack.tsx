import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuickNotesAddNote from '../QuickNotesvws/QuickNotesAddNote';
import QuickNotesAwards from '../QuickNotesvws/QuickNotesAwards';
import QuickNotesHistory from '../QuickNotesvws/QuickNotesHistory';
import QuickNotesHome from '../QuickNotesvws/QuickNotesHome';
import QuickNotesLoader from '../QuickNotesvws/QuickNotesLoader';
import QuickNotesMarkNow from '../QuickNotesvws/QuickNotesMarkNow';

import QuickNotesOnboard from '../QuickNotesvws/QuickNotesOnboard';
import QuickNotesSettings from '../QuickNotesvws/QuickNotesSettings';
import QuickNotesNumbers from '../QuickNotesvws/QuickNotesNumbers';

export type QuickNotesRoutesList = {
  QuickNotesLoader: undefined;
  QuickNotesOnboard: undefined;
  QuickNotesHome: undefined;
  QuickNotesAddNote: undefined;
  QuickNotesMarkNow: undefined;
  QuickNotesNumbers: undefined;
  QuickNotesHistory: undefined;
  QuickNotesSettings: undefined;
  QuickNotesAwards: undefined;
};

const StackRoute = createStackNavigator<QuickNotesRoutesList>();

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
    </StackRoute.Navigator>
  );
};

export default QuickNotesStack;
