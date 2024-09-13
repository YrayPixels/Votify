
import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
import PersonalItemDisplay from "./PersonalItemDisplay";
import { fetchListings, fetchUserListings, getListedItem, } from "../requestsHandler/requestsItems";
import { Helius } from "helius-sdk";
import { Link } from "react-router-dom";
import CustomInput from "./customInput/customInput";
import AiBot from "./AiBot/AiBot";

export default function Proposals() {
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const canvas = useCanvasWallet()
  const walletAddress = localStorage.getItem('walletAddress') || canvas.walletAddress;

  const shyft = canvas.marketSDK;

  const [startAi, setStartAi] = useState(false)


  const [userNfts, setUserNfts] = useState<any>([]);
  const [listings, setListings] = useState<any>([]);
  const [showPersonalNFTs, setShowPersonalNFTs] = useState(false);
  const [activeTabs, setActiveTabs] = useState('marketItems');
  const [showItem, setShowItem] = useState(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [startUnlist, setStartUnlist] = useState(false);


  const { update } = useCanvasWallet()

  const helius = new Helius(import.meta.env.VITE_REACT_HELIUS_API);


  // useEffect(() => {
  //   if (!walletAddress) {
  //     setNotify({
  //       message: 'Please connect your wallet to use application',
  //       type: 'error',
  //     })
  //     setTimeout(() => {
  //       setNotify({
  //         message: '',
  //         type: ''
  //       })
  //     }, 2000)
  //     return;
  //   }
  // }, [walletAddress]);

  // useEffect(() => {
  //   (async () => {
  //     if (!walletAddress) {
  //       let canvasItem = await canvas.connectWallet()
  //       if (canvasItem) {
  //         if (activeTabs == "marketItems") {
  //           fetchMarketListings()
  //         } else if (activeTabs == "personalItems") {
  //           fetchPersonalListings()
  //         }
  //       }
  //     } else {
  //       if (activeTabs == "marketItems") {
  //         fetchMarketListings()
  //       } else if (activeTabs == "personalItems") {
  //         fetchPersonalListings()
  //       }
  //     }
  //   })()
  // }, [activeTabs, update, walletAddress])

  // const getUserNFTs = async () => {
  //   setLoading(true)
  //   if (!walletAddress) {
  //     let canvasItem = await canvas.connectWallet()
  //     if (canvasItem) {
  //       const nfts = await shyft.nft.compressed.readAll({
  //         walletAddress: walletAddress
  //       })
  //       let itemsLoaded =
  //         await Promise.all(
  //           nfts.map(async (item) => {
  //             let response = await getListedItem(item?.mint)
  //             if (response?.data?.status !== "success") {
  //               return item;
  //             }
  //           })
  //         )
  //       itemsLoaded = itemsLoaded.filter(item => item !== undefined);
  //       setUserNfts(itemsLoaded)

  //       setLoading(false);
  //       // setUserNfts(itemsLoaded);
  //     }
  //   } else {

  //     const response = await helius.rpc.getAssetsByOwner({
  //       ownerAddress: walletAddress,
  //       page: 1,
  //     });

  //     //files
  //     //links
  //     //id
  //     //metadata

  //     let nfts = response.items
  //     let itemsLoaded =
  //       await Promise.all(
  //         nfts.map(async (item) => {
  //           let response = await getListedItem(item?.id)
  //           if (response?.data?.status !== "success") {
  //             return item;
  //           }
  //         })
  //       )

  //     itemsLoaded = itemsLoaded.filter(item => item !== undefined);
  //     setUserNfts(itemsLoaded)
  //     setLoading(false);
  //   }


  // }

  // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // const fetchMarketListings = async () => {
  //   setLoading(true);
  //   const getMarketListings = await fetchListings();

  //   const items = [];
  //   for (const item of getMarketListings.data) {
  //     await delay(500); // Adjust the delay time (500ms in this example)
  //     const downloaded = await helius.rpc.getAsset({ id: item.asset_mint })

  //     const sentItem = { nftData: downloaded, marketplaceData: item };
  //     items.push(sentItem);
  //   }
  //   setListings(items);

  //   if (items.length == getMarketListings.data.length) {
  //     setLoading(false);
  //   }
  // }

  // const fetchPersonalListings = async () => {
  //   setLoading(true);
  //   const getMarketListings = await fetchUserListings(walletAddress);
  //   const items = [];
  //   for (const item of getMarketListings.data) {
  //     await delay(500); // Adjust the delay time (500ms in this example)

  //     const downloaded = await helius.rpc.getAsset({ id: item.asset_mint })

  //     const sentItem = { nftData: downloaded, marketplaceData: item };
  //     items.push(sentItem);
  //   }
  //   setListings(items);
  //   if (items.length == getMarketListings.data.length) {
  //     setLoading(false);
  //   }

  // }

  return (

    <main className="pt-[3rem] pb-[5rem] text-white">
      <div className="flex flex-row justify-center items-center">

        {notify.type !== '' &&
          <div className={`${notify.type == "success" ? 'bg-green-500' : "bg-red-500"} w-[400px] shadow rounded-lg  p-3 absolute top-20`}>
            <p className='text-center'>{notify.message}</p>
          </div>
        }
      </div>


      <div className="mb-3 grid grid-cols-3 gap-x-2">

        <div className="flex flex-col col-span-2  space-y-4">

          <div className="bg-white/5 p-5 rounded-xl">
            <div className="text-[20px] font-bold">Trial Budget: Jup & Juice WG (JJWG)</div>
            <div className="space-x-4 py-2 flex flex-wrap">

              <Link to="/market-place" className="p-3 underline  text-[#73dca5] rounded-xl text-[1.5rem] font-semibold">
                View full Proposal
              </Link>

              <button onClick={() => setStartAi(true)} className="p-3 text-[#73dca5] rounded-xl text-[1.5rem] font-semibold border border-[#73dca5]">
                Analyze with AI
              </button>
            </div>

          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <div className="text-[14px] flex flex-row justify-between">
              <p>Cast Your Vote</p>
              <p>Voting power ---</p>
            </div>
            <div className="space-x-4 py-2">

            </div>

          </div>
        </div>

        <div className="bg-white/5 p-5 rounded-xl">
          <div className="flex flex-row  justify-between">
            <p>Results</p>
            <p>29994 Votes</p>
          </div>

        </div>




      </div>

      {startAi &&
        <div>
          {/* AI Chat */}
          <AiBot startAi={startAi} setStartAi={setStartAi} />
        </div>
      }

    </main>
  );
}
