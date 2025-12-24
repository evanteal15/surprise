import React, { useState, useRef, useEffect } from "react";
import "./button.css";

const RetroButton = ({
  label = "Retro Button",
  isLoader = false,
  onClick, // Your custom function goes here
  className = "",
}) => {
  const buttonRef = useRef(null);

  // Visual State
  const [isActive, setIsActive] = useState(false);
  const [tiltClass, setTiltClass] = useState("");

  // Logic State
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  // --- 1. Tilt Logic (Visuals) ---
  const handleMouseMove = (e) => {
    if (!buttonRef.current || isLoading) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.3) setTiltClass("btn-left");
    else if (x > width * 0.65) setTiltClass("btn-right");
    else setTiltClass("btn-center");
  };

  const handleMouseLeave = () => {
    setTiltClass("");
    setIsActive(false);
  };

  // --- 2. The Smart Click Handler ---
  const handleClick = async (e) => {
    // If it's just a normal button, run the function and exit
    if (!isLoader) {
      if (onClick) onClick(e);
      return;
    }

    // If already loading or finished, do nothing
    if (isLoading || status) return;

    e.preventDefault();
    setIsLoading(true);
    setProgress(0);

    // A. Start "Fake" Progress (UX Trick)
    // We animate to 90% while waiting for the real data, so the user sees activity.
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Cap at 90% until the actual function finishes
        return prev >= 0.9 ? 0.9 : prev + 0.05;
      });
    }, 200);

    try {
      // B. Run the Custom Function
      if (onClick) {
        // We await strictly in case you pass an async function
        await onClick(e);
      }

      // C. Success!
      clearInterval(interval);
      setProgress(1); // Jump to 100%

      // Allow the 100% bar to be seen for a moment before showing success state
      setTimeout(() => {
        setIsLoading(false);
        setStatus("success");
        resetButton();
      }, 400);
    } catch (error) {
      // D. Error!
      clearInterval(interval);
      setIsLoading(false);
      setStatus("error");
      console.error("Button Action Failed:", error);
      resetButton();
    }
  };

  const resetButton = () => {
    setTimeout(() => {
      setStatus(null);
      setProgress(0);
    }, 2000); // Keep status visible for 2 seconds
  };

  // --- 3. Class Helper ---
  const getButtonClasses = () => {
    let classes = ["btn"];
    if (isActive) classes.push("btn-active");
    if (tiltClass) classes.push(tiltClass);
    if (isLoading) classes.push("state-loading");
    if (status === "success") classes.push("state-success");
    if (status === "error") classes.push("state-error");
    return classes.join(" ");
  };

  return (
    <div className={`wrapper ${className}`}>
      <div
        role="button"
        className="retro-btn"
        onClick={handleClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={buttonRef}
      >
        <a className={getButtonClasses()}>
          <span className="btn-inner">
            <span className="content-wrapper">
              <span className="btn-content">
                <span className="btn-content-inner" label={label}></span>
                {isLoader && (
                  <>
                    <span className="content">{label}</span>
                    <span
                      className="progress"
                      style={{ opacity: isLoading ? 1 : 0 }}
                    >
                      <span
                        className="progress-inner"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </span>
                  </>
                )}
              </span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default RetroButton;
