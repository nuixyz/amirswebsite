"use client";

export default function DesktopMate() {
  return (
    <div
      className="fixed bottom-4 right-4 z-9998 pointer-events-none select-none"
      aria-hidden
    >
      <img
        src="/yunayu.gif"
        alt=""
        width={120}
        height={120}
        className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
