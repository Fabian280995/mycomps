import { Calendar, ImageIcon, MapPin, User2 } from "lucide-react";

const CompCardSceleton = () => {
  return (
    <div className="w-[300px] h-[386px] max-w-xs animate-pulse">
      <div
        className="relative w-full h-full flex flex-col bg-white border rounded-3xl overflow-hidden
        hover:scale-[1.02] hover:-translate-y-2 hover:shadow-lg transition-all duration-150"
      >
        <div className="w-full aspect-[3/2] overflow-hidden bg-gray-200 flex items-center justify-center">
          <ImageIcon className="object-cover object-center transition-all duration-500 ease-in-out w-8 h-8 text-white" />
        </div>
        <div className="px-4 py-2 space-y-2 flex flex-col">
          <div className="flex">
            <h4 className="h-6 w-full bg-gray-200 rounded-full my-2" />
          </div>
          <div className="flex flex-col gap-y-2 justify-around pb-4">
            <div className="flex items-center gap-x-2 text-gray-200">
              <div className="min-w-6">
                <User2 className="w-5 h-5" />
              </div>
              <p className="h-5 w-full bg-gray-200 rounded-full my-1" />
            </div>
            <div className="flex items-center gap-x-2 text-gray-200">
              <div className="min-w-6">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="h-5 w-full bg-gray-200 rounded-full my-1" />
            </div>
            <div className="flex items-center gap-x-2 text-gray-200">
              <div className="min-w-6">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="h-5 w-full bg-gray-200 rounded-full my-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompCardSceleton;
