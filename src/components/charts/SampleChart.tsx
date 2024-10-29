'use client'

import { SetStateAction, useState, useEffect } from "react"
import { TrendingUp, Moon, Sun } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

// Seed-based random number generator for consistent values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

const generateChartData = (period: string, seed: number = 1) => {
  // Use a fixed reference date for SSR consistency
  const baseDate = new Date("2024-01-01T00:00:00Z")
  const data = []
  let intervalMs: number
  let format: (date: Date) => string
  let count: number

  switch (period) {
    case "1h":
      intervalMs = 5 * 60 * 1000 // 5 minutes
      format = (date: Date) =>
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      count = 12
      break
    case "1d":
      intervalMs = 60 * 60 * 1000 // 1 hour
      format = (date: Date) =>
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      count = 24
      break
    case "1m":
      intervalMs = 24 * 60 * 60 * 1000 // 1 day
      format = (date: Date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      count = 30
      break
    case "1y":
      intervalMs = 30 * 24 * 60 * 60 * 1000 // ~1 month
      format = (date: Date) =>
        date.toLocaleDateString("en-US", { month: "short" })
      count = 12
      break
    default:
      intervalMs = 24 * 60 * 60 * 1000
      format = (date: Date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      count = 30
  }

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(baseDate.getTime() - i * intervalMs)
    data.push({
      time: format(date),
      price: Math.floor(seededRandom(seed + i) * 300) + 50,
    })
  }

  return data
}

const chartConfig = {
  price: {
    label: "price",
    color: "hsl(var(--chart-1))",
  },
}

export function EthChart() {
  const [period, setPeriod] = useState("1m")
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState(() => generateChartData(period))
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Only update the chart on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setChartData(generateChartData(period))
    }
  }, [period, mounted])

  const handlePeriodChange = (newPeriod: SetStateAction<string>) => {
    setPeriod(newPeriod)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Card className="w-full bg-background text-foreground">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Image
                src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/ethereum-eth-logo.svg"
                alt="Ethereum"
                width={16}
                height={16}
              />
              <div className="flex flex-col text-4xl font-semibold text-[#0bd790]">
                Ethereum
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
            </div>
          </div>

          <div className="">$2,494.16</div>

          <div className="flex justify-between items-center text-center">
            <div className="text-sm text-muted-foreground">
              +0.27% | Last 24 Hours
            </div>
            <div className="flex space-x-2">
              <Button
                className="rounded-md"
                variant={period === "1h" ? "default" : "outline"}
                onClick={() => handlePeriodChange("1h")}
              >
                1h
              </Button>
              <Button
                className="rounded-lg"
                variant={period === "1d" ? "default" : "outline"}
                onClick={() => handlePeriodChange("1d")}
              >
                1d
              </Button>
              <Button
                className="rounded-lg"
                variant={period === "1m" ? "default" : "outline"}
                onClick={() => handlePeriodChange("1m")}
              >
                1m
              </Button>
              <Button
                className="rounded-lg"
                variant={period === "1y" ? "default" : "outline"}
                onClick={() => handlePeriodChange("1y")}
              >
                1y
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                  stroke="var(--foreground)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  fill="var(--color-price)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this {period}{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {chartData[0].time} - {chartData[chartData.length - 1].time}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}