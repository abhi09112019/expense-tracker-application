import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PALETTE = ['#a9762c', '#3f6b4f', '#9c3f30', '#5b6172', '#7c5620', '#6d7f6e', '#8a5a4a', '#4a5568', '#b08d57', '#547358'];

const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
    value || 0
  );

function CategoryChart({ data }) {
  if (!data.length) return null;

  const chartData = data.map((d) => ({ name: d.category, total: d.total }));

  return (
    <div className="panel breakdown">
      <div className="panel-header">
        <h2>Where it's going</h2>
      </div>
      <div className="panel-body">
        <ResponsiveContainer width="100%" height={Math.max(180, chartData.length * 34)}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={130}
              tick={{ fontSize: 12, fill: '#5b6172', fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 12,
                border: '1px solid #b9b092',
                borderRadius: 2,
              }}
              cursor={{ fill: 'rgba(169, 118, 44, 0.08)' }}
            />
            <Bar dataKey="total" radius={[0, 2, 2, 0]} barSize={16}>
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryChart;
