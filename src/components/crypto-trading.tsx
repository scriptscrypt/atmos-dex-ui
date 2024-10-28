"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Moon, Sun, X } from "lucide-react";

export function CryptoTradingComponent() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode ? "dark" : "light";

  return (
    <div className={`${themeClass} transition-colors duration-300`}>
      <div
        className={`container mx-auto p-4 max-w-6xl min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${
                isDarkMode ? "bg-[#0bd790]" : "bg-[#0dbbac]"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className={`w-6 h-6 ${
                  isDarkMode ? "text-gray-900" : "text-white"
                }`}
              >
                <path
                  fill="currentColor"
                  d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Ethereum ETH</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={
                isDarkMode
                  ? "text-gray-400 hover:text-[#0bd790]"
                  : "text-gray-600 hover:text-[#0dbbac]"
              }
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={
                isDarkMode
                  ? "text-gray-400 hover:text-[#0bd790]"
                  : "text-gray-600 hover:text-[#0dbbac]"
              }
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={
                isDarkMode
                  ? "text-gray-400 hover:text-[#0bd790]"
                  : "text-gray-600 hover:text-[#0dbbac]"
              }
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`col-span-2 rounded-3xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <CardHeader>
              <CardTitle>
                <div
                  className={`text-4xl font-bold ${
                    isDarkMode ? "text-[#0bd790]" : "text-[#0dbbac]"
                  }`}
                >
                  $2,523.57
                </div>
                <div
                  className={isDarkMode ? "text-[#0dbbac]" : "text-[#0bd790]"}
                >
                  -6.29% Last Week
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`h-64 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                } rounded-2xl mb-4`}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Chart Placeholder
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className={
                    isDarkMode
                      ? "text-gray-300 border-gray-600 hover:bg-[#0dbbac] hover:text-gray-900"
                      : "text-gray-600 border-gray-300 hover:bg-[#0dbbac] hover:text-white"
                  }
                >
                  1H
                </Button>
                <Button
                  variant="outline"
                  className={
                    isDarkMode
                      ? "text-gray-300 border-gray-600 hover:bg-[#0dbbac] hover:text-gray-900"
                      : "text-gray-600 border-gray-300 hover:bg-[#0dbbac] hover:text-white"
                  }
                >
                  1D
                </Button>
                <Button
                  variant="secondary"
                  className={
                    isDarkMode
                      ? "bg-[#0dbbac] text-gray-900 hover:bg-[#0bd790]"
                      : "bg-[#0dbbac] text-white hover:bg-[#0bd790]"
                  }
                >
                  1W
                </Button>
                <Button
                  variant="outline"
                  className={
                    isDarkMode
                      ? "text-gray-300 border-gray-600 hover:bg-[#0dbbac] hover:text-gray-900"
                      : "text-gray-600 border-gray-300 hover:bg-[#0dbbac] hover:text-white"
                  }
                >
                  1M
                </Button>
                <Button
                  variant="outline"
                  className={
                    isDarkMode
                      ? "text-gray-300 border-gray-600 hover:bg-[#0dbbac] hover:text-gray-900"
                      : "text-gray-600 border-gray-300 hover:bg-[#0dbbac] hover:text-white"
                  }
                >
                  1Y
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`rounded-3xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <CardContent className="p-6">
              <Tabs defaultValue="market" className="w-full">
                <TabsList
                  className={`grid w-full grid-cols-3 mb-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <TabsTrigger
                    value="market"
                    className={`data-[state=active]:${
                      isDarkMode
                        ? "bg-[#0dbbac] text-gray-900"
                        : "bg-[#0dbbac] text-white"
                    }`}
                  >
                    Market
                  </TabsTrigger>
                  <TabsTrigger
                    value="limit"
                    className={`data-[state=active]:${
                      isDarkMode
                        ? "bg-[#0dbbac] text-gray-900"
                        : "bg-[#0dbbac] text-white"
                    }`}
                  >
                    Limit
                  </TabsTrigger>
                  <TabsTrigger
                    value="cross"
                    className={`data-[state=active]:${
                      isDarkMode
                        ? "bg-[#0dbbac] text-gray-900"
                        : "bg-[#0dbbac] text-white"
                    }`}
                  >
                    Cross chain
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="market">
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Sell
                      </label>
                      <div className="flex mt-1">
                        <Select>
                          <SelectTrigger
                            className={`w-[180px] rounded-r-none ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300"
                                : "bg-gray-100 border-gray-300 text-gray-600"
                            }`}
                          >
                            <SelectValue placeholder="Select Token" />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-gray-200"
                            }
                          >
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="btc">BTC</SelectItem>
                            <SelectItem value="usdt">USDT</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.24"
                          className={`rounded-l-none ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-gray-300"
                              : "bg-gray-100 border-gray-300 text-gray-600"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Buy
                      </label>
                      <div className="flex mt-1">
                        <Select>
                          <SelectTrigger
                            className={`w-[180px] rounded-r-none ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300"
                                : "bg-gray-100 border-gray-300 text-gray-600"
                            }`}
                          >
                            <SelectValue placeholder="ETH" />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-gray-200"
                            }
                          >
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="btc">BTC</SelectItem>
                            <SelectItem value="usdt">USDT</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.0"
                          className={`rounded-l-none ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-gray-300"
                              : "bg-gray-100 border-gray-300 text-gray-600"
                          }`}
                        />
                      </div>
                    </div>
                    <Button
                      className={`w-full ${
                        isDarkMode
                          ? "bg-[#0bd790] text-gray-900 hover:bg-[#0dbbac]"
                          : "bg-[#0dbbac] text-white hover:bg-[#0bd790]"
                      } rounded-full`}
                    >
                      Connect wallet
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card
          className={`mt-6 rounded-3xl ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={isDarkMode ? "text-[#0dbbac]" : "text-[#0bd790]"}
            >
              Market Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Market Cap
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-[#0bd790]" : "text-[#0dbbac]"
                  }`}
                >
                  $304.15B
                </div>
              </div>
              <div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  24h Volume
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-[#0bd790]" : "text-[#0dbbac]"
                  }`}
                >
                  $12.9B
                </div>
              </div>
              <div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Circulating Supply
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-[#0bd790]" : "text-[#0dbbac]"
                  }`}
                >
                  120.40M
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
