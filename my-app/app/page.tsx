"use client";
import Image from "next/image";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Home() {
  const [language, setLanguage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {isPlaying ? <p>Now Playing...</p> : <p>Select a language to start</p>}

        <Dropdown
          value={language}
          onChange={(e: { value: string }) => setLanguage(e.value)}
          options={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Chinese", value: "chinese" },
            { label: "Japanese", value: "japanese" },
          ]}
          placeholder="Select a Language"
          className="mb-8"
        />
      </main>
    </div>
  );
}
