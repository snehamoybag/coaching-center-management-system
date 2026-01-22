import type { StatsType } from "@/types/StatsType";
import type { ReactElement } from "react";
import LinkCard from "./LinkCard";
import {
  Users,
  User,
  CirclePile,
  CirclePercent,
  BanknoteArrowDown,
} from "lucide-react";

interface LinkCardsProps {
  stats: StatsType;
  className?: string;
}

export default function LinkCards({
  stats,
  className = "",
}: Readonly<LinkCardsProps>): ReactElement {
  const { students, teachers, batches, payments, fees } = stats;

  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 ${className}`}
    >
      <LinkCard
        to="/students"
        title={`${students}`}
        subtitle="Total Students"
        icon={Users}
      />

      <LinkCard
        to="/teachers"
        title={`${teachers}`}
        subtitle="Total Teachers"
        icon={User}
      />

      <LinkCard
        to="/batches"
        title={`${batches}`}
        subtitle="Total Batches"
        icon={CirclePile}
      />

      <LinkCard
        to="/fees"
        title={`${fees}`}
        subtitle="Type of fees"
        icon={CirclePercent}
      />

      <LinkCard
        to="/payments"
        title={`${payments}`}
        subtitle="Number of payments"
        icon={BanknoteArrowDown}
      />
    </ul>
  );
}
