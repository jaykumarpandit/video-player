import { getDataset } from "@/lib/dataset";
import { CategorySection } from "@/components/category-section";

export default function Home() {
  const dataset = getDataset();

  return (
    <main className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 border-b bg-background/80 px-4 py-4 backdrop-blur-md md:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-primary">VideoPlayer</h1>
      </header>
      
      <div className="flex flex-col gap-2">
        {dataset.categories.map((categoryData) => (
          <CategorySection 
            key={categoryData.category.slug} 
            categoryData={categoryData} 
          />
        ))}
      </div>
    </main>
  );
}
