import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
import ItemDisplay from "./ItemDisplay";
import { Link } from "react-router-dom";
import { Helius } from "helius-sdk";

export default function Main() {
  const [nftItem, _setNftItems] = useState<any>([]);
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const walletAddress = localStorage.getItem('walletAddress') || useCanvasWallet().walletAddress;

  useEffect(() => {
    if (!walletAddress) {
      setNotify({
        message: 'Please connect your wallet to use application',
        type: 'error',
      })
      setTimeout(() => {
        setNotify({
          message: '',
          type: ''
        })
      }, 2000)
      return;
    }
    (async () => {

      const helius = new Helius(import.meta.env.VITE_REACT_HELIUS_API);
      const response = await helius.rpc.getAssetsByOwner({
        ownerAddress: walletAddress,
        page: 1,
      });
      console.log(response)
    })()
  }, [walletAddress]);

  return (

    <main className="pt-[3rem] pb-[5rem] text-white">
      <div className="flex flex-row justify-center items-center">

        {notify.type !== '' &&
          <div className={`${notify.type == "success" ? 'bg-green-500' : "bg-red-500"} w-[400px] shadow rounded-lg  p-3 absolute top-20`}>
            <p className='text-center'>{notify.message}</p>
          </div>
        }
      </div>

      <div className="mb-3 flex flex-col justify-center leading-tight items-center space-y-1">
        <h2 className="text-[100px] text-[#fdefd8] text-center font-extrabold camar-text">Votify</h2>
        <p className="text-[18px] text-[#fdefd8]   text-center camar-text w-6/12">
          AI Powered Governance Voting
        </p>

        <div className="flex flex-row  p-2 justify-center gap-x-2">

          <Link to="/market-place" className="p-3  shadow text-white rounded-xl text-[1.5rem] font-semibold hover:bg-[#e53d75]/90 bg-[#e53d75]">
            Create New Proposal
          </Link>
        </div>

      </div>


      {/* {startMint &&
        <NFTMint />
      } */}

      {/* {showMarketPlace &&
        <CreateMarketPlace setShowMarketPlace={setShowMarketPlace} shyft={shyft} />
      } */}


      {nftItem.length > 0 ?
        <ItemDisplay />
        :
        <></>
      }

    </main>
  );
}
