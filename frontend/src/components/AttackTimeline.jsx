import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AttackTimeline({ results = [] }) {
  const timeline = {};

  results.forEach((item) => {
    const timestamp = item.log.timestamp;

    if (!timestamp) return;

    const time = timestamp.split(":").slice(1, 3).join(":");

    timeline[time] = (timeline[time] || 0) + 1;
  });

  const data = Object.entries(timeline).map(([time, attacks]) => ({
    time,
    attacks,
  }));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
            Threat Activity
          </h2>

          <p className="mt-2 text-zinc-500">
            Timeline of suspicious requests detected
          </p>

        </div>

        <div className="rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
          {results.length} Incidents
        </div>

      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500">
          Upload a log file to visualize attack activity.
        </div>
      ) : (
        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={data}>

              <defs>

                <linearGradient id="attackFill" x1="0" y1="0" x2="0" y2="1">

                  <stop
                    offset="0%"
                    stopColor="#F59E0B"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#F59E0B"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#27272A"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="time"
                stroke="#71717A"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#71717A"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#18181B",
                  border: "1px solid #27272A",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="attacks"
                stroke="#F59E0B"
                strokeWidth={3}
                fill="url(#attackFill)"
                dot={{
                  fill: "#F59E0B",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default AttackTimeline;