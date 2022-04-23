## Setup

### Require

1. Contract Deployment/Owner Account
2. Server Signing Account
3. Payout Address
4. Payout Dev Address
5. Contract Address
6. Contract ABI

### Procedure

1. Update `.env`
2. Update & deploy `Kenji.sol`
   1. `npx hardhat run scripts\01-deploy_kanji.ts --network localhost`
   2. Get **CONTRACT ADDRESS**
3. Update & deploy `page_mint.html`
4. Deploy `index.js` to Cloudflare
   1. `wrangler publish`
5. Update Cloudflare ENV variables
6. Update Cloudflare KANJI_SECRET
