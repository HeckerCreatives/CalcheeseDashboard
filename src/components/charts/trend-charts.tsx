"use client"

import { useGetChests } from "@/apis/codes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type TickProps = {
  x: number;
  y: number;
  index: number;
  payload: {
    value: string;
  };
};

export function TrendChart() {
  const {data: chests, isLoading} = useGetChests()
  
const CustomXAxisTick = ({ x, y, index, payload }: TickProps) => {
  const showLabel = index === 0 || index === 1 || index === 2 || index === 3;

  return (
    <g transform={`translate(${x},${y})`}>
      {showLabel && (
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="0.6rem">
          {payload.value}
        </text>
      )}
    </g>
  );
};

  return (
    <div className="h-[300px] w-full text-xs ">
      <ResponsiveContainer width="100%" height="100%" className={''}>
        <BarChart data={chests?.data}  margin={{ top: 0, right: 0, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="chestname"
            padding={{ left: 0, right: 0 }}
            tick={{ fontSize: '0.5rem' }}
          />
          <YAxis tickFormatter={(value) => `${value}`} domain={[0, 10]} />
          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `Chest: ${label}`} />
          <Legend />
          <Bar dataKey="claimed" name="Claimed Codes" fill="#2563eb" radius={[4, 4, 0, 0]} fontSize={'.5rem'}/>
          <Bar dataKey="unclaimed" name="Unclaimed Codes" fill="#facc15" radius={[4, 4, 0, 0]} fontSize={'.5rem'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
