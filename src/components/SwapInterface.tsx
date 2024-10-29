import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  Search,
  ArrowUpDown,
  Info,
  Settings2,
} from "lucide-react";
import Image from "next/image";

import { tokenList } from "@/data/tokenlist";
import useMode from "@/hooks/useMode";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Slider } from "./ui/slider";

const tokens = tokenList.tokens
  .filter((token) => token.chainId === 245022934)
  .map((token) => ({
    symbol: token.symbol,
    name: token.name,
    logoURI: token.logoURI || "/placeholder.svg",
    decimals: token.decimals,
    address: token.address,
    price:
      token.symbol === "USDC" || token.symbol === "USDT"
        ? 1
        : token.symbol === "WETH"
        ? 2200
        : token.symbol === "WBTC"
        ? 40000
        : token.symbol === "SOL"
        ? 100
        : 1,
  }));

export function SwapInterfaceComponent() {
  const { isDarkMode } = useMode();
  const [activeTab, setActiveTab] = useState("market");
  const [sellToken, setSellToken] = useState(
    tokens.find((t) => t.symbol === "USDC") || tokens[0]
  );
  const [buyToken, setBuyToken] = useState(
    tokens.find((t) => t.symbol === "WETH") || tokens[1]
  );
  const [sellAmount, setSellAmount] = useState("0.0");
  const [buyAmount, setBuyAmount] = useState("0.0");
  const [balance, setBalance] = useState("1000.0");
  const [limitPrice, setLimitPrice] = useState("");
  const [isPostOnly, setIsPostOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [deadline, setDeadline] = useState(30);
  const [showRouting, setShowRouting] = useState(false);

  // Example routing path for visualization
  const routingPath = [
    { protocol: "Uniswap V3", percentage: 45, fee: 0.05 },
    { protocol: "Curve", percentage: 35, fee: 0.04 },
    { protocol: "Balancer", percentage: 20, fee: 0.03 },
  ];

  useEffect(() => {
    updateBuyAmount(sellAmount);
  }, [sellToken, buyToken]);

  const handleSwap = () => {
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);
    updateBuyAmount(sellAmount);
  };

  const updateBuyAmount = (newSellAmount: string) => {
    const sellValue = parseFloat(newSellAmount) * sellToken.price;
    const newBuyAmount = sellValue / buyToken.price;
    setBuyAmount(newBuyAmount.toFixed(6));
  };

  const updateSellAmount = (newBuyAmount: string) => {
    const buyValue = parseFloat(newBuyAmount) * buyToken.price;
    const newSellAmount = buyValue / sellToken.price;
    setSellAmount(newSellAmount.toFixed(6));
  };

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(e.target.value);
    updateBuyAmount(e.target.value);
  };

  const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAmount(e.target.value);
    updateSellAmount(e.target.value);
  };

  const handleMaxClick = () => {
    setSellAmount(balance);
    updateBuyAmount(balance);
  };

  const handleHalfClick = () => {
    const halfBalance = (parseFloat(balance) / 2).toFixed(6);
    setSellAmount(halfBalance);
    updateBuyAmount(halfBalance);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="w-full max-w-md mx-auto py-6 p-4 rounded-3xl border shadow-lg bg-card text-card-foreground transition-colors duration-200">
        {/* Header with settings */}
        <div className="flex justify-between align-middle items-center mb-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 rounded-full bg-muted">
              <TabsTrigger value="market" className="rounded-full">
                Market
              </TabsTrigger>
              <TabsTrigger value="limit" className="rounded-full">
                Limit
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full ml-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings2 className="h-8 w-8" />
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-4 rounded-2xl bg-muted/50">
            <h3 className="font-medium mb-4">Transaction Settings</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label>Slippage Tolerance</Label>

                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Your transaction will revert if the price changes
                        unfavorably by more than this percentage.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-medium">{slippage}%</span>
                </div>
                <Slider
                  value={[slippage]}
                  onValueChange={([value]) => setSlippage(value)}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label>Transaction Deadline</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Your transaction will revert if it is pending for more
                        than this period of time.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-medium">
                    {deadline} minutes
                  </span>
                </div>
                <Slider
                  value={[deadline]}
                  onValueChange={([value]) => setDeadline(value)}
                  min={5}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 rounded-full bg-muted">
            <TabsTrigger value="market" className="rounded-full">
              Market
            </TabsTrigger>
            <TabsTrigger value="limit" className="rounded-full">
              Limit
            </TabsTrigger>
          </TabsList>
        </Tabs> */}

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Sell</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHalfClick}
                  className="rounded-full"
                >
                  50%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMaxClick}
                  className="rounded-full"
                >
                  Max
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TokenSelect
                token={sellToken}
                onSelect={setSellToken}
                otherToken={buyToken}
                tokens={tokens}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Input
                type="number"
                value={sellAmount}
                onChange={handleSellAmountChange}
                className="text-right text-2xl rounded-full"
                placeholder="0.0"
              />
            </div>
            <div className="text-right text-sm text-muted-foreground">
              ${(parseFloat(sellAmount || "0") * sellToken.price).toFixed(2)}
            </div>
            <div className="text-left text-sm text-muted-foreground">
              Balance: {balance} {sellToken.symbol}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleSwap}
            >
              <ArrowUpDown className="h-6 w-6" />
              <span className="sr-only">Swap tokens</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Buy</span>
            </div>
            <div className="flex items-center space-x-2">
              <TokenSelect
                token={buyToken}
                onSelect={setBuyToken}
                otherToken={sellToken}
                tokens={tokens}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Input
                type="number"
                value={buyAmount}
                onChange={handleBuyAmountChange}
                className="text-right text-2xl rounded-full"
                placeholder="0.0"
              />
            </div>
            <div className="text-right text-sm text-muted-foreground">
              ${(parseFloat(buyAmount || "0") * buyToken.price).toFixed(2)}
            </div>
          </div>

          {activeTab === "limit" && (
            <div className="space-y-2">
              <Label htmlFor="limitPrice">Limit Price</Label>
              <Input
                id="limitPrice"
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="rounded-full"
                placeholder="Enter limit price"
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="post-only"
                  checked={isPostOnly}
                  onCheckedChange={setIsPostOnly}
                />
                <Label htmlFor="post-only">Post Only</Label>
              </div>
            </div>
          )}
        </div>

        {/* Order Routing Visualization */}
        <div className="mt-4 p-4 rounded-2xl bg-muted/50">
          <button
            className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setShowRouting(!showRouting)}
          >
            <span>Order Routing</span>
            <ChevronDown
              className={`h-4 w-4 transform transition-transform ${
                showRouting ? "rotate-180" : ""
              }`}
            />
          </button>

          {showRouting && (
            <div className="mt-4 space-y-3">
              {routingPath.map((route, index) => (
                <div key={route.protocol} className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span>{route.protocol}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{route.percentage}%</div>
                      <div className="text-sm text-muted-foreground">
                        Fee {route.fee}%
                      </div>
                    </div>
                  </div>
                  {index < routingPath.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-muted-foreground/20" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <Button className="w-full mt-4 h-12 rounded-full bg-[#0bd790] text-gray-800 text-lg hover:bg-[#0bd790e9]">
          {activeTab === "market" ? "Swap" : "Place Limit Order"}
        </Button>
      </div>
    </div>
  );
}

function TokenSelect({
  token,
  onSelect,
  otherToken,
  tokens,
  searchQuery,
  setSearchQuery,
}: any) {
  const [open, setOpen] = useState(false);

  const filteredTokens = tokens.filter(
    (t: any) =>
      t.address !== otherToken.address &&
      (t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="pl-3 py-6 rounded-full">
          <div className="flex items-center gap-2 mr-4">
            <Image
              src={token.logoURI}
              alt={token.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="font-bold">{token.symbol}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select a token</h2>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 rounded-full"
            placeholder="Search token name or paste address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2 h-[70vh] overflow-y-auto">
          {filteredTokens.map((t: any) => (
            <Button
              key={t.address}
              variant="ghost"
              className="w-full justify-start rounded-full"
              onClick={() => {
                onSelect(t);
                setOpen(false);
                setSearchQuery("");
              }}
            >
              <Image
                src={t.logoURI}
                alt={t.name}
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span>{t.symbol}</span>
              <span className="ml-2 text-sm text-muted-foreground">
                {t.name}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
