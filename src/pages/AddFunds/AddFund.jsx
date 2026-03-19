import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";
import binanceIcon from "../../assets/transiction/binance.svg";
import usdtIcon from "../../assets/transiction/usdt.svg";
import usdcIcon from "../../assets/transiction/usdc.svg";
import btcIcon from "../../assets/transiction/btc.svg";
import ethIcon from "../../assets/transiction/eth.svg";
import trxIcon from "../../assets/transiction/trx.svg";
import axios from "axios";

const imageMap = {
  "binance.png": binanceIcon,
  "usdt.png": usdtIcon,
  "usdc.png": usdcIcon,
  "usdtpolygon.png": usdcIcon,
  "usdctrc.png": ethIcon,
  "usdcbep.png": trxIcon,
  "bitcoin.png": btcIcon,
  "ethereum.png": usdcIcon,
  "tron.png": usdcIcon,
};
export default function AddFund() {
  const { userData, loading } = useContext(AuthContex);

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(10);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedNetwork, setSelectNetwork] = useState(null);
  const [selectAddresses, setSelectAddresses] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [note, setNote] = useState(null);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const amounts = [10, 20, 50, 100, 200, 500];

  const stepNames = ["Amount", "Type", "Method", "Payment", "Confirm"];

  const [paymentMethod, setPaymentMethod] = useState([]);
  // const [paymentNetwork, setPaymentNetwork] = useState([]);

  useEffect(() => {
    axios
      .get("https://web-production-33681.up.railway.app/paymentmethod")
      .then((res) => {
        setPaymentMethod(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/paymentnetwork")
  //     .then((res) => {
  //       setPaymentNetwork(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // console.log(paymentMethod[0]);
  // console.log(paymentNetwork[0]?.addresses);

  // const selectedNetworkData = paymentMethod?.networks?.find(
  //   (network) => network.id === selectedNetwork,
  // );
  // console.log(selectedNetwork);
  // console.log(selectedMethod);

  // const selectedNetworkData = paymentMethod
  //   .flatMap((method) => method.networks || [])
  //   .find((network) => network.id === selectedNetwork.id);
  // console.log("ok-11");
  // console.log(selectedNetworkData.addresses);

  const setSelect = (method) => {
    setSelectedMethod(method);
    setSelectNetwork(method.networks[0]);
    // console.log("ok");
    // console.log(method.networks[0].addresses);
    setSelectAddresses(method.networks[0].addresses[0]);
    // console.log(data[0]);
  };
  // console.log(userData.id);

  const create_panding_payment = async () => {
    if (processing) return;

    setProcessing(true);

    const payment_pending_data = {
      user_id: userData.id,
      method_id: selectedMethod.id,
      network_id: selectedNetwork.id,
      amount: amount,
      transaction_hash: transactionHash,
      note: note,
    };

    try {
      await axios.post(
        "https://web-production-33681.up.railway.app/payments",
        payment_pending_data,
      );
      setPaymentSubmitted(true);
    } catch (error) {
      console.log(error.response?.data);
    }

    setProcessing(false);
  };

  const [copied, setCopied] = useState(false);

  const address = "maawerawawingqowewdweew";

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <p>Loading...</p>;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  // if (step == 5) {
  //   create_panding_payment();
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Add Balance</h1>
          <p className="text-gray-500 text-sm">
            Top up your account balance with secure payment methods.
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-white shadow rounded-xl p-6 text-center mb-6">
          <p className="text-gray-500 text-sm">Your Current Balance</p>
          <h2 className="text-4xl font-bold text-blue-500">
            ${userData?.balance ?? 0}
          </h2>
        </div>

        {/* Step Progress */}
        <div className="flex justify-between mb-8 text-sm text-gray-400">
          {stepNames.map((name, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  i + 1 === step
                    ? "bg-blue-500 text-white"
                    : i + 1 < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
              <span className="mt-2">{name}</span>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white shadow rounded-xl p-8">
            <h3 className="text-lg font-semibold mb-4">Select Amount</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`border rounded-lg py-4 font-semibold transition ${
                    amount === a
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "hover:border-blue-400"
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 w-40">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="outline-none w-full"
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Select Payment Type</h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedType("crypto")}
                className={`p-6 rounded-lg border ${
                  selectedType === "crypto"
                    ? "bg-blue-500 text-white"
                    : "hover:border-blue-400"
                }`}
              >
                🪙 Crypto Payment
              </button>

              <button
                onClick={() => setSelectedType("manual")}
                className={`p-6 rounded-lg border ${
                  selectedType === "manual"
                    ? "bg-blue-500 text-white"
                    : "hover:border-blue-400"
                }`}
              >
                💳 Manual Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethod.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelect(method)}
                  className={`border rounded-lg p-4 text-left ${
                    selectedMethod?.id === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={imageMap[method.icon]}
                      alt={method.name}
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <div className="font-medium text-sm">{method.name}</div>
                      <div className="text-xs text-gray-500">
                        {/* {method.networks.map((network) => (
                          <p
                            key={network.id}
                            onClick={() => setSelectNetwork(network.id)}
                          >
                            {network.network_name}
                          </p>
                        ))} */}
                        {/* {method.networks.map((network) => ( */}
                        <p>{method.networks[0].network_name}</p>
                        {/* ))} */}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="bg-white shadow rounded-xl p-8">
            <div className="bg-white rounded-lg shadow">
              {/* Header */}
              <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
              <p className="text-gray-500 mb-6">
                Follow the instructions below to complete your payment.
              </p>

              {/* Payment Summary */}
              <div className="border rounded-lg p-4 mb-4">
                <p className="text-gray-600 text-sm">Payment Summary</p>
                <label className="block text-sm mt-2">Amount Sent</label>
                <input
                  type="text"
                  value={`$ ${amount}`}
                  readOnly
                  className="w-full border rounded p-2 mt-1 bg-gray-50"
                />
              </div>

              {/* Crypto Alert */}
              <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-4">
                <strong>Crypto Alert:</strong> Please send the exact amount
                shown above to the wallet address.
              </div>

              {/* Payment ID */}
              <div className="mb-4">
                <label className="block text-sm">Payment Method</label>
                <input
                  type="text"
                  value={selectedMethod.name}
                  readOnly
                  className="w-full border rounded p-2 mt-1 bg-gray-50"
                />
              </div>

              {/* Network */}
              <div className="mb-4">
                <label className="block text-sm">Network</label>
                <input
                  type="text"
                  value={selectedNetwork.network_name}
                  readOnly
                  className="w-full border rounded p-2 mt-1 bg-gray-50"
                />
              </div>

              {/* Send Payment To */}
              <div className="border rounded-lg p-4 mb-4">
                <p className="font-medium mb-2">Send Payment To</p>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={selectAddresses.wallet_address}
                    readOnly
                    className="flex-1 border rounded p-2 bg-gray-50"
                  />

                  <button
                    onClick={copyAddress}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    {copied ? "Copied" : "Copy Address"}
                  </button>
                </div>
              </div>

              {/* Advanced Verification */}
              <div className="border rounded-lg p-4 mb-4 bg-blue-50">
                <p className="font-medium mb-2">Advanced Verification</p>
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>Send the EXACT amount shown above.</li>
                  <li>Use the correct network.</li>
                  <li>Click Submit Payment if needed.</li>
                </ul>
              </div>

              {/* Transaction Hash */}
              <div className="mb-4">
                <label className="block text-sm">Transaction / Hash *</label>
                <input
                  type="text"
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="Enter transaction hash"
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              {/* Payment Screenshot */}
              {/* <div className="mb-4">
                <label className="block text-sm">
                  Payment Screenshot (Optional)
                </label>
                <input type="file" className="w-full border rounded p-2 mt-1" />
              </div> */}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm">
                  Any additional information
                </label>
                <textarea
                  rows="3"
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                ></textarea>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-5 text-center mb-6">
                <p className="font-semibold mb-2">Need Help?</p>
                <p className="text-sm mb-3">
                  Our support team is available 24/7 via Telegram.
                </p>

                <button className="bg-white text-indigo-600 px-4 py-2 rounded font-medium">
                  Contact Support
                </button>
              </div>

              {/* Footer */}
              {/* <div className="flex justify-between">
                <button className="text-gray-500 hover:underline">
                  ← Back
                </button>

                <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                  Submit Payment
                </button>
              </div> */}
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="bg-white shadow rounded-xl p-8 text-center">
            {!paymentSubmitted ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>

                <p className="font-bold">Amount: ${amount}</p>
                <p className="font-bold">Type: {selectedType}</p>
                <p className="font-bold">Method: {selectedMethod?.name}</p>

                <button
                  disabled={processing}
                  onClick={create_panding_payment}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600"
                >
                  Confirm & Submit Payment
                </button>
              </>
            ) : (
              <>
                <div className="text-green-600 text-5xl mb-4">✔</div>

                <h2 className="text-xl font-semibold mb-2">
                  Payment Submitted Successfully
                </h2>

                <p className="text-gray-600">
                  Your payment has been submitted and is currently under review.
                </p>

                <p className="text-gray-600 mt-2">
                  Our team will verify your transaction and update your balance
                  within
                  <span className="font-semibold"> 24 hours</span>.
                </p>

                <p className="text-gray-500 mt-4 text-sm">
                  You can track the status of your payment from your transaction
                  history.
                </p>
              </>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
          >
            ← Back
          </button>

          <button
            onClick={nextStep}
            disabled={
              (step === 2 && !selectedType) ||
              (step === 3 && !selectedMethod?.id)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-40"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
