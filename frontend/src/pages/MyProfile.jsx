import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-xl bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-100/50 flex flex-col gap-6 animate-fade-in-up text-sm">
        {/* Avatar Upload / Preview */}
        <div className="flex items-center gap-5">
          {isEdit ? (
            <label htmlFor="image" className="relative group cursor-pointer w-28 h-28 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-primary transition-colors flex items-center justify-center bg-gray-50/50">
              <img
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Avatar"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
                <img className="w-8 drop-shadow-md" src={assets.upload_icon} alt="Upload" />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-28 h-28 rounded-2xl object-cover border border-gray-100 shadow-sm" src={userData.image} alt="Profile" />
          )}

          {/* Name Info */}
          <div className="flex-1">
            {isEdit ? (
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xl font-bold text-gray-800 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 outline-none transition-all duration-200"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {userData.name}
              </h2>
            )}
            <p className="text-gray-400 font-semibold mt-1">Patient Profile</p>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_2.5fr] gap-y-4 gap-x-2 mt-4 text-gray-700">
            <span className="font-bold text-gray-400 flex items-center">Email id:</span>
            <span className="text-primary font-semibold break-all flex items-center">{userData.email}</span>
            
            <span className="font-bold text-gray-400 flex items-center">Phone:</span>
            {isEdit ? (
              <input
                className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <span className="text-gray-700 font-semibold flex items-center">{userData.phone}</span>
            )}
            
            <span className="font-bold text-gray-400 flex items-start mt-2">Address:</span>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2 text-sm text-gray-800 outline-none transition-all duration-200"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  value={userData.address.line1}
                  placeholder="Address Line 1"
                  type="text"
                />
                <input
                  className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2 text-sm text-gray-800 outline-none transition-all duration-200"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  value={userData.address.line2}
                  placeholder="Address Line 2"
                  type="text"
                />
              </div>
            ) : (
              <span className="text-gray-500 font-medium leading-relaxed">
                {userData.address?.line1}
                {userData.address?.line2 && <><br />{userData.address?.line2}</>}
              </span>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
            BASIC INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_2.5fr] gap-y-4 gap-x-2 mt-4 text-gray-700">
            <span className="font-bold text-gray-400 flex items-center">Gender:</span>
            {isEdit ? (
              <select
                className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span className="text-gray-700 font-semibold flex items-center">{userData.gender}</span>
            )}
            
            <span className="font-bold text-gray-400 flex items-center">Birthday:</span>
            {isEdit ? (
              <input
                className="w-full border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-primary focus:ring-3 focus:ring-primary/5 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all duration-200"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <span className="text-gray-700 font-semibold flex items-center">{userData.dob}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-50 flex justify-end">
          {isEdit ? (
            <button
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-sm font-bold shadow-md shadow-primary/10 transition-all active:scale-95 cursor-pointer"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
