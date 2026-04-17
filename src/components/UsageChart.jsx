import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getQuotaHistory } from '../api/api';
import { useUser } from '../context/UserContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs shadow-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-indigo-600 font-semibold">{payload[0].value.toLocaleString()} tokens</p>
    </div>
  );
  return null;
};

export default function UsageChart() {
  const { activeUser } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuotaHistory(activeUser.id).then(setData).catch(() => {});
  }, [activeUser.id]);

  if (!data.length) return <div className="text-xs text-gray-400 text-center py-4">No data yet</div>;

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} tickFormatter={d => d.slice(5)} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
        <Bar dataKey="tokensUsed" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
