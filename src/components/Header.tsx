interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-primary text-white px-4 py-5">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-white/80 mt-1">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
