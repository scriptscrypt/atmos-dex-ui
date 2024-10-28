"use client"

import { useState } from "react"
import { ArrowDownUp, ChevronDown, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: 1.5 },
  { symbol: "USDC", name: "USD Coin", balance: 1000 },
  { symbol: "DAI", name: "Dai", balance: 1000 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.05 },
]

export function TokenSwapComponent() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[1])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippageTolerance, setSlippageTolerance] = useState(0.5)
  const [transactionDeadline, setTransactionDeadline] = useState(30)

  const handleSwap = () => {
    // In a real application, this would interact with a smart contract
    alert(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}
    Slippage Tolerance: ${slippageTolerance}%
    Transaction Deadline: ${transactionDeadline} minutes`)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    // Mock exchange rate calculation
    const mockRate = 1000 // 1 ETH = 1000 USDC
    setToAmount((parseFloat(value) * mockRate).toFixed(2))
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Swap Tokens</CardTitle>
          <CardDescription>Exchange your tokens instantly</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaction Settings</DialogTitle>
              <DialogDescription>Customize your swap parameters</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="slippage-tolerance">Slippage Tolerance</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="slippage-tolerance"
                    min={0.1}
                    max={5}
                    step={0.1}
                    value={[slippageTolerance]}
                    onValueChange={(value) => setSlippageTolerance(value[0])}
                  />
                  <span className="w-12 text-right">{slippageTolerance}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction-deadline">Transaction Deadline</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="transaction-deadline"
                    type="number"
                    value={transactionDeadline}
                    onChange={(e) => setTransactionDeadline(parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span>minutes</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from-token">From</Label>
          <div className="flex space-x-2">
            <Select
              value={fromToken.symbol}
              onValueChange={(value) => setFromToken(tokens.find((t) => t.symbol === value) || tokens[0])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.name} ({token.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="from-amount"
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Balance: {fromToken.balance} {fromToken.symbol}
          </p>
        </div>
        <Button variant="outline" size="icon" className="mx-auto" onClick={switchTokens}>
          <ArrowDownUp className="h-4 w-4" />
        </Button>
        <div className="space-y-2">
          <Label htmlFor="to-token">To</Label>
          <div className="flex space-x-2">
            <Select
              value={toToken.symbol}
              onValueChange={(value) => setToToken(tokens.find((t) => t.symbol === value) || tokens[1])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.name} ({token.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input id="to-amount" type="number" placeholder="0.0" value={toAmount} readOnly />
          </div>
          <p className="text-sm text-muted-foreground">
            Balance: {toToken.balance} {toToken.symbol}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSwap}>
          Swap
        </Button>
      </CardFooter>
    </Card>
  )
}