import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const EditUserPopup = ({ onClose, onSave, initialUserData }) => {
  const [userData, setUserData] = useState(initialUserData || {});

  const handleChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(userData);
    onClose();
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <div className="flex justify-end">
          <CloseIcon onClick={onClose} className="cursor-pointer" />
        </div>
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="First Name"
          value={userData.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
     
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="Last Name"
          value={userData.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="Username"
          value={userData.userName || ""}
          onChange={(e) => handleChange("userName", e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="Title/Role"
          value={userData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="Phone Number"
          value={userData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="Country"
          value={userData.country || ""}
          onChange={(e) => handleChange("country", e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mb-4"
          placeholder="City"
          value={userData.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUserPopup;
