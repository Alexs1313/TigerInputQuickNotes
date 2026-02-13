import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  useState,
} from 'react';

const STORAGE_KEYS = {
  BACKGROUND_ID: '@QuickNotes/backgroundId',
  SOUND_ENABLED: '@QuickNotes/soundEnabled',
  MARKS: '@QuickNotes/marks',
  SAVED_NUMBERS: '@QuickNotes/savedNumbers',
  SAVED_NOTES: '@QuickNotes/savedNotes',
} as const;

export interface MarkItem {
  id: number;
  timestamp: number;
  timeString: string;
}

export interface SavedNumberItem {
  id: number;
  value: string;
  date: string;
}

export interface SavedNoteItem {
  id: number;
  text: string;
  date: string;
}

export interface QuickNotesStoreType {
  quickNotesSoundEnabled: boolean;
  setQuickNotesSoundEnabled: (value: boolean) => void;
  backgroundId: string;
  setBackgroundId: (id: string) => void;
  marks: MarkItem[];
  addMark: (timeString: string) => void;
  savedNumbers: SavedNumberItem[];
  addSavedNumber: (value: string, date: string) => void;
  savedNotes: SavedNoteItem[];
  addSavedNote: (text: string, date: string) => void;
}

export const StoreContext = createContext<QuickNotesStoreType | undefined>(
  undefined,
);

export function useQuickNotesStore(): QuickNotesStoreType {
  const ctx = useContext(StoreContext);
  if (ctx === undefined) {
    throw new Error('useQuickNotesStore must be used');
  }
  return ctx;
}

export interface StoreProviderProps {
  children: React.ReactNode;
}

const DEFAULT_BACKGROUND_ID = 'bg';

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [quickNotesSoundEnabled, setQuickNotesSoundEnabled] =
    useState<boolean>(false);
  const [backgroundId, setBackgroundIdState] = useState<string>(
    DEFAULT_BACKGROUND_ID,
  );
  const [marks, setMarks] = useState<MarkItem[]>([]);
  const [savedNumbers, setSavedNumbers] = useState<SavedNumberItem[]>([]);
  const [savedNotes, setSavedNotes] = useState<SavedNoteItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const [bg, sound, marksJson, numbersJson, notesJson] =
          await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.BACKGROUND_ID),
            AsyncStorage.getItem(STORAGE_KEYS.SOUND_ENABLED),
            AsyncStorage.getItem(STORAGE_KEYS.MARKS),
            AsyncStorage.getItem(STORAGE_KEYS.SAVED_NUMBERS),
            AsyncStorage.getItem(STORAGE_KEYS.SAVED_NOTES),
          ]);
        if (bg != null) setBackgroundIdState(bg);
        if (sound != null) setQuickNotesSoundEnabled(sound === 'true');
        if (marksJson != null) {
          const parsed = JSON.parse(marksJson) as MarkItem[];
          if (Array.isArray(parsed)) setMarks(parsed);
        }
        if (numbersJson != null) {
          const parsed = JSON.parse(numbersJson) as SavedNumberItem[];
          if (Array.isArray(parsed)) setSavedNumbers(parsed);
        }
        if (notesJson != null) {
          const parsed = JSON.parse(notesJson) as SavedNoteItem[];
          if (Array.isArray(parsed)) setSavedNotes(parsed);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  const setBackgroundId = useCallback((id: string) => {
    setBackgroundIdState(id);
    AsyncStorage.setItem(STORAGE_KEYS.BACKGROUND_ID, id).catch(() => {});
  }, []);

  const setQuickNotesSoundEnabledPersist = useCallback((value: boolean) => {
    setQuickNotesSoundEnabled(value);
    AsyncStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(value)).catch(
      () => {},
    );
  }, []);

  const addMark = useCallback((timeString: string) => {
    setMarks(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(m => m.id)) + 1 : 1;
      const next = [...prev, { id: nextId, timestamp: Date.now(), timeString }];
      AsyncStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(next)).catch(
        () => {},
      );
      return next;
    });
  }, []);

  const addSavedNumber = useCallback((value: string, date: string) => {
    setSavedNumbers(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(n => n.id)) + 1 : 1;
      const next = [...prev, { id: nextId, value, date }];
      AsyncStorage.setItem(
        STORAGE_KEYS.SAVED_NUMBERS,
        JSON.stringify(next),
      ).catch(() => {});
      return next;
    });
  }, []);

  const addSavedNote = useCallback((text: string, date: string) => {
    setSavedNotes(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(n => n.id)) + 1 : 1;
      const next = [...prev, { id: nextId, text, date }];
      AsyncStorage.setItem(
        STORAGE_KEYS.SAVED_NOTES,
        JSON.stringify(next),
      ).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<QuickNotesStoreType>(
    () => ({
      quickNotesSoundEnabled,
      setQuickNotesSoundEnabled: setQuickNotesSoundEnabledPersist,
      backgroundId,
      setBackgroundId,
      marks,
      addMark,
      savedNumbers,
      addSavedNumber,
      savedNotes,
      addSavedNote,
    }),
    [
      quickNotesSoundEnabled,
      setQuickNotesSoundEnabledPersist,
      backgroundId,
      setBackgroundId,
      marks,
      addMark,
      savedNumbers,
      addSavedNumber,
      savedNotes,
      addSavedNote,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
