import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuickNotesStack from './TigerInputQuickNotes/[Notesrttnvgts]/QuickNotesStack';
import { StoreProvider } from './TigerInputQuickNotes/QuickNotessttrg/quickNotesCntxt';

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
