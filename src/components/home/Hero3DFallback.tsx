export function Hero3DFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[22rem] min-h-80 overflow-hidden rounded-lg border border-emerald-950/10 bg-white/55 shadow-sm dark:border-white/10 dark:bg-white/5 sm:h-[30rem]"
    >
      <div className="absolute left-[18%] top-[22%] h-16 w-16 rounded-md bg-teal-600/20 blur-sm" />
      <div className="absolute right-[20%] top-[30%] h-24 w-24 rounded-lg bg-amber-300/25 blur-sm" />
      <div className="absolute bottom-[18%] left-[30%] h-20 w-20 rounded-md bg-emerald-700/15 blur-sm" />
      <div className="absolute inset-x-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-teal-700/35 to-transparent" />
      <div className="absolute left-1/2 top-[18%] h-[62%] w-px bg-gradient-to-b from-transparent via-emerald-900/25 to-transparent dark:via-emerald-100/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(247,245,239,0.55))] dark:bg-[radial-gradient(circle_at_center,transparent,rgba(7,20,18,0.55))]" />
    </div>
  );
}
