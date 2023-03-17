"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-50 flex justify-center md:justify-between"
    >
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 w-80 text-xl rounded-xl"
      />
      <button
        type="submit"
        className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold"
      >
        🚀
      </button>
    </form>
  );
}
