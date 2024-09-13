import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect, useRef, useState } from "react";
import { isIframe } from "./canvas-adapter";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";
import { CanvasWalletProvider } from "./components/CanvasWalletAdapter";
import ProposalsPage from "./pages/ProposalsPage";

export default function App() {
  const iframe = isIframe();
  const canvasClientRef = useRef<CanvasClient | undefined>();
  const [_, setIsInIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframe) {
      canvasClientRef.current = new CanvasClient();
    };
    setIsInIframe(iframe);

    const resizeObserver = new ResizeObserver((_) => {
      canvasClientRef?.current?.resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // return () => {
    //   if (containerRef.current) {
    //     resizeObserver.unobserve(containerRef.current);
    //   }
    // };
  }, [])

  return (
    <div ref={containerRef} style={{
      margin: '0 auto',
      width: '100%'
    }} className="bg-[#1c2936]">
      <BrowserRouter>
        <CanvasWalletProvider>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="proposal-page" element={<ProposalsPage />} />
          </Routes>
        </CanvasWalletProvider>
      </BrowserRouter>
    </div>

  )
}
