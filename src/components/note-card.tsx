import { Note } from "@prisma/client";
import { Roboto } from "next/font/google";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useNotes } from "@/context/NoteContext";
import Link from "next/link";

const roboto = Roboto({ weight: "900", subsets: ["latin"] });

function NoteCard({ note }: { note: Note }) {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <section>
      <div className="pl-2 pr-5 lg:pr-0 max-h-[200px] lg:max-h-[350px] h-full w-full bg-lime-500 py-2 hover:bg-blue-500/50 hover:text-white hover:transition duration-300 flex flex-col lg:flex-row border border-green-600 rounded-xl">
        <div className="lg:w-[90%] flex flex-col border border-r-green-600 p-5 rounded-xl">
          <Link href={`/card/${note.id}`}>
            <h1 className="text-2xl font-bold font-mono truncate">
              {note.title}
            </h1>
            <p
              className={`${roboto.className}, Font-mono hover:text-white truncate`}
            >
              {note.content}
            </p>
            <p className="pt-3 italic text-sm text-gray-100">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </Link>
        </div>
        <div className="lg:w-[10%] pt-2 lg:pt-0 flex flex-row justify-end lg:flex-col lg:justify-center lg:items-center gap-5 ">
          <button
            className="z-40 text-blue-500"
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            <MdEditDocument size={25} />
          </button>
          <button
            className="z-40 text-red-500"
            onClick={async () => {
              if (confirm("are you sure?")) {
                await deleteNote(Number(note.id));
              }
            }}
          >
            <MdDelete size={25} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NoteCard;
