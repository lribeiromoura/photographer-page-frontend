import { Media, MediaType } from '@/@types/media';
import { useMediaTags } from '@/hooks/useTags';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type AddMediaProps = {
  isOpen: boolean;
  handleAddMedia: (file?: File) => void;
  handleCancel: () => void;
  setSelectedPhoto: (photo: Media) => void;
  selectedPhoto: Media;
  editMode?: boolean;
  addEditLoading: boolean;
};

export const AddMedia = ({
  isOpen,
  selectedPhoto,
  setSelectedPhoto,
  handleAddMedia,
  handleCancel,
  editMode,
  addEditLoading,
}: AddMediaProps) => {
  const { tags } = useMediaTags();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onCancel = () => {
    setSelectedPhoto({} as Media);
    setFile(null);
    setPreview(null);
    handleCancel();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDisable = useCallback(() => {
    return !selectedPhoto.name || !selectedPhoto.type || !selectedPhoto.tags;
  }, [selectedPhoto]);

  const onAddMedia = useCallback(async () => {
    if (file) {
      setSelectedPhoto({
        ...selectedPhoto,
        filename: editMode ? selectedPhoto.filename : file?.name,
      });
      handleAddMedia(file);
    } else if (editMode) {
      if (selectedPhoto.data) {
        handleAddMedia();
      }
    }
  }, [file, selectedPhoto, handleAddMedia]);

  useEffect(() => {
    if (addEditLoading) {
      return;
    }
    if (selectedPhoto.data && editMode) {
      const imageUrl = `data:image/jpeg;base64,${selectedPhoto.data}`;
      setPreview(imageUrl);
      return;
    } else if (!editMode && !preview) {
      setPreview(null);
    }
  }, [selectedPhoto]);

  return (
    isOpen && (
      <main className="bg-transparent-900 absolute left-0 top-0 h-full w-full self-center overflow-x-hidden font-sans text-gray-900 antialiased">
        <div className="relative min-h-screen md:flex md:items-center md:justify-center">
          <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-25"></div>
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-gray-100 p-4 md:relative">
            <div className="items-center md:flex">
              <div className="text-center md:text-left">
                <p className="font-bold">Adicionar media</p>
              </div>
            </div>
            <form>
              <div className="mt-3 block gap-4 xl:grid xl:grid-flow-col">
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Nome
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.name || ''}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        name: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-full">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Descrição
                  </label>
                  <input
                    id="1"
                    type="text"
                    value={selectedPhoto?.description || ''}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        description: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="mt-3 block gap-4 xl:grid xl:grid-flow-col">
                {
                  <div className="group relative min-w-72 md:w-80 lg:w-full">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                      Arquivo
                    </label>
                    {preview ? (
                      <div className="mb-3 flex justify-center">
                        <Image
                          className="border-2"
                          alt=""
                          width={100}
                          height={100}
                          src={preview}
                        />
                        <button
                          onClick={() => {
                            setPreview(null);
                            setFile(null);
                          }}
                          className="absolute right-0 top-6 rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    ) : (
                      <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                      />
                    )}
                  </div>
                }
              </div>
              <div className="mt-3 block gap-4 xl:grid xl:grid-flow-col">
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Publicado
                  </label>
                  <input
                    id="1"
                    type="checkbox"
                    checked={selectedPhoto.isPublished ? true : false}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        isPublished: e.target.checked,
                      })
                    }
                    className="focus:bg-purple peer h-10 w-10 rounded-md bg-gray-50 px-4 accent-purple-200 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Tag
                  </label>
                  <select
                    id="1"
                    multiple={false}
                    value={selectedPhoto.tags || ''}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        tags: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  >
                    <option value={''}>Select Tag</option>
                    {tags.map((tag) => (
                      <option key={tag.name} value={tag.name} className="">
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="group relative min-w-72 md:w-80 lg:w-96">
                  <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                    Tipo
                  </label>
                  <select
                    id="1"
                    value={selectedPhoto.type || ''}
                    onChange={(e) =>
                      setSelectedPhoto({
                        ...selectedPhoto,
                        type: e.target.value,
                      })
                    }
                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                  >
                    <option value={''}>Select Type</option>
                    {Object.entries(MediaType).map(([key, value]) => (
                      <option key={key} value={key} className="">
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <div className="mt-4 text-center md:flex md:justify-end md:text-right">
              <button
                onClick={onAddMedia}
                disabled={handleDisable()}
                className="block w-full rounded-lg bg-purple-200 px-4 py-3 text-sm font-semibold text-purple-700 disabled:opacity-50 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
              >
                Adicionar
              </button>
              <button
                onClick={onCancel}
                className="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold md:order-1 md:mt-0 md:inline-block md:w-auto md:py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  );
};
