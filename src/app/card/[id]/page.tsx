"use client";
import { useEffect, useState } from "react";
import { useNotes } from "@/context/NoteContext";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

function CardShow({ params }: Params) {
  const { notes, loadUnique } = useNotes();
  const router = useRouter();

  useEffect(() => {
    loadUnique(Number(params.id));
  }, []);

  console.log(notes);

  return (
    <div className="w-full h-screen grid grid-cols-1 items-center p-10">
      <div className="gap-10 bg-blue-300 flex flex-col justify-center rounded-3xl px-5 py-10 items-center">
        <h1 className="font-bold text-4xl w-full items-start">{notes.title} </h1>
        <p className="flex items-start">{notes.content}</p>
        <p className="w-full flex justify-end">
          {new Date(notes.createdAt).toLocaleDateString()}
        </p>
        <button
          onClick={()=> router.push('/')}
          className="px-3 py-2 bg-black/90 text-white hover:bg-black w-1/2 rounded-xl"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default CardShow;
