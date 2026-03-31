import { useState, useRef, useEffect } from "react";

const LOADING_VIDEO_URL =
  "https://customer-assets.emergentagent.com/job_exotic-cars-2/artifacts/yudb2ew9_Create-a-dynamic-animated-logo-sequence-for-%27AeroE-3.mp4";

export default function LoadingScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(() => {
        setHidden(true);
        onComplete?.();
      }, 800);
    };

    const handleError = () => {
      // If video fails, skip loading screen after 2s
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => { setHidden(true); onComplete?.(); }, 800);
      }, 2000);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Fallback: auto-dismiss after 8 seconds
    const fallback = setTimeout(() => {
      if (!fadeOut) {
        setFadeOut(true);
        setTimeout(() => { setHidden(true); onComplete?.(); }, 800);
      }
    }, 8000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      clearTimeout(fallback);
    };
  }, [onComplete, fadeOut]);

  if (hidden) return null;

  return (
    <div
      data-testid="loading-screen"
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-contain max-w-3xl"
      >
        <source src={LOADING_VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  );
}
