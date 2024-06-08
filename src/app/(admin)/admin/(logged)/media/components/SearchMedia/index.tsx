import { MediaTags, MediaType } from '@/@types/media';
import { Tag } from '@/@types/tag';
import { debounce } from '@/util/debounce';

type SearchMediaProps = {
  tags: Tag[];
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
  tags,
}: SearchMediaProps) => {
  return (
    <>
      <div>
        <div>
          <span className="text-white">Título</span>
        </div>
        <div className="relative block">
          <span className="absolute inset-y-0 left-0 flex h-full items-center pl-2">
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
                  : setSearch('');
              }, 1000)()
            }
            className="block w-full appearance-none rounded border border-b border-gray-400 bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="my-2 flex flex-col justify-between gap-2 sm:flex-row">
        <div className="mb-1 flex w-full flex-row gap-2 sm:mb-0">
          <div className="flex w-full flex-col">
            <label>
              <span className="hidden text-white sm:inline-block">
                Qtd por página
              </span>
            </label>
            <div className="relative">
              <select
                className="block h-full w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label>
              <span className="hidden text-white sm:inline-block">Status</span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setActive(e.target.value)}
                className="block h-full w-full appearance-none rounded border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-l focus:border-r focus:border-gray-500 focus:bg-white focus:outline-none sm:border-r-0"
              >
                <option value={'all'}>Tudo</option>
                <option value={'true'}>Ativo</option>
                <option value={'false'}>Inativo</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label>
              <span className="hidden text-white sm:inline-block">
                Tipo de Media
              </span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setType(e.target.value)}
                className="block h-full w-full appearance-none rounded border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-l focus:border-r focus:border-gray-500 focus:bg-white focus:outline-none sm:border-r-0"
              >
                <option value={'all'}>Tudo</option>
                {Object.entries(MediaType).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label>
              <span className="hidden text-white sm:inline-block">
                Categoria
              </span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => setTags(e.target.value)}
                className="block h-full w-full appearance-none rounded border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-l focus:border-r focus:border-gray-500 focus:bg-white focus:outline-none sm:border-r-0"
              >
                <option value="all">Tudo</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
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
