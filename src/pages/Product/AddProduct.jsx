import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContex } from "../../AuthContex/AuthContex";

/* Categories */
const categories = [
  { id: 1, name: "Instagram", slug: "instagram" },
  { id: 2, name: "Facebook", slug: "facebook" },
  { id: 3, name: "Gmail", slug: "gmail" },
];

/* Account Formats */
const accountFormats = {
  instagram: {
    placeholder: "username,password,2fa,email,email_password",
    example: `insta_user1,pass123,2fa123,email1@gmail.com,emailpass`,
    fields: ["username", "password", "twofa_code", "email", "email_password"],
  },
  facebook: {
    placeholder: "email,password,2fa",
    example: `fbuser1@gmail.com,password123,2fa123`,
    fields: ["email", "password", "twofa_code"],
  },
  gmail: {
    placeholder: "email,password,recovery_email",
    example: `gmail1@gmail.com,password123,recovery@gmail.com`,
    fields: ["email", "password", "recovery_email"],
  },
};

export default function AddProduct() {
  const { userData } = useContext(AuthContex);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    delivery: "manual", // ✅ default
  });

  const [accountsText, setAccountsText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /* Handle Input */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* Handle Image */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = accountFormats[formData.category];

    if (!config) {
      alert("Select category first");
      return;
    }

    /* Convert textarea → accounts array */
    const accounts = accountsText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const values = line.split(",");
        const account = {};

        config.fields.forEach((field, index) => {
          account[field] = values[index]?.trim();
        });

        return account;
      });

    try {
      /* 1️⃣ Upload Image */
      let imagePath = "";

      if (imageFile) {
        const imgForm = new FormData();
        imgForm.append("logo", imageFile);

        const uploadRes = await axios.post(
          "https://web-production-33681.up.railway.app/stores-images/",
          imgForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        imagePath = uploadRes.data.logo_url;
      }

      /* 2️⃣ CREATE CARD INFO FIRST */
      const productPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseInt(formData.price),
        image: imagePath,
        delivery: formData.delivery, // ✅ included
        seller_id: userData?.id,
      };
      // console.log(productPayload);

      const productRes = await axios.post(
        "https://web-production-33681.up.railway.app/card-info/",
        productPayload,
      );

      const cardInfoId = productRes.data.id;
      // console.log(cardInfoId);

      /* 3️⃣ API Map */
      const apiMap = {
        instagram: "https://web-production-33681.up.railway.app/instagram/",
        facebook: "https://web-production-33681.up.railway.app/facebook/",
        gmail: "https://web-production-33681.up.railway.app/gmail/",
      };

      const apiUrl = apiMap[formData.category];

      /* 4️⃣ SEND ACCOUNTS WITH cardInfo_id */
      await Promise.all(
        accounts.map((acc) =>
          axios.post(apiUrl, {
            ...acc,
            sold: false,
            seller_id: userData?.id,
            cardInfo_id: cardInfoId,
          }),
        ),
      );

      alert(`Product created with ${accounts.length} accounts`);

      /* Reset */
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        delivery: "manual",
      });

      setAccountsText("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Product Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Delivery */}
          <div>
            <label className="block mb-1 font-medium">Delivery Type</label>
            <select
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-3 w-40 h-40 object-cover rounded"
              />
            )}
          </div>

          {/* Accounts */}
          <div>
            <label className="block mb-1 font-medium">Accounts</label>
            <textarea
              rows="8"
              value={accountsText}
              placeholder={
                accountFormats[formData.category]?.placeholder ||
                "Select category first"
              }
              onChange={(e) => setAccountsText(e.target.value)}
              className="w-full border p-3 rounded"
            />

            {formData.category && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Example format</p>
                <pre className="bg-gray-100 p-3 text-sm rounded mt-2">
                  {accountFormats[formData.category]?.example}
                </pre>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
