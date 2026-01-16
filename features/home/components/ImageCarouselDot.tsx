export default function ImageCarouselDot({
  currentCount,
  totalCount,
}: {
  currentCount: number;
  totalCount: number;
}) {
  return (
    <div className="flex gap-0.5 rounded-xl">
      {Array.from({ length: totalCount }, (_, i) => {
        const isActive = currentCount === i + 1;
        return (
          <span
            key={i}
            className={`
              text-sm select-none
              ${isActive ? "text-gray-300" : "text-gray-600"}
            `}
          >
            ●
          </span>
        );
      })}
    </div>
  );
}
