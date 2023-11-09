"use client";
import { promises } from "dns";
import { useContext, createContext, useState } from "react";
import { Notenoid, UpdateNote } from "@/interfaces/note";
import { Note } from "@prisma/client";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export const NoteContex = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  filterNotes: (filter: string) => Promise<void>;
  createNote: (note: Notenoid) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  putNote: (id: number, note: UpdateNote) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  loadUnique: (id: number) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  filterNotes: async (filter: string) => {},
  createNote: async (note: Notenoid) => {},
  deleteNote: async (id: number) => {},
  putNote: async (id: number, note: UpdateNote) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  loadUnique: async (id: number) => {},
});

export const useNotes = () => {
  const context = useContext(NoteContex);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function filterNotes(filter: string) {
    const res = await fetch(`http://localhost:3000/api/event/${filter}`, {
      method: 'GET'
    });
    const data = await res.json();
    setNotes(data);
  }

  async function loadUnique(id: number) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note: Notenoid) {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    console.log(newNote);
  }

  async function deleteNote(id: number) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== id));
  }

  async function putNote(id: number, note: UpdateNote) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setNotes(notes.map((note) => (note.id === id ? data : note)));
  }

  return (
    <NoteContex.Provider
      value={{
        notes,
        putNote,
        selectedNote,
        setSelectedNote,
        loadNotes,
        createNote,
        deleteNote,
        loadUnique,
        filterNotes,
      }}
    >
      {children}
    </NoteContex.Provider>
  );
};
