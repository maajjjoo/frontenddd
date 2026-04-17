import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getQuotaHistory } from '../api/api';
import { useUser } from '../context/UserContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-pastel-pink/50 rounded-xl px-3 py-2 text-xs soft-shadow">
        <p className="text-soft-muted">{label}</p>
        <p className="text-pink-500 font-semibold">{payload[0].value.toLocaleString()} tokens</p>
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
      <div className="flex items-center justify-center h-20 text-xs text-soft-muted">
        No usage data yet 🌸
      </div>
    );
  }

  const COLORS = ['#ffc8d8', '#ffb3c6', '#ff99b3', '#ff80a0', '#ff668d', '#ff4d7a', '#ff3366'];

  return (
    <ResponsiveContainer width="100%" height={110}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 9, fill: '#b89aaa' }}
          tickFormatter={d => d.slice(5)}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 9, fill: '#b89aaa' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,182,210,0.15)' }} />
        <Bar dataKey="tokensUsed" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
