"use client";

import { EthChart } from "@/components/charts/EthChart";
import { NavbarComponent } from "@/components/Navbar";
import { SwapInterfaceComponent } from "@/components/swap-interface";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="flex gap-2 flex-wrap justify-center mt-8">
        <div className="m-2 w-[80%] md:w-[50%]">
          <EthChart />
        </div>

        <div className="m-2">
          <SwapInterfaceComponent />
        </div>
      </div>
    </>
  );
}
