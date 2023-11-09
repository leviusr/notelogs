"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdFindInPage } from "react-icons/md";

function Buscar() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${value}`);
    console.log('texto')
  };
 
  const [value, setValue] = useState("");

  return (
    <form className="flex flex-row justify-center items-center gap-2">
      <input
        type="text"
        id="element"
        className="px-3 py-1 rounded-xl text-zinc-500 w-96"
        placeholder="Find..."
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={handleClick}
        type="button"
        className="rounded-full bg-black px-2 py-2 hover:scale-105 hover:bg-white hover:text-black"
      >
        <MdFindInPage size={16} />
      </button>
    </form>
  );
}

export default Buscar;
