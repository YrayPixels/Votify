import { BN, Program } from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js";


export const fetchProposals = async (program: Program) => {

    try {
        let programs = await program?.account?.proposal.all();
        return programs;
    } catch (error) {
        console.log("Error fetching proposals", error);
        return error;
    }
}

export const castVote = async () => {

}

export const updateProposals = async () => {

}

export const fetchPersonalProposals = async () => {

}

export const fetchVotingAnalytics = async () => {

}
interface Proposal {
    title: string;
    description: string;
    options: string[];
    externalLink: string;
    user: string;
    program: Program;
}
export const newProposal = async ({ title, description, options, externalLink, user, program }: Proposal) => {

    let uniqueId = new BN(new Date().getTime()).toNumber();
    uniqueId = Math.floor(Date.now() / 1000);
    const uniqueIdBuffer = Buffer.alloc(8);
    uniqueIdBuffer.writeUInt32LE(uniqueId, 0);

    const userPubkey = new PublicKey(user)
    const [proposalPDA, proposalBump] = await PublicKey.findProgramAddress(
        [
            Buffer.from("proposal"), // First seed (matches the Rust side)
            uniqueIdBuffer,
            userPubkey.toBuffer(), // Third seed (user's public key)
        ],
        program.programId
    );

    console.log(proposalBump);
    const txHash = await program.methods
        .createProposal(
            new BN(uniqueId),
            title,
            externalLink,
            description,
            options
        )
        .accounts({
            dao: new PublicKey("8fEQu9YTUjMhNsYF7bGTn8WYdewhhrMSPQxyCbHmNkNJ"),
            proposal: proposalPDA,
            user: new PublicKey(user),
        }).transaction()

    return txHash;
}