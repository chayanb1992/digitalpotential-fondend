import axios from "axios";
import { Upload, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";

export default function CreateStore() {
  const { userData } = useContext(AuthContex);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [telegram, setTelegram] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // Allow only images
    if (!selected.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Limit size (5MB)
    if (selected.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!storeName || !file) {
      alert("Store name and logo are required");
      return;
    }

    const formData = new FormData();
    // formData.append("store_name", storeName);
    // formData.append("description", description);
    // formData.append("rules", rules);
    // formData.append("telegram", telegram);
    formData.append("logo", file);

    try {
      // Upload image
      const uploadRes = await axios.post(
        "https://web-production-33681.up.railway.app/stores-images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Upload response:", uploadRes.data);

      const data = {
        store_name: storeName,
        owner_id: userData?.id,
        logo: uploadRes.data?.logo_url,
        description: description,
        rules: rules,
        telegram: telegram,
      };
      // console.log(data);
      // Save store in database
      const storeRes = await axios.post(
        "https://web-production-33681.up.railway.app/stores/",
        data,
      );

      console.log("Store created:", storeRes.data);

      axios
        .patch(
          `https://web-production-33681.up.railway.app/users/become-seller/${userData.id}`,
        )
        .then((res) => {
          console.log("Updated:", res.data);
        })
        .catch((err) => {
          console.error(err);
        });

      alert(
        "Your store application has been submitted successfully. It will be reviewed by admin.",
      );
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <h1 className="text-white text-xl font-semibold flex items-center gap-2">
          🏪 Create Your Own Store
        </h1>
      </div>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-md p-6 mt-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Upload Section */}
          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition">
              <Upload size={28} className="text-gray-400 mb-2" />

              <p className="text-sm text-gray-600">
                Click to upload or drag screenshot
              </p>

              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>

              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative border rounded-lg p-3">
              <img
                src={preview}
                alt="Payment Proof"
                className="w-full max-h-52 object-contain rounded"
              />

              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Form Fields */}
          <div className="md:col-span-2 space-y-4">
            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            {/* Store Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            {/* Purchase Rules */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purchase Rules
              </label>
              <textarea
                rows="3"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            {/* Telegram Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telegram Username
              </label>
              <div className="flex items-center border rounded-md px-2">
                <span className="text-gray-500 mr-1">@</span>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full p-2 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Only visible to admin
              </p>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        {/* <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
          <p className="text-gray-700">
            ℹ️ Notice: Applying for a store requires a one-time non-refundable
            fee of <b>$2.00</b>. Your current balance is <b>$0.00</b>.
          </p>

          <p className="text-red-500 mt-2">
            ⚠️ Insufficient Funds! You need to top up at least $2.00 more.
          </p>

          <div className="flex gap-3 mt-3">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              💳 Top Up Now
            </button>
            <span className="self-center text-gray-500">OR</span>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              💰 Earn via Referrals
            </button>
          </div>

          <div className="mt-3 p-3 border border-green-300 bg-green-50 rounded text-green-700">
            🏠 Tip: You can earn the application fee by sharing the site! Get
            5.0% commission on every purchase made by users you refer.
          </div>
        </div> */}

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            🚀 Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
