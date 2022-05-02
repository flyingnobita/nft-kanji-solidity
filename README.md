# Mint AI Generated Kanji NFTs

![Sample Kanji](87-small.png)

A lot of NFT projects require their

## Architecture

There are 3 components to this project:

1. React for frontend
2. Cloudflare for server
3. Solidity for smart contract

## Setup

### Require

1. Contract Deployment/Owner Account
2. Server Signing Account
3. Payout Address
4. Contract Address
5. Contract ABI

### Procedure

1. Update `.env`
2. Update & deploy `Kanji.sol`
   1. `npx hardhat run scripts\01-deploy_kanji.ts --network localhost`
   2. Get <CONTRACT_ADDRESS>
3. Update & Deploy React App
   1. Update `Kanji.json` & Kanji address
4. Deploy Cloudflare Worker `index.js`
   1. `wrangler publish`
5. Update Cloudflare ENV variables (CONTRACT_ADDRESS & PRIVATE_KEY)
6. Update Cloudflare KV KANJI_SECRET

### Verify Contract on Etherscan

```shell
npx hardhat clean

npx hardhat verify --network rinkeby <CONTRACT_ADDRESS>
```
