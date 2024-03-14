import { MediaTags, MediaType } from "@/@types/media";
import { debounce } from "@/util/debounce";

type SearchMediaProps = {
  setSearch: (value: string) => void;
  setPerPage: (value: number) => void;
  setActive: (value: string) => void;
  setType: (value: string) => void;
  setTags: (value: string) => void;
};

export const SearchMedia = ({
  setSearch,
  setPerPage,
  setActive,
  setType,
  setTags,
}: SearchMediaProps) => {
  return (
    <>
      <div>
        <div>
          <span className="text-white">Search</span>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            onChange={(e) =>
              debounce(() => {
                e.target.value.length > 2
                  ? setSearch(e.target.value)
                  : setSearch("");
              }, 1000)()
            }
            className="appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div className="my-2 flex sm:flex-row flex-col gap-2 justify-between">
        <div className="flex flex-row mb-1 sm:mb-0 gap-2 w-full">
          <div className="flex flex-col w-full">
            <label>
              <span className="hidden sm:inline-block text-white">
                Per Page
              </span>
            </label>
            <div className="relative">
              <select
                className="h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label>
              <span className="hidden sm:inline-block text-white">Status</span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setActive(e.target.value)}
                className="h-full rounded border-t sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value={"all"}>All</option>
                <option value={"true"}>Active</option>
                <option value={"false"}>Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label>
              <span className="hidden sm:inline-block text-white">
                Media Type
              </span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setType(e.target.value)}
                className="h-full rounded border-t sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value={"all"}>All</option>
                {Object.entries(MediaType).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label>
              <span className="hidden sm:inline-block text-white">
                Category
              </span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setTags(e.target.value)}
                className="h-full rounded border-t sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value="all">All</option>
                {Object.entries(MediaTags).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
