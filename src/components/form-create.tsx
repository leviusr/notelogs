"use client";
import { useEffect, useRef, useState } from "react";
import { useNotes } from "@/context/NoteContext";
import Image from "next/image";

function FormCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const { createNote, putNote, selectedNote, setSelectedNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null);

  console.log(selectedNote);
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <section className="lg:h-full  lg:fixed z-10 bg-lime-500">
      <div className="lg:flex hidden w-full justify-center ">
      <div className="relative w-20 h-28 mt-5">
        <Image src='/note.png' alt="note" fill></Image>
      </div>
      </div>
      <div className="text-center text-4xl mt-5">
        <h1 className="uppercase">Crea una nota</h1>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedNote) {
            setSelectedNote(null);
            await putNote(selectedNote.id, {
              title,
              content,
            });
          } else {
            await createNote({
              title,
              content,
            });
          }
          setTitle("");
          setContent("");
          titleRef.current?.focus();
        }}
        className="p-5 text-center space-y-10 mt-5"
      >
        <input
          placeholder="Titulo"
          autoFocus
          className="w-full px-3 py-2 border border-gray-500 text-gray-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={titleRef}
        />
        <textarea
          rows={4}
          placeholder="content"
          className="w-full px-3 py-2 border border-gray-500 text-gray-500"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div className="flex overflow flex-row gap-5 justify-end w-full">
          {selectedNote && (
            <button
              className="bg-red-500 text-white hover:font-bold w-40 rounded-xl hover:shadow-xl hover:shadow-black/80 py-2"
              type="button"
              onClick={() => {
                setSelectedNote(null);
                setTitle("");
                setContent("");
              }}
            >
              Cancel
            </button>
          )}
          <button
            className="disabled:opacity-60 disabled:cursor-not-allowed bg-blue-500 text-white hover:font-bold w-40 rounded-xl hover:shadow-xl hover:shadow-black/80 py-2"
            disabled={!title || !content}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormCreate;
