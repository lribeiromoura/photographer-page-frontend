import { Profile } from '@/@types/profile';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type AddProfileProps = {
  isOpen: boolean;
  handleAddProfile: (file?: File) => void;
  handleCancel: () => void;
  setSelectedProfile: (photo: Profile) => void;
  selectedProfile: Profile;
  editMode?: boolean;
  addEditLoading: boolean;
};

export const AddProfile = ({
  isOpen,
  selectedProfile,
  setSelectedProfile,
  handleAddProfile,
  handleCancel,
  editMode,
  addEditLoading,
}: AddProfileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onCancel = () => {
    setSelectedProfile({} as Profile);
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
    return !selectedProfile.name || !selectedProfile.description;
  }, [selectedProfile]);

  const onAddProfile = useCallback(async () => {
    if (file) {
      setSelectedProfile({
        ...selectedProfile,
      });
      handleAddProfile(file);
    }
  }, [file, selectedProfile, handleAddProfile]);

  useEffect(() => {
    if (addEditLoading) {
      return;
    }
    if (selectedProfile.data && editMode) {
      const imageUrl = `data:image/jpeg;base64,${selectedProfile.data}`;
      setPreview(imageUrl);
      return;
    } else if (!editMode && !preview) {
      setPreview(null);
    }
  }, [selectedProfile]);

  return (
    isOpen && (
      <main className="bg-transparent-900 absolute left-0 top-0 h-full w-full self-center overflow-x-hidden font-sans text-gray-900 antialiased">
        <div className="relative min-h-screen md:flex md:items-center md:justify-center">
          <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-25"></div>
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-gray-100 p-4 md:relative">
            <div className="items-center md:flex">
              <div className="text-center md:text-left">
                <p className="font-bold">Profile</p>
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
                    value={selectedProfile?.name || ''}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
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
                    value={selectedProfile?.description || ''}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
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
                    checked={selectedProfile.isPublished ? true : false}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
                        isPublished: e.target.checked,
                      })
                    }
                    className="focus:bg-purple peer h-10 w-10 rounded-md bg-gray-50 px-4 accent-purple-200 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </form>
            <div className="relative mt-4 flex flex-col text-center md:flex md:justify-end md:text-right">
              <button
                onClick={onAddProfile}
                disabled={handleDisable()}
                className="mr-5 block w-full rounded-lg bg-purple-200 px-4 py-3 text-sm font-semibold text-purple-700 disabled:opacity-50 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
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
