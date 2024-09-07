'use client'

import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PlusIcon, XIcon, DollarSignIcon, TrendingUpIcon, BarChartIcon, MoonIcon, SunIcon } from "lucide-react"

export function TradeEntryCalculator() {
  const [entries, setEntries] = useState([{ price: "", size: "" }])
  const [exits, setExits] = useState([{ price: "", size: "" }])
  const [stopLoss, setStopLoss] = useState("")
  const [results, setResults] = useState({
    averageEntry: 0,
    averageExit: 0,
    pnl: 0,
    rr: 0,
  })
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.documentElement.dir = 'rtl'
  }, [isDarkMode])

  const addEntry = () => setEntries([...entries, { price: "", size: "" }])
  const addExit = () => setExits([...exits, { price: "", size: "" }])

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
  }

  const removeExit = (index: number) => {
    const newExits = exits.filter((_, i) => i !== index)
    setExits(newExits)
  }

  const updateEntry = (index: number, field: "price" | "size", value: string) => {
    const newEntries = [...entries]
    newEntries[index][field] = value
    setEntries(newEntries)
  }

  const updateExit = (index: number, field: "price" | "size", value: string) => {
    const newExits = [...exits]
    newExits[index][field] = value
    setExits(newExits)
  }

  const calculate = () => {
    setIsCalculating(true);
    
    const totalEntrySize = entries.reduce((sum, entry) => sum + Number(entry.size), 0)
    const totalExitSize = exits.reduce((sum, exit) => sum + Number(exit.size), 0)
    
    const averageEntry = entries.reduce((sum, entry) => sum + Number(entry.price) * Number(entry.size), 0) / totalEntrySize
    const averageExit = exits.reduce((sum, exit) => sum + Number(exit.price) * Number(exit.size), 0) / totalExitSize
    
    const pnl = (averageExit - averageEntry) * totalEntrySize
    const rr = stopLoss ? (averageExit - averageEntry) / (averageEntry - Number(stopLoss)) : 0

    setResults({
      averageEntry,
      averageExit,
      pnl,
      rr,
    })

    setTimeout(() => {
      setIsCalculating(false);
    }, 300); // Reset after 300ms
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex justify-start mb-4 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`rounded-full transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500' 
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem] text-yellow-300" />
            ) : (
              <MoonIcon className="h-[1.2rem] w-[1.2rem] text-gray-700" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <div className="flex flex-col justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black dark:text-white">
              حاسبة المتداول
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
              احسب معدل سعر دخولك وخروجك وقيمة الربح/الخسارة المحتمل. الحجم يكون عدد او كمية العملات وليس القيمة الدولارية
            </p>
          </div>
          <div className="w-full max-w-full space-y-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-black dark:text-white">اسعار الدخول</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entries.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="السعر"
                          value={entry.price}
                          onChange={(e) => updateEntry(index, "price", e.target.value)}
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <Input
                          type="number"
                          placeholder="الحجم"
                          value={entry.size}
                          onChange={(e) => updateEntry(index, "size", e.target.value)}
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeEntry(index)} className="text-black dark:text-white hover:bg-red-100 dark:hover:bg-red-900">
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addEntry} 
                      className="text-black dark:text-white border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <PlusIcon className="h-4 w-4 ml-2" /> اضافة سعر دخول
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-black dark:text-white">اسعار الخروج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exits.map((exit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="السعر"
                          value={exit.price}
                          onChange={(e) => updateExit(index, "price", e.target.value)}
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <Input
                          type="number"
                          placeholder="الحجم"
                          value={exit.size}
                          onChange={(e) => updateExit(index, "size", e.target.value)}
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeExit(index)} className="text-black dark:text-white hover:bg-red-100 dark:hover:bg-red-900">
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addExit} 
                      className="text-black dark:text-white border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <PlusIcon className="h-4 w-4 ml-2" /> اضافة سعر خروج
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="stopLoss" className="text-black dark:text-white">سعر وقف الخسارة (اختياري)</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      placeholder="وقف الخسارة"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white w-24 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <Button 
                    onClick={calculate} 
                    className={`bg-[#ffc500] text-black hover:bg-[#e6b100] w-full transition-all duration-300 ${
                      isCalculating ? 'scale-95 bg-[#d9a700]' : ''
                    }`}
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'جاري الحساب...' : 'احسب'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">النتيجة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <DollarSignIcon className="text-black dark:text-white h-6 w-6 opacity-75" />
                    </div>
                    <h2 className="text-xl font-bold text-black dark:text-white">معدل الدخول</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">${results.averageEntry.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <DollarSignIcon className="text-black dark:text-white h-6 w-6 opacity-75" />
                    </div>
                    <h2 className="text-xl font-bold text-black dark:text-white">معدل الخروج</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">${results.averageExit.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <TrendingUpIcon className="text-black dark:text-white h-6 w-6 opacity-75" />
                    </div>
                    <h2 className="text-xl font-bold text-black dark:text-white">الربح /الخسارة</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">${results.pnl.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <BarChartIcon className="text-black dark:text-white h-6 w-6 opacity-75" />
                    </div>
                    <h2 className="text-xl font-bold text-black dark:text-white">R:R</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{results.rr.toFixed(2)}R</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}