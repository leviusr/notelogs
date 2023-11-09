"use client";
import FormCreate from "@/components/form-create";
import { useEffect, useState } from "react";
import { useNotes } from "@/context/NoteContext";
import NoteCard from "@/components/note-card";
import HeaderPage from "@/components/headerpage";
import Buscar from "@/components/find";
import { NextResponse } from "next/server";

function HomePage() {
  const { notes, filterNotes, loadNotes } = useNotes();
  console.log(notes);

  useEffect(() => {
    loadNotes()
  }, []);

  // const notes = await loadNotes();

  return (
    // <section className="max-w-[700px] gap-5 h-full  flex flex-col items-start pt-10">
        <div className="mt-2 backdrop-blur shadow-md transition-all duration-700 w-full gap-1 lg:gap-2 flex flex-col px-5 col-span-2">
          {Array.isArray(notes)
            ? notes.map((note) => <NoteCard note={note} key={note.id} />)
            : null}
        </div>
  );
}

export default HomePage;
