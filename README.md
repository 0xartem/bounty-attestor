<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Bounty Attestor</h3>

  <p align="center">
    Bounty Attestor is built with Optimism Attestation Station to endorse bounty winners
    <br />
    <br />
    <a href="https://bounty-attestor.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/0xartem/bounty-attestor/issues">Report Bug</a>
    ·
    <a href="https://github.com/0xartem/bounty-attestor/issues">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://bounties.vercel.app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Bounty Attestor

Bounty Attestor aims to create a credible source of reputation verification for winners and participants of bounties and other relevant events on-chain. These reputation attestations will help teams secure future funding and help the future DAO and VC onboarding processes easier.
How it works: bounty issuers can attest the addresses of the winners, and the winners then can take action, like minting an NFT with the winning details.

[![Solidity][solidity.org]][solidity-url]
[![Vitejs][Vitejs.dev]][Vite-url]
[![React][react.js]][react-url]
[![TailwindCSS][tailwindcss.com]][tailwindcss-url]
[![Foundry][https://getfoundry.sh//]][foundry-url]
[![Hardhat][https://hardhat.org/]][hardhat-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Install Node

[See here](https://nodejs.org/en/download/).
Note that you need Node at a later version than 14.18.0, or 16 and above.
These instructions were verified with Node 18.

### Install Foundry

You will need to install [Foundry](https://book.getfoundry.sh/getting-started/installation) to build your smart contracts.

1. Run the following command:

   ```sh
   curl -L https://foundry.paradigm.xyz | bash
   ```

1. Source your environment as requested by Foundry.

1. Run `foundryup`.

</details>

## Start the application

1. Clone/fork the optimism-starter repo

   ```sh
   git clone https://github.com/0xartem/bounty-attestor.git
   ```

2. Install the necessary node packages:

   ```sh
   cd bounty-attestor
   npm install
   ```

3. Start the frontend with `npm run dev`

   ```sh
   npm run dev
   ```

   If you get errors during this step, you might need to [update your Foundry to the latest version](#install-foundry).

4. Open [localhost:5173](http://localhost:5173) in your browser.

   Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

## Generate ABIs & React Hooks

This project comes with `@wagmi/cli` built-in, which means you can generate wagmi-compatible (type safe) ABIs & React Hooks straight from the command line.

To generate ABIs & Hooks, follow the steps below.

## Generate code

To generate ABIs & React Hooks from your Foundry project (in `./contracts`), you can run:

```sh
npm run wagmi
```

This will use the wagmi config (`wagmi.config.ts`) to generate a `src/generated.ts` file which will include your ABIs & Hooks that you can start using in your project.

[Here is an example](https://github.com/ethereum-optimism/optimism-starter/blob/main/src/components/Attestoooooor.tsx#L77) of Hooks from the generated file being used.

## Deploying Contracts

To deploy your contracts to a network, you can use Foundry's [Forge](https://book.getfoundry.sh/forge/) – a command-line tool to tests, build, and deploy your smart contracts.

You can read a more in-depth guide on using Forge to deploy a smart contract [here](https://book.getfoundry.sh/forge/deploying), but we have included a simple script in the `package.json` to get you started.

Below are the steps to deploying a smart contract to Ethereum Mainnet using Forge:

## Set up environment

### Get an Etherscan key

1. Register for [Etherscan on Optimism](https://explorer.optimism.io/register).
   This account is different from your normal Etherscan account.

1. Go to [the API keys page](https://explorer.optimism.io/myapikey) and click **Add** to create a new API key.

### Specify .env

You will first need to set up your `.env` to tell Forge where to deploy your contract.

1. Copy `.env.example` to `.env`.

   ```sh
   cp .env.example .env
   ```

1. Edit your `.env` to specify the environment variables.

   - `ETHERSCAN_API_KEY`: Your Etherscan API Key.

   - `FORGE_RPC_URL`: The RPC URL of the network to which you deploy.
     If you use [Alchemy](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/alchemy), your URL will look like this: `https://opt-goerli.g.alchemy.com/v2/<Alchemy API Key>`

   - `FORGE_PRIVATE_KEY`: The private key of the wallet you want to deploy from.

## Deploy contract

You can now deploy your contract!

For local deployment

```sh
npm run deploy:bounty:local
```

For live deployment

```sh
npm run deploy:bounty
```

## Developing with Anvil (Optimism Mainnet Fork)

Let's combine the above sections and use Anvil alongside our development environment to use our contracts (`./contracts`) against an Optimism fork.

### Start dev server

Run the command:

```sh
npm run dev:foundry
```

or

```sh
npm run dev:hardhat
```

This will:

- Start a vite dev server,
- Start the `@wagmi/cli` in [**watch mode**](https://wagmi.sh/cli/commands/generate#options) to listen to changes in our contracts, and instantly generate code,
- Start an Anvil instance (Goerli Optimism Fork) on an RPC URL.

### Deploy our contract to Anvil or Hardhat

Now that we have an Anvil or Hardhat instance up and running, let's deploy our smart contract to the Anvil or Hardhat network:

```sh
npm run deploy:local
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/0xartem/bounty-attestor](https://github.com/0xartem/bounty-attestor)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/0xartem/bounty-attestor?color=blue&style=for-the-badge
[contributors-url]: https://github.com/0xartem/bounty-attestor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/0xartem/bounty-attestor.svg?style=for-the-badge
[forks-url]: https://github.com/0xartem/bounty-attestor/network/members
[stars-shield]: https://img.shields.io/github/stars/0xartem/bounty-attestor.svg?style=for-the-badge
[stars-url]: https://github.com/0xartem/bounty-attestor/stargazers
[issues-shield]: https://img.shields.io/github/issues/0xartem/bounty-attestor.svg?style=for-the-badge
[issues-url]: https://github.com/0xartem/bounty-attestor/issues
[license-shield]: https://img.shields.io/github/license/0xartem/bounty-attestor.svg?style=for-the-badge
[license-url]: https://github.com/0xartem/bounty-attestor/blob/main/LICENSE.txt
[product-screenshot]: docs/images/my-attestations.png
[Vitejs.dev]: https://img.shields.io/badge/Vitejs-000000?style=for-the-badge&logo=vite&logoColor
[Vite-url]: https://vitejs.dev/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[solidity.org]: https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white
[solidity-url]: https://soliditylang.org/
[apollographql.com]: https://img.shields.io/badge/Apollo%20GraphQL-E10098?style=for-the-badge&logo=Apollo-GraphQL&logoColor=311C87
[apollographql-url]: https://www.apollographql.com/
[tailwindcss.com]: https://img.shields.io/badge/Tailwind%20CSS-053766?style=for-the-badge&logo=Tailwind%20CSS&logoColor=06B6D4
[tailwindcss-url]: https://www.tailwindcss.com/
[tailwindcss.com]: https://img.shields.io/badge/Tailwind%20CSS-053766?style=for-the-badge&logo=Hardhat&logoColor=06B6D4
[hardhat-url]: https://hardhat.org
