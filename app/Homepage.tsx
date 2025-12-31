import React, { useState, useRef, useEffect } from "react";
import "./globals.css";

const Homepage = () => {
  // You can customize these options - add more or change labels/audio URLs
  const audioOptions = [
    {
      label: "English",
      text: "I Love You",
      textType: "latin",
      audioUrl: "/english.flac",
    },
    {
      label: "Arabic",
      text: "أنا أحبك",
      textType: "arabic",
      audioUrl: "/arabic.flac",
    },
    {
      label: "Bengali",
      text: "আমি তোমাকে ভালবাসি",
      textType: "bengali",
      audioUrl: "/bengali.flac",
    },
    {
      label: "Chinese",
      text: "我爱你",
      textType: "chinese",
      audioUrl: "/chinese.flac",
    },
    {
      label: "Dutch",
      text: "Ik Hou Van Je",
      textType: "latin",
      audioUrl: "/dutch.flac",
    },
    {
      label: "French",
      text: "Je T'aime",
      textType: "latin",
      audioUrl: "/french.flac",
    },
    {
      label: "German",
      text: "Ich Liebe Dich",
      textType: "latin",
      audioUrl: "/german.flac",
    },
    {
      label: "Greek",
      text: "Σ'αγαπώ",
      textType: "greek",
      audioUrl: "/greek.flac",
    },
    {
      label: "Hindi",
      text: "मैं तुम्हें प्यार करता हूँ",
      textType: "hindi",
      audioUrl: "/hindi.flac",
    },
    {
      label: "Hungarian",
      text: "Szeretlek",
      textType: "latin",
      audioUrl: "/Hungarian.flac",
    },
    {
      label: "Italian",
      text: "Ti Amo",
      textType: "latin",
      audioUrl: "/italian.flac",
    },
    {
      label: "Japanese",
      text: "",
      textType: "japanese",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Korean",
      text: "사랑해요",
      textType: "korean",
      audioUrl: "/korean.flac",
    },
    {
      label: "Malay",
      text: "Saya Sayang Awak",
      textType: "latin",
      audioUrl: "/malay.flac",
    },
    {
      label: "Polish",
      text: "Kocham Cię",
      textType: "latin",
      audioUrl: "/polish.flac",
    },
    {
      label: "Portuguese",
      text: "Eu Te Amo",
      textType: "latin",
      audioUrl: "/portugese.flac",
    },
    {
      label: "Romanian",
      text: "Te Iubesc",
      textType: "latin",
      audioUrl: "/romanian.flac",
    },
    {
      label: "Russian",
      text: "Я люблю тебя",
      textType: "cyrillic",
      audioUrl: "/russian.flac",
    },
    {
      label: "Spanish",
      text: "Te Amo",
      textType: "latin",
      audioUrl: "/spanish.flac",
    },
    {
      label: "Swedish",
      text: "Jag Älskar Dig",
      textType: "latin",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Thai",
      text: "ฉฉันรักเธอมาก",
      textType: "thai",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Turkish",
      text: "Seni Seviyorum",
      textType: "latin",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Urdu",
      text: "میں تم سے محبت کرتا/کرتی ہوں",
      textType: "arabic",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Vietnamese",
      text: "Chị Yêu Em",
      textType: "latin",
      audioUrl: "/image_rec.flac",
    },
    {
      label: "Yoruba",
      text: "Mo Nife E",
      textType: "latin",
      audioUrl: "/image_rec.flac",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [textType, setTextType] = useState("latin");
  const [text, setText] = useState("I Love You");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const filteredOptions = audioOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    audioRef.current = new Audio("/english.flac");

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePress = () => {
    console.log("Button pressed!");
    if (isPlaying) {
      handleStop();
      return;
    }
    const selected = audioOptions.find((opt) => opt.label === selectedOption);

    if (audioRef.current && isPlaying) {
      console.log("Playing!");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (selected) {
      console.log("Playing Song!");
      audioRef.current = new Audio(selected.audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      // setText(selected.text);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (!selected && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedOption(value);

    const selected = audioOptions.find((opt) => opt.label === value);
    if (selected) {
      setText(selected.text);
      setTextType(selected.textType);
    }

    setSearchTerm("");
    setIsOpen(false);
  };

  // const hansetSelectedOption = (value: string) => {
  //   setSelectedOption(value);
  //   const selected = audioOptions.find((opt) => opt.label === value);
  //   if (selected) {
  //     setText(selected.text);
  //     setTextType(selected.textType);
  //   }
  // };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-400 via-red-250 to-pink-300">
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
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingTop: 100,
            paddingBottom: 50,
          }}
        >
          {textType === "latin" ? (
            <p className="borel-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "chinese" ? (
            <p className="zcool-kuaile-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "bengali" ? (
            <p className="hind-siliguri-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "arabic" ? (
            <p className="zain-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "greek" || textType === "cyrillic" ? (
            <p className="playpen-sans-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "hindi" ? (
            <p className="playpen-sans-deva-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "korean" ? (
            <p className="gamja-flower-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : textType === "thai" ? (
            <p className="sriracha-regular" style={{ fontSize: 156 }}>
              {text}
            </p>
          ) : null}
        </div>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingTop: 75,
            paddingBottom: 50,
          }}
        >
          {/* <h1 className="text-4xl font-bold text-center mb-2 text-pink-600">
          </h1> */}

          {/* Dropdown Selector */}
          {/* <div className="mb-6 relative z-50">
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
          </div> */}
          <div
            className="relative z-50 w-full"
            style={{ maxWidth: "300px" }}
            ref={dropdownRef}
          >
            {/* Search Input */}
            <input
              type="text"
              value={isOpen ? searchTerm : selectedOption}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search or select an option..."
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-gray-700"
            />

            {/* Dropdown Arrow */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
            >
              <svg
                className={`w-5 h-5 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-pink-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(option.label)}
                      className="px-4 py-3 hover:bg-pink-100 cursor-pointer transition-colors border-b border-pink-100 last:border-b-0 text-gray-700"
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-700 text-center">
                    No options found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Picture 1 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 400, left: 50 }}
        >
          <img
            src="/enlighten.jpg"
            alt="Enlighten"
            style={{
              width: "14%",
              height: "14%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Picture 1 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 700, left: 120 }}
        >
          <img
            src="/booth.jpg"
            alt="booth"
            style={{
              width: "34%",
              height: "34%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Picture 1 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 500, left: 320 }}
        >
          <img
            src="/funny.jpg"
            alt="funny"
            style={{
              width: "18%",
              height: "18%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Picture 5 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 400, left: 1350 }}
        >
          <img
            src="/foods.jpg"
            alt="foods"
            style={{
              width: "65%",
              height: "65%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Picture 6 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 400, left: 1050 }}
        >
          <img
            src="/goblin.jpg"
            alt="goblin"
            style={{
              width: "35%",
              height: "35%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Picture 1 */}
        <div
          className="mb-12"
          style={{ position: "fixed", top: 600, left: 1200 }}
        >
          <img
            src="/pokemon.jpg"
            alt="pokemon"
            style={{
              width: "34%",
              height: "34%",
              borderRadius: 20,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Pressable Button */}
        <div className="flex gap-4 justify-center">
          <div className="relative" style={{ width: 200, height: 200 }}>
            {/* Shadow/Border Layer */}
            <div
              className="absolute"
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#a00000",
                borderRadius: 100,
                top: 8,
                left: 0,
              }}
            />

            {/* Main Button */}
            <button
              onClick={handlePress}
              className="absolute font-semibold text-black transition-all"
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#f40000",
                borderRadius: 100,
                top: 0,
                left: 0,
                // border: "4px #e38282ff",
                boxShadow: "0 4px 0 #a00000",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.top = "4px";
                e.currentTarget.style.boxShadow = "0 2px 0 #a00000";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.top = "0px";
                e.currentTarget.style.boxShadow = "0 4px 0 #a00000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.top = "0px";
                e.currentTarget.style.boxShadow = "0 4px 0 #a00000";
              }}
            >
              {isPlaying ? "Playing..." : "Press Me :>"}
            </button>
          </div>
        </div>

        {/* <RetroButton onClick={handlePress} /> */}

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
