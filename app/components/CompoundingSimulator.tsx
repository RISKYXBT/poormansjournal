'use client'

import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PlusIcon, XIcon, DollarSignIcon, TrendingUpIcon, BarChartIcon, MoonIcon, SunIcon } from "lucide-react"

export function CompoundingSimulator() {
  const [startingCapital, setStartingCapital] = useState("")
  const [weeklyProfitPercent, setWeeklyProfitPercent] = useState("")
  const [reinvestmentPercent, setReinvestmentPercent] = useState("")
  const [salaryPercent, setSalaryPercent] = useState("")
  const [results, setResults] = useState<Array<{
    week: number;
    startingCapital: number;
    profitEarned: number;
    reinvestedAmount: number;
    salaryTakenOut: number;
    newCapital: number;
  }>>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [displayedWeeks, setDisplayedWeeks] = useState(12)

  const formatPercentage = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const handleReinvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReinvestmentPercent(value);
    if (value && !isNaN(parseFloat(value))) {
      const reinvestment = Math.min(100, Math.max(0, parseFloat(value)));
      const salary = 100 - reinvestment;
      setSalaryPercent(formatPercentage(salary.toString()));
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalaryPercent(value);
    if (value && !isNaN(parseFloat(value))) {
      const salary = Math.min(100, Math.max(0, parseFloat(value)));
      const reinvestment = 100 - salary;
      setReinvestmentPercent(formatPercentage(reinvestment.toString()));
    }
  };

  const calculate = () => {
    setIsCalculating(true)

    let currentCapital = parseFloat(startingCapital)
    const weeklyProfit = parseFloat(weeklyProfitPercent) / 100
    const reinvestment = parseFloat(reinvestmentPercent) / 100
    const salary = parseFloat(salaryPercent) / 100

    const weeklyResults = []

    for (let week = 1; week <= 24; week++) {
      const profitEarned = currentCapital * weeklyProfit
      const reinvestedAmount = profitEarned * reinvestment
      const salaryTakenOut = profitEarned * salary
      const newCapital = currentCapital + reinvestedAmount

      weeklyResults.push({
        week,
        startingCapital: currentCapital,
        profitEarned,
        reinvestedAmount,
        salaryTakenOut,
        newCapital,
      })

      currentCapital = newCapital
    }

    setResults(weeklyResults)
    setDisplayedWeeks(12)

    setTimeout(() => {
      setIsCalculating(false)
    }, 300)
  }

  const loadMore = () => {
    setDisplayedWeeks(prev => Math.min(prev + 12, 24))
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-black dark:text-white">
              محاكي التراكم الأسبوعي
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-lg dark:text-zinc-400 mx-auto">
              احسب نمو رأس مالك مع الأرباح الأسبوعية وإعادة الاستثمار
            </p>
          </div>
          <div className="w-full space-y-4 mx-auto">
            <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800 max-w-sm mx-auto">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="startingCapital" className="text-black dark:text-white">رأس المال الأولي</Label>
                    <Input
                      id="startingCapital"
                      type="number"
                      placeholder="رأس المال الأولي"
                      value={startingCapital}
                      onChange={(e) => setStartingCapital(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyProfitPercent" className="text-black dark:text-white">نسبة الربح الأسبوعي المتوقع (%)</Label>
                    <Input
                      id="weeklyProfitPercent"
                      type="number"
                      placeholder="نسبة الربح الأسبوعي"
                      value={weeklyProfitPercent}
                      onChange={(e) => setWeeklyProfitPercent(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reinvestmentPercent" className="text-black dark:text-white">نسبة المقتطع من الربح المعاد استثماره (%)</Label>
                    <Input
                      id="reinvestmentPercent"
                      type="number"
                      placeholder="نسبة إعادة الاستثمار"
                      value={reinvestmentPercent}
                      onChange={handleReinvestmentChange}
                      onBlur={() => setReinvestmentPercent(formatPercentage(reinvestmentPercent))}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryPercent" className="text-black dark:text-white">نسبة المقتطع من  الربح المأخوذ كراتب (%)</Label>
                    <Input
                      id="salaryPercent"
                      type="number"
                      placeholder="نسبة الراتب"
                      value={salaryPercent}
                      onChange={handleSalaryChange}
                      onBlur={() => setSalaryPercent(formatPercentage(salaryPercent))}
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
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
            {results.length > 0 && (
              <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800 w-full max-w-none">
                <CardHeader className="py-3">
                  <CardTitle className="text-black dark:text-white text-xl">النتائج الأسبوعية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <div className="max-h-[400px] overflow-y-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                          <tr>
                            <th scope="col" className="px-2 py-3 text-center">الأسبوع</th>
                            <th scope="col" className="px-2 py-3 text-center">رأس المال</th>
                            <th scope="col" className="px-2 py-3 text-center">الربح</th>
                            <th scope="col" className="px-2 py-3 text-center">المبلغ المعاد استثماره</th>
                            <th scope="col" className="px-2 py-3 text-center">الراتب</th>
                            <th scope="col" className="px-2 py-3 text-center">رأس المال الجديد</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.slice(0, displayedWeeks).map((week) => (
                            <tr key={week.week} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td className="px-2 py-4 text-center">{week.week}</td>
                              <td className="px-2 py-4 text-center">${week.startingCapital.toFixed(2)}</td>
                              <td className="px-2 py-4 text-center">${week.profitEarned.toFixed(2)}</td>
                              <td className="px-2 py-4 text-center">${week.reinvestedAmount.toFixed(2)}</td>
                              <td className="px-2 py-4 text-center">${week.salaryTakenOut.toFixed(2)}</td>
                              <td className="px-2 py-4 text-center">${week.newCapital.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {displayedWeeks < 24 && (
                    <div className="mt-3 text-center">
                      <Button 
                        onClick={loadMore} 
                        className="bg-[#ffc500] text-black hover:bg-[#e6b100] transition-all duration-300"
                      >
                        تحميل المزيد
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}