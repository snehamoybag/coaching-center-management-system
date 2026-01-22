import type { JSX, ReactElement, ReactNode } from "react";

interface TitleProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export function Title700({
  as: Tag = "h2",
  className = "",
  children,
}: Readonly<TitleProps>): ReactElement {
  return <Tag className={`text-2xl font-bold ${className}`}>{children}</Tag>;
}
