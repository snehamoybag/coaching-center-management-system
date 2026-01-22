import type { ReactElement, ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

function Card({ className = "", children }: Readonly<CardProps>): ReactElement {
  return (
    <div className={`p-4 border-1 border-neutral-300 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export { Card };
