"use client";
import { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect({ chainId: "416002" });

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) setAccount(accounts[0]);
    });
    peraWallet.connector?.on("disconnect", () => setAccount(null));
  }, []);

  const connectWallet = async () => {
    const accounts = await peraWallet.connect();
    if (accounts.length) setAccount(accounts[0]);
  };

  const disconnect = () => peraWallet.disconnect();

  const submitSurvey = () => {
    console.log("Submitted:", { account, answer });
    alert("Thank you for your truth, Realapse.");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">B3TRSURV Mobile</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="btn-blue"
        >
          Connect Pera Wallet
        </button>
      ) : (
        <div className="w-full max-w-md space-y-4">
          <p>Connected: {account}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
            rows={4}
            placeholder="Speak your truth..."
          />
          <button
            onClick={submitSurvey}
            className="btn-green w-full"
          >
            Submit
          </button>
          <button
            onClick={disconnect}
            className="text-sm underline mt-2"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </main>
  );
}
