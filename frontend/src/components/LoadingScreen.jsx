import { useState, useRef, useEffect, useCallback } from "react";

const LOADING_VIDEO_URL =
  "https://customer-assets.emergentagent.com/job_exotic-cars-2/artifacts/yudb2ew9_Create-a-dynamic-animated-logo-sequence-for-%27AeroE-3.mp4";

export default function LoadingScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setFadeOut(true);
    setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fetch video as blob to bypass any URL encoding issues
    fetch(LOADING_VIDEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();

        video.oncanplay = () => {
          video.play().catch(() => dismiss());
        };
        video.onended = () => dismiss();
        video.onerror = () => dismiss();
      })
      .catch(() => {
        // Fallback: try direct src
        video.src = LOADING_VIDEO_URL;
        video.load();
        video.oncanplay = () => {
          video.play().catch(() => dismiss());
        };
        video.onended = () => dismiss();
        video.onerror = () => dismiss();
      });

    // Absolute fallback
    const fallback = setTimeout(dismiss, 12000);
    return () => clearTimeout(fallback);
  }, [dismiss]);

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
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
