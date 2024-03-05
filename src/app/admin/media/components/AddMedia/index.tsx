import { Media, MediaTags, MediaType } from "@/@types/media";
import { useCallback } from "react";

type AddMediaProps = {
  isOpen: boolean;
  handleAddMedia: () => void;
  handleCancel: () => void;
  setSelectedPhoto: (photo: Media) => void;
  selectedPhoto: Media;
};

export const AddMedia = ({
  isOpen,
  selectedPhoto,
  setSelectedPhoto,
  handleAddMedia,
  handleCancel,
}: AddMediaProps) => {
  const handleDisable = useCallback(() => {
    return (
      !selectedPhoto.name ||
      !selectedPhoto.url ||
      !selectedPhoto.filename ||
      !selectedPhoto.type ||
      !selectedPhoto.tags
    );
  }, [selectedPhoto]);
  return (
    isOpen && (
      <main className="absolute top-0 left-0 self-center w-full antialiased bg-transparent-900 text-gray-900 font-sans overflow-x-hidden w-full h-full">
        <div className="relative min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-gray-100 rounded-lg p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="text-center md:text-left">
                <p className="font-bold">Add Media</p>
              </div>
            </div>
            <form>
              <div className="block gap-4 mt-3 xl:grid xl:grid-flow-col">
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Name
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.name || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        name: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4  outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Description
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.description || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        description: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4  outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="block gap-4 mt-3 xl:grid xl:grid-flow-col">
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Filename
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.filename || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        filename: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4  outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Url
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.url || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        url: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4  outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="block gap-4 mt-3 xl:grid xl:grid-flow-col">
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Published
                  </label>
                  <input
                    id="1"
                    type="checkbox"
                    checked={selectedPhoto.isPublished || false}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        isPublished: e.target.checked,
                      })
                    }
                    className="peer h-10 w-10 rounded-md bg-gray-50 accent-purple-200 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-purple focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Tag
                  </label>
                  <select
                    id="1"
                    multiple={false}
                    value={selectedPhoto.tags || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        tags: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  >
                    <option value={""}>Select Tag</option>
                    {Object.entries(MediaTags).map(([key, value]) => (
                      <option key={key} value={key} className="">
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Type
                  </label>
                  <select
                    id="1"
                    value={selectedPhoto.type || ""}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        type: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  >
                    <option value={""}>Select Type</option>
                    {Object.entries(MediaType).map(([key, value]) => (
                      <option key={key} value={key} className="">
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                onClick={handleAddMedia}
                disabled={handleDisable()}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              >
                Add Media
              </button>
              <button
                onClick={handleCancel}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  );
};
