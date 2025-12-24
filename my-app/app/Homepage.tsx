import React, { useState, useRef } from "react";
import "./globals.css";
import RetroButton from "./button";

const Homepage = () => {
  // You can customize these options - add more or change labels/audio URLs
  const audioOptions = [
    {
      label: "English",
      text: "I love you",
      audioUrl: "/BO_rec.flac",
    },
    {
      label: "Spanish",
      text: "Te amo",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "French",
      text: "Je t'aime",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Italian",
      text: "Ti amo",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Chinese",
      text: "我爱你",
      audioUrl: "/image_rec.flac",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(audioOptions[0].label);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const audioRef = useRef(null);

  const handlePress = () => {
    if (isPlaying) {
      handleStop();
      return;
    }
    const selected = audioOptions.find((opt) => opt.label === selectedOption);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (selected) {
      audioRef.current = new Audio(selected.audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      // setText(selected.text);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const hansetSelectedOption = (value: string) => {
    setSelectedOption(value);
    const selected = audioOptions.find((opt) => opt.label === value);
    if (selected) {
      setText(selected.text);
    }
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-red-250 to-pink-300">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-400 opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            >
              <div
                className="my-infinite-sprite"
                style={{
                  // Use a NEGATIVE delay.
                  // If the loop is 4s, we randomize between -4s and 0s.
                  animationDelay: `-${Math.random() * 4}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="bg-white bg-opacity-90 rounded-3xl p-12 max-w-md w-full">
            {/* <h1 className="text-4xl font-bold text-center mb-2 text-pink-600">
          </h1> */}
            <p className="text-center text-gray-600 mb-8">Select a Language</p>

            {/* Dropdown Selector */}
            <div className="mb-6">
              <select
                value={selectedOption}
                onChange={(e) => hansetSelectedOption(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-gray-800"
              >
                {audioOptions.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Play Button */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handlePress}
                className={`py-4 rounded-lg font-semibold text-black transition-all transform hover:scale-105 active:scale-95`}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#FF6B6B",
                  borderRadius: 50,
                }}
              >
                {isPlaying ? "Playing..." : "Press Me"}
              </button>
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="mt-6">
          <p className="lxgw-wenkai-tc-regular">{text}</p>
        </div>

        <RetroButton onClick={handlePress} />

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) rotate(5deg);
            }
            50% {
              transform: translateY(-40px) rotate(-5deg);
            }
            75% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
          .animate-float {
            animation: float 15s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Homepage;
