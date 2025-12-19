"use client";
import Image from "next/image";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Homepage from "./Homepage";

export default function Home() {
  const [language, setLanguage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="home-container">
      <Homepage />
    </div>
  );
}
