import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuickNotesAddNote from '../QuickNotesScreens/QuickNotesAddNote';
import QuickNotesAwards from '../QuickNotesScreens/QuickNotesAwards';
import QuickNotesHistory from '../QuickNotesScreens/QuickNotesHistory';
import QuickNotesHome from '../QuickNotesScreens/QuickNotesHome';
import QuickNotesLoader from '../QuickNotesScreens/QuickNotesLoader';
import QuickNotesMarkNow from '../QuickNotesScreens/QuickNotesMarkNow';

import QuickNotesOnboard from '../QuickNotesScreens/QuickNotesOnboard';
import QuickNotesSettings from '../QuickNotesScreens/QuickNotesSettings';
import QuickNotesNumbers from '../QuickNotesScreens/QuickNotesNumbers';

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

const Stack = createStackNavigator<QuickNotesRoutesList>();

const QuickNotesStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="QuickNotesLoader"
    >
      <Stack.Screen name="QuickNotesLoader" component={QuickNotesLoader} />
      <Stack.Screen name="QuickNotesOnboard" component={QuickNotesOnboard} />
      <Stack.Screen name="QuickNotesHome" component={QuickNotesHome} />
      <Stack.Screen name="QuickNotesAddNote" component={QuickNotesAddNote} />
      <Stack.Screen name="QuickNotesMarkNow" component={QuickNotesMarkNow} />
      <Stack.Screen name="QuickNotesNumbers" component={QuickNotesNumbers} />
      <Stack.Screen name="QuickNotesHistory" component={QuickNotesHistory} />
      <Stack.Screen name="QuickNotesSettings" component={QuickNotesSettings} />
      <Stack.Screen name="QuickNotesAwards" component={QuickNotesAwards} />
    </Stack.Navigator>
  );
};

export default QuickNotesStack;
