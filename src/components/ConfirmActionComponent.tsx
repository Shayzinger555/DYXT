const ConfirmComponent = ({ cancelFunction, continueFunction, text }) => {
  return (
    <div>
      <div
        className=" flex items-center justify-center z-[100] fixed top-0 left-0 right-0 min-h-[100vh]"
        style={{ backgroundColor: "rgba(156, 163, 175, 0.7)" }}
      >
        <div className="bg-gray-800 w-[85vw] sm:w-2/4 flex flex-col justify-between  min-h-[30vh] rounded-[4vh] p-4">
          <h1 className="text-[2rem] text-white">{text && text}</h1>
          <div className="w-full flex justify-end gap-6">
            <button
              onClick={cancelFunction}
              className="border rounded-xl border-black bg-red-400 text-white p-3 "
            >
              Cancel
            </button>
            <button
              onClick={continueFunction}
              className="border rounded-xl px-6 text-white border-white "
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmComponent;
