import type { ReactElement } from "react";
import { Link, type To } from "react-router";
import { Card } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface LinkCardProps {
  to: To;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
}

export default function LinkCard({
  to,
  title,
  subtitle,
  icon: Icon,
  className = "",
}: Readonly<LinkCardProps>): ReactElement {
  return (
    <Link to={to} className="block">
      <Card
        className={`flex items-center justify-between gap-4 hover:border-neutral-400 hover:border-t-neutral-400 hover:shadow-lg ${className}`}
      >
        <div>
          <h2 className="text-2xl font-bold capitalize">{title}</h2>
          <p className="capitalize">{subtitle}</p>
        </div>
        {Icon && <Icon />}
      </Card>
    </Link>
  );
}
