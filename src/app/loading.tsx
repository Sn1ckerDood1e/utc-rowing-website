export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-utc-navy text-white">
      <div className="text-center animate-fade-in">
        <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-3">
          Hold water&hellip;
        </p>
        <h1
          className="font-display text-4xl sm:text-5xl font-bold animate-pulse-ring"
          style={{ animationDuration: "2s" }}
        >
          UTC Rowing
        </h1>
        <div className="mt-6 mx-auto w-12 h-[3px] bg-utc-gold" aria-hidden />
      </div>
    </div>
  );
}
