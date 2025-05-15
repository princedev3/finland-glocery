"use client";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-[var(--color-custom-base)] border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
