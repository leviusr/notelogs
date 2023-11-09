"use client";
import { useEffect, useState } from "react";
import { useNotes } from "@/context/NoteContext";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import NoteCard from "@/components/note-card";
import Link from "next/link";

interface Params {
  params: {
    filter: string;
  };
}

function FilterPage({ params }: Params) {
  console.log(params.filter);
  const { notes, filterNotes } = useNotes();
  const router = useRouter();

  useEffect(() => {
    filterNotes(params.filter);
  }, []);

  console.log(notes);

  return (
    <div className="flex flex-col bg-red-300 col-span-2">
    <div className="w-full items-center">
          {Array.isArray(notes)
            ? notes.map((note) => <NoteCard note={note} key={note.id} />)
            : null}
    </div>
      <Link href='/' className="px-3 py-2 bg-blue-500 font-bold uppercase">Volver</Link>
    </div>
  );
}

export default FilterPage;
