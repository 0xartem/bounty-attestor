import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { chains, client } from "./wagmi";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AuthorizedAttestation, {
  loader as authAttestationLoader,
} from "./pages/AuthorizedAttestation";
import SelfAttestation, {
  loader as selfAttestationLoader,
} from "./pages/SelfAttestation";
import MyAttestations, {
  loader as myAttestationsLoader,
} from "./pages/MyAttestations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "my-attestations",
            element: <MyAttestations />,
            loader: myAttestationsLoader,
          },
          {
            path: "authorized-attestation",
            element: <AuthorizedAttestation />,
            loader: authAttestationLoader,
          },
          {
            path: "self-attestation",
            element: <SelfAttestation />,
            loader: selfAttestationLoader,
          },
        ],
      },
    ],
  },
]);

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        {/* <App /> */}
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
