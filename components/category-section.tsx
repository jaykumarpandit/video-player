import { CategoryWithContents } from "@/types/dataset";
import { VideoCard } from "@/components/video-card";

interface CategorySectionProps {
  categoryData: CategoryWithContents;
}

export function CategorySection({ categoryData }: CategorySectionProps) {
  const { category, contents } = categoryData;

  return (
    <section className="flex flex-col gap-4 py-6">
      <div className="flex items-center gap-3 px-4 md:px-6">
        {category.iconUrl && (
          <img 
            src={category.iconUrl} 
            alt="" 
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
        <h2 className="text-xl font-bold tracking-tight">{category.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-6">
        {contents.map((video) => (
          <VideoCard 
            key={video.slug} 
            video={video} 
            categoryName={category.name}
            relatedVideos={contents}
          />
        ))}
      </div>
    </section>
  );
}

