type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="story-gradient subtle-grid px-5 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase text-teal-800">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          {description}
        </p>
      </div>
    </header>
  );
}
