"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const data = [
  {
    name: "Design",
    total: 80,
  },
  {
    name: "Animation",
    total: 95,
  },
  {
    name: "Research",
    total: 75,
  },
]

export function ProductivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Hours",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={4}
                className="fill-primary"
              />
              <ChartTooltip />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

