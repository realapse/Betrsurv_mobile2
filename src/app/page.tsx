"use client";
import { useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect({ chainId: "416002" }); // TestNet

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts: string[]) => {
      if (accounts.length) setAccount(accounts[0]);
    });

    peraWallet.connector?.on("disconnect", () => {
      setAccount(null);
    });
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      if (accounts.length) setAccount(accounts[0]);
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };

  const disconnect = () => {
    peraWallet.disconnect();
    setAccount(null);
  };

  const submitSurvey = () => {
    console.log("Truth submitted:", { account, answer });
    alert("Truth received. Thank you, Realapse.");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">B3TRSURV Mobile</h1>

      {!account ? (
        <button onClick={connectWallet} className="btn-blue">
          Connect Wallet
        </button>
      ) : (
        <div className="w-full max-w-md space-y-4">
          <p className="text-sm text-center">Connected: {account}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Speak your truth..."
            className="w-full p-2 bg-gray-900 text-white rounded"
            rows={4}
          />
          <button onClick={submitSurvey} className="btn-green w-full">
            Submit
          </button>
          <button onClick={disconnect} className="text-sm underline mt-2">
            Disconnect
          </button>
        </div>
      )}
    </main>
  );
}
