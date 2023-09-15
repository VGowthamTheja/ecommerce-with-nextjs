import DynamicTabs from "@/components/DynamicTabs";

export default async function Home() {
  return (
    <div className="flex flex-col items-start justify-center overflow-hidden">
      <DynamicTabs />
    </div>
  );
}
