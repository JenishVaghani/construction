import * as React from "react";

export default function ConfirmField({
  open,
  handleClose,
  handleConfirm,
  message,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-red-50 rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative border border-red-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirmation
        </h2>
        <p className="text-gray-600">{message}</p>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 bg-gray-100 text-black rounded-lg hover:bg-gray-300 hover:text-black transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
