import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "rPiGGrt-RLmI-yZ8YHviZN7zBAJPhBsh",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

// get all NFTs owned by the provided address or ENS domain
const nfts = alchemy.nft.getNftsForOwner("vitalik.eth");