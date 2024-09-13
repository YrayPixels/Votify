import { useEffect, useState } from "react";
import useCanvasWallet from "./CanvasWalletAdapter";
import { Link } from "react-router-dom";
import AiBot from "./AiBot/AiBot";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { RPC } from "../requestsHandler";
import { DaoVoting, IDL } from "../requestsHandler/DAO_IDL/dao_voting";

const connection = new Connection(RPC, 'confirmed');

export default function Proposals() {
  const [notify, setNotify] = useState({
    message: '',
    type: ''
  })

  const [startAi, setStartAi] = useState(false)

  const [loading, setLoading] = useState(false);

  const [anchorProgram, setAnchorProgram] = useState<any>(null)

  const wallet = useCanvasWallet()

  useEffect(() => {
    (async () => {
      if (!wallet.walletAddress) {
        await wallet.connectWallet();
      }

      const anchorProvider = new AnchorProvider(connection, wallet, {});
      if (!anchorProvider) {
        return;
      }
      const programId = new PublicKey("AvxgDjZnQSYYhMCu8fCcRG7NMevifPp4yC8y8KfjMYfy");
      const program = new Program<DaoVoting>(IDL, programId, anchorProvider);
      setAnchorProgram(program)
    })()
  }, [])



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
