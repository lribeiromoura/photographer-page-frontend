import { Media } from "@/@types/media";
import { ConfirmModal } from "@/app/(admin)/admin/(logged)/components/ConfirmModal";
import { NotFound } from "@/app/(admin)/admin/(logged)/components/NotFound";

type MediaTableProps = {
  photos: Media[];
  page: number;
  perPage: number;
  setPage: (value: number) => void;
  count: number;
  setOpenConfirmModal: (value: boolean) => void;
  openConfirmModal: boolean;
  setSelectedPhoto: (value: Media) => void;
  handleDelete: () => void;
  handleEdit: () => void;
};

export const MediaTable = ({
  photos,
  page,
  perPage,
  setPage,
  count,
  openConfirmModal,
  setOpenConfirmModal,
  setSelectedPhoto,
  handleDelete,
  handleEdit,
}: MediaTableProps) => {
  const selectPhoto = (photo: Media, type: string) => {
    setSelectedPhoto(photo);
    if (type === "delete") {
      setOpenConfirmModal(true);
      return;
    }
    handleEdit();
  };

  return (
    <>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {photos.length === 0 && (
            <NotFound
              title="No Media Found"
              description="There are no media found. Please add media, or use different filters."
            />
          )}
          {photos.length > 0 && (
            <>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Link
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {photos.map((photo) => (
                    <tr key={photo._id}>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {photo.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {photo.description}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              photo.isPublished ? "bg-green-200" : "bg-red-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span
                            className={`relative ${
                              photo.isPublished
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {photo.isPublished ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {photo.tags}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {photo.createdAt &&
                            new Date(photo.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {photo.url}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <div className="flex gap-2">
                          <button onClick={() => selectPhoto(photo, "edit")}>
                            <svg
                              className="h-8 w-8 text-purple-500"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button onClick={() => selectPhoto(photo, "delete")}>
                            <svg
                              className="h-8 w-8 text-red-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <circle cx="12" cy="12" r="10" />{" "}
                              <line x1="15" y1="9" x2="9" y2="15" />{" "}
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-4 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900"></span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    onClick={() => setPage(page + 1)}
                    disabled={count / perPage <= page}
                  >
                    Next
                  </button>
                </div>
                <div className="text-xs xs:text-sm text-gray-900 my-2">
                  Total {count} media found
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        title="Delete Media"
        message="Are you sure you want to delete this media?"
        isOpen={openConfirmModal}
        onConfirm={() => handleDelete()}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </>
  );
};
