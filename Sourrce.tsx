import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuickNotesStack from './Inputquuicknotssrcc/[Notesrttnvgts]/QuickNotesStack';
import { StoreProvider } from './Inputquuicknotssrcc/inptquiqqssttrg/quickNotesCntxt';

const Sourrce: React.FC = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <QuickNotesStack />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default Sourrce;
