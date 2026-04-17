import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getQuotaHistory } from '../api/api';
import { useUser } from '../context/UserContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs">
        <p className="text-gray-400">{label}</p>
        <p className="text-indigo-300 font-semibold">{payload[0].value.toLocaleString()} tokens</p>
      </div>
    );
  }
  return null;
};

export default function UsageChart() {
  const { activeUser } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuotaHistory(activeUser.id)
      .then(setData)
      .catch(() => {});
  }, [activeUser.id]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-xs text-gray-600">
        No usage data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={110}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 9, fill: '#6b7280' }}
          tickFormatter={d => d.slice(5)}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
        <Bar dataKey="tokensUsed" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === data.length - 1 ? '#6366f1' : '#4f46e5'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
