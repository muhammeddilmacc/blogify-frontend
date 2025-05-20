interface PageHeaderProps {
  description?: string;
}

export function PageHeader({ description }: PageHeaderProps) {
  return (
    <header className="text-center space-y-4">
      {description && <p className="text-xl text-gray-600">{description}</p>}
    </header>
  );
} 