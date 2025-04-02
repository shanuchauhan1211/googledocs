const Skeleton = () => {
    return (
      <div className="flex flex-col">
        
        <div className="mt-[64px] p-4">
          
          <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg mb-6"></div>
  
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-10 bg-gray-300 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Skeleton;
  