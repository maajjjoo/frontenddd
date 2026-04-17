import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getQuotaHistory } from '../api/api';
import { useUser } from '../context/UserContext';

export default function UsageChart() {
  const { activeUser } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuotaHistory(activeUser.id)
      .then(setData)
      .catch(err => console.error('Failed to load history', err));
  }, [activeUser.id]);

  if (data.length === 0) {
    return <div className="text-xs text-gray-400 text-center py-4">No usage data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip
          formatter={(value) => [`${value.toLocaleString()} tokens`]}
          labelFormatter={(label) => label}
        />
        <Bar dataKey="tokensUsed" fill="#3B82F6" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
