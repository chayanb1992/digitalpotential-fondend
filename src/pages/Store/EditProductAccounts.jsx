import axios from "axios";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { useParams } from "react-router";
import { AuthContex } from "../../AuthContex/AuthContex";

export default function EditProductAccounts() {
  const { cardId } = useParams();
  const { userData } = useContext(AuthContex); // ✅ get seller

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  /* Bulk Add States */
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [adding, setAdding] = useState(false);

  /* ---------------- Fetch Accounts ---------------- */
  const fetchAccounts = () => {
    setLoading(true);

    axios
      .get(`https://web-production-33681.up.railway.app/instagram/${cardId}/`)
      .then((res) => setAccounts(res.data))
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (cardId) fetchAccounts();
  }, [cardId]);

  /* ---------------- Bulk Add ---------------- */
  const handleBulkAdd = async () => {
    if (!bulkText.trim()) {
      alert("Please enter account data");
      return;
    }

    let parsedAccounts = [];

    try {
      const lines = bulkText.split("\n").filter((line) => line.trim() !== "");

      parsedAccounts = lines.map((line, index) => {
        const parts = line.split(",");

        if (parts.length < 2) {
          throw new Error(`Invalid format on line ${index + 1}`);
        }

        return {
          seller_id: userData?.id, // ✅ added
          cardInfo_id: parseInt(cardId), // ✅ added
          username: parts[0]?.trim(),
          password: parts[1]?.trim(),
          twofa_code: parts[2]?.trim() || "",
          sold: false,
          email: parts[3]?.trim() || "",
          email_password: parts[4]?.trim() || "",
        };
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    try {
      setAdding(true);
      // console.log(parsedAccounts);

      await Promise.all(
        parsedAccounts.map((acc) =>
          axios.post(
            `https://web-production-33681.up.railway.app/instagram/`,
            acc,
          ),
        ),
      );

      alert("Accounts added successfully ✅");

      setBulkText("");
      setShowBulkInput(false);
      fetchAccounts();
    } catch (err) {
      console.error(err);
      alert("Failed to add some accounts ❌");
    } finally {
      setAdding(false);
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this account?")) return;

    try {
      await axios.delete(
        `https://web-production-33681.up.railway.app/instagram/${id}/`,
      );
      setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const currentAccounts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return accounts.slice(start, start + itemsPerPage);
  }, [accounts, currentPage]);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Accounts...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ================= BULK ADD ================= */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Accounts ({accounts.length})</h2>

          <button
            onClick={() => setShowBulkInput(!showBulkInput)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {showBulkInput ? "Cancel" : "+ Add Accounts"}
          </button>
        </div>

        {showBulkInput && (
          <div>
            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`username,password,2fa,email,email_password`}
              className="w-full border p-3 rounded mb-3 font-mono text-sm"
            />

            <button
              onClick={handleBulkAdd}
              disabled={adding}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {adding ? "Adding..." : "Submit Accounts"}
            </button>
          </div>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Username</th>
              <th className="p-3">Password</th>
              <th className="p-3">Email</th>
              <th className="p-3">2FA</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentAccounts.map((acc, index) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

              return (
                <tr key={acc.id} className="border-t">
                  <td className="p-3">{globalIndex}</td>
                  <td className="p-3">{acc.username}</td>
                  <td className="p-3">{acc.password}</td>
                  <td className="p-3">{acc.email}</td>
                  <td className="p-3">{acc.twofa || "-"}</td>
                  <td className="p-3">
                    {acc.sold ? (
                      <span className="text-red-500">Sold</span>
                    ) : (
                      <span className="text-green-600">Available</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
