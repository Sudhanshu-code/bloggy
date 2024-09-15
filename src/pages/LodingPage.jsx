import React from "react";

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-20 w-20 bg-black dark:bg-white animate-ping"></div>
    </div>
  );
}

export default LoadingPage;
