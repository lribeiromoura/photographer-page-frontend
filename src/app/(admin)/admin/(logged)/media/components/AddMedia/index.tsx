import { Media, MediaType } from '@/@types/media';
import { useMediaTags } from '@/hooks/useTags';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
      if (
        selectedFile.type !== 'image/jpeg' &&
        selectedFile.type !== 'image/png'
      ) {
        toast.error('Arquivo inválido');
        return;
      }
      if (selectedFile.size > 3000000) {
        toast.error('Arquivo maior que 3MB');
        return;
      }

      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDisable = useCallback(() => {
    return !selectedPhoto.name || !selectedPhoto.type || !selectedPhoto.tagId;
  }, [selectedPhoto]);

  const onAddMedia = useCallback(async () => {
    if (file && selectedPhoto.type === 'PHOTO') {
      setSelectedPhoto({
        ...selectedPhoto,
        filename: editMode ? selectedPhoto.filename : file?.name,
      });
      handleAddMedia(file);
    } else if (selectedPhoto.type === 'VIDEO') {
      handleAddMedia();
    } else if (editMode) {
      if (selectedPhoto.data) {
        handleAddMedia();
      }
    } else {
      handleAddMedia();
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
              <div className="group relative min-w-72 md:w-80 lg:w-96">
                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                  Tipo
                </label>
                <select
                  id="1"
                  value={selectedPhoto.type || ''}
                  disabled={editMode}
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

              <div className="mt-3 block gap-4 xl:grid xl:grid-flow-col">
                {selectedPhoto.type === 'PHOTO' && (
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
                        className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mt-3 block gap-4 xl:grid xl:grid-flow-col">
                {selectedPhoto.type === 'VIDEO' && (
                  <div className="group relative min-w-72 md:w-80 lg:w-full">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                      URL Youtube
                    </label>
                    <input
                      id="file"
                      type="text"
                      value={selectedPhoto.srcVideo || ''}
                      onChange={(e) =>
                        setSelectedPhoto({
                          ...selectedPhoto,
                          srcVideo: e.target.value,
                        })
                      }
                      className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                )}
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
                {selectedPhoto.type && (
                  <div className="group relative min-w-72 md:w-80 lg:w-96">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-purple-400">
                      Tag
                    </label>
                    <select
                      id="1"
                      multiple={false}
                      value={selectedPhoto.tagId || ''}
                      onChange={(e) =>
                        setSelectedPhoto({
                          ...selectedPhoto,
                          tagId: e.target.value,
                        })
                      }
                      className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-purple-400"
                    >
                      <option value={''}>Select Tag</option>
                      {tags.map(
                        (tag) =>
                          tag.type === selectedPhoto.type && (
                            <option key={tag._id} value={tag._id} className="">
                              {tag.name}
                            </option>
                          ),
                      )}
                    </select>
                  </div>
                )}
              </div>
            </form>
            <div className="mt-4 flex flex-col justify-end gap-2 text-center">
              <button
                onClick={onCancel}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Cancelar
              </button>
              <button
                onClick={onAddMedia}
                disabled={handleDisable()}
                className={`rounded-md bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                  handleDisable() ? 'cursor-not-allowed' : ''
                }`}
              >
                {editMode ? 'Editar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  );
};
