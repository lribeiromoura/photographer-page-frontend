type SkeletonProps = {
  height?: number;
};

export const Skeleton = ({ height = 1 }: SkeletonProps) => {
  const arr = Array.from({ length: height });
  return arr.map((_, index) => (
    <div className="catalog-product w-full" key={index}>
      <div className="animate-pulse space-y-2">
        <div className="bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="full h-16 bg-gray-200"></div>
        </div>
      </div>
    </div>
  ));
};
