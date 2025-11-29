"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format, subDays, startOfDay, isSameDay, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  focus: {
    label: "Focus Sessions",
    color: "hsl(var(--primary))",
  },
  goals: {
    label: "Completed Goals",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function ActivityChart() {
  const { pomodoroSessions, goals } = useDevFlowStore()
  const [isMounted, setIsMounted] = React.useState(false)
  const today = startOfDay(new Date())
  const [dateRange, setDateRange] = React.useState<{ from: Date; to?: Date }>({
    from: subDays(today, 6),
    to: today,
  })

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const daysInRange = React.useMemo(() => {
    if (!dateRange.from) return []
    const endDate = dateRange.to || dateRange.from
    if (!endDate) return []

    const days = []
    let currentDate = new Date(dateRange.from)

    while (currentDate <= endDate) {
      days.push(startOfDay(new Date(currentDate)))
      currentDate = addDays(currentDate, 1)
    }

    return days
  }, [dateRange])

  const chartData = React.useMemo(() => {
    return daysInRange.map((date) => {
      const focusSessions = pomodoroSessions.filter(
        (session) => session.completedAt && isSameDay(new Date(session.completedAt), date),
      ).length

      const completedGoals = goals.filter(
        (goal) => goal.completed && goal.createdAt && isSameDay(new Date(goal.createdAt), date),
      ).length

      return {
        date: format(date, "MMM d"),
        fullDate: format(date, "yyyy-MM-dd"),
        focus: focusSessions,
        goals: completedGoals,
      }
    })
  }, [daysInRange, pomodoroSessions, goals])

  const totalFocusSessions = chartData.reduce((sum, day) => sum + day.focus, 0)
  const totalCompletedGoals = chartData.reduce((sum, day) => sum + day.goals, 0)

  const formatDateRange = () => {
    if (!dateRange.from) return "Select date range"
    if (!dateRange.to) return format(dateRange.from, "MMM d, yyyy")
    return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
  }

  if (!isMounted) {
    return (
      <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">Loading chart...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-3">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Activity Overview</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[300px] justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range: any) => {
                    if (range?.from) {
                      setDateRange({
                        from: range.from,
                        to: range.to || range.from,
                      })
                    }
                  }}
                  disabled={(date) => date > today}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/30 text-primary border-primary/40 font-semibold">
              {totalFocusSessions} Focus Session{totalFocusSessions !== 1 ? "s" : ""}
            </Badge>
            <Badge variant="outline" className="bg-accent/30 text-accent-foreground border-accent/40 font-semibold">
              {totalCompletedGoals} Goal{totalCompletedGoals !== 1 ? "s" : ""} Completed
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="focus" fill="var(--color-focus)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="goals" fill="var(--color-goals)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
