import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuickNotesStack from './TigerInputQuickNotes/NotesNavigation/QuickNotesStack';
import { StoreProvider } from './TigerInputQuickNotes/QuickNotesStore/quickNotesCntxt';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <QuickNotesStack />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
