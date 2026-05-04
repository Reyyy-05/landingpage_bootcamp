import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="heading-md mb-6">Overview</h1>
      <p className="text-muted-foreground">Dashboard sedang dalam pembangunan...</p>
    </div>
  );
}
