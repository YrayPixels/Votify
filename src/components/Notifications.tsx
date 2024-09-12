import { useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";

export default function Notifications() {
  const [menu, showMenu] = useState(false);
  const wallet = useCanvasWallet()

  const connectWallet = async () => {
    try {
      await wallet.connectWallet();

    } catch (error) {
      console.log(error);
    }
  }



  // async function copyClip(text: string) {

  //     await CanvasClient?.ready();
  //     console.log("CanvasClient is ready");
  //     let textCopied = await CanvasClient?.copyToClipboard(text)
  //     console.log(textCopied);

  // }
  return (
    <div className='flex relative items-center'>
      <button onClick={() => {
        wallet.walletAddress ?
          showMenu(true) : connectWallet();
      }} className="text-[#73dca5] w-fit p-2 rounded-xl text-[1.5rem] font-semibold border border-[#73dca5]">
        {wallet.walletAddress ? `${wallet.walletAddress.slice(0, 4)}...${wallet.walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>
      {menu &&
        <div className=" absolute bg-[#e53d75] p-4  rounded-xl font-bold  text-white top-[40px]">
          <p className="cursor-pointer" onClick={() => {

          }} >
            Copy address
          </p>
          <p className="cursor-pointer" onClick={() => {
            wallet.disconnectWallet();
            showMenu(false);
          }}>
            Disconnect
          </p>
          <p className="cursor-pointer" onClick={() => {
            connectWallet();
            showMenu(false);
          }}>
            Change Wallet
          </p>
        </div>
      }
    </div>
  )
}
