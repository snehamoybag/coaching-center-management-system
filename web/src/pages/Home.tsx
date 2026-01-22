import LinkCards from "@/components/LinkCards";
import type { ReactElement } from "react";
import stats from "@/lib/dummy-data/stats";

export default function Home(): ReactElement {
  return (
    <div>
      <section>
        <LinkCards stats={stats} />
      </section>
    </div>
  );
}
