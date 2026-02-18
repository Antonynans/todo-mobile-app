import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Java Class Today",
      description:
        "Had an interesting lecture on inheritance and polymorphism. The instructor explained method overriding with clear examples. Need to practice with abstract classes next.",
      category: "Concept",
      date: "Wednesday 10 January, 2025",
    },
    {
      id: "2",
      title: "Project Deadline",
      description:
        "Mobile app project due in 2 weeks. Need to complete authentication, database integration, and testing. Currently working on the login screen and user management features.",
      category: "Todo",
      date: "Thursday 11 January, 2025",
    },
    {
      id: "3",
      title: "React Hooks Deep Dive",
      description:
        "Learned about custom hooks today. Very powerful for reusing stateful logic. Created useForm hook for managing form state and validation. Will use this in the project.",
      category: "Concept",
      date: "Friday 12 January, 2025",
    },
  ]);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNoteById }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};