import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#F59E0B", // Amber
  "#FB7185", // Rose
  "#22C55E", // Green
  "#A78BFA", // Violet
  "#38BDF8", // Sky
  "#F97316", // Orange
];

function AttackChart({ summary }) {
  const data = summary?.attack_distribution
    ? Object.entries(summary.attack_distribution).map(
        ([name, value]) => ({
          name,
          value,
        })
      )
    : [];

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8">

        <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
          Attack Distribution
        </h2>

        <p className="mt-2 text-zinc-500">
          Breakdown of detected attack categories
        </p>

      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500">
          No attacks detected.
        </div>
      ) : (
        <div className="grid items-center gap-8 lg:grid-cols-2">

          {/* Donut Chart */}

          <div className="h-72">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={data}
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#18181B",
                    border: "1px solid #27272A",
                    borderRadius: "12px",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Legend */}

          <div className="space-y-5">

            {data.map((attack, index) => (

              <div
                key={attack.name}
                className="flex items-center justify-between rounded-2xl bg-zinc-950 px-5 py-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="text-zinc-300">
                    {attack.name}
                  </span>

                </div>

                <div className="text-right">

                  <p className="font-semibold text-white">
                    {attack.value}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {(
                      (attack.value / total) *
                      100
                    ).toFixed(1)}
                    %
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default AttackChart;