"use client";
import Content from "@/components/contant";
import { useState } from "react";

export default function Home() {
  const [tema, setTema] = useState(false);
  return (
    <div
      className={
        tema
          ? "bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen"
          : "bg-gradient-to-br from-yellow-300 to-orange-400 min-h-screen"
      }
    >
      <div className="flex flex-col items-center justify-center h-screen space-y-5">
        <Content tema={tema} />
        <button
          type="button"
          onClick={() => setTema(!tema)}
          className="px-6 py-2 rounded-lg shadow-md font-semibold text-white transition-colors duration-300
            bg-purple-600 hover:bg-purple-700
            border-2 border-white
            "
        >
          Trocar Tema
        </button>
      </div>
    </div>
  );
}
