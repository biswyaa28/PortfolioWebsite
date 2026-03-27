interface SkeletonLoaderProps {
  variant?: "card" | "text" | "circle" | "chart";
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  variant = "card",
  count = 1,
  className = "",
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === "chart") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-64 bg-stone-800 border border-stone-700 rounded-sm relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/30 to-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <div className={`animate-pulse flex gap-4 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="w-12 h-12 bg-stone-800 border border-stone-700 rounded-full relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/30 to-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={`animate-pulse space-y-3 ${className}`}>
        {items.map((i) => (
          <div
            key={i}
            className="h-4 bg-stone-800 border border-stone-700 rounded-sm relative overflow-hidden"
            style={{ width: `${70 + ((i * 17 + 13) % 30)}%` }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/30 to-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {items.map((i) => (
        <div
          key={i}
          className="bg-stone-800 border border-stone-700 rounded-sm overflow-hidden"
        >
          <div className="h-40 bg-stone-700/50 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-600/20 to-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-stone-700/50 rounded-sm w-3/4 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-600/20 to-transparent"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }}
              />
            </div>
            <div className="h-3 bg-stone-700/30 rounded-sm w-full" />
            <div className="h-3 bg-stone-700/30 rounded-sm w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
