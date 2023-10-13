import React from 'react'

const ModalConfirm = ({ title, text, handleCloseModal, handleConfirm, action, color }) => {
    return (
        <div className="fixed z-40 inset-0 flex items-center justify-center animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseModal}></div>
            <div className="bg-white z-50 px-7 py-5 mx-auto rounded-lg shadow-lg flex flex-col gap-4 w-80 md:w-96 text-center">
                <h4 className="text-2xl font-semibold">{title}</h4>
                <p className="max-w-sm">{text}</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <button
                        onClick={handleCloseModal}
                        className="border px-3 py-2 border-gray-300 hover:bg-gray-100 rounded-md">
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-3 py-2 ${color} text-white rounded-md`}>
                        {action}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ModalConfirm