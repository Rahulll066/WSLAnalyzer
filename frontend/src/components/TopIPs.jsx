import { Crown, ShieldAlert } from "lucide-react";

function TopIPs({ summary }) {
  const ips = summary?.top_attacking_ips || [];

  const max = Math.max(...ips.map(([, count]) => count), 1);

  const getRankColor = (rank) => {
    switch (rank) {
      case 0:
        return "bg-amber-500";
      case 1:
        return "bg-zinc-400";
      case 2:
        return "bg-orange-600";
      default:
        return "bg-zinc-700";
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
            Top Attacking IPs
          </h2>

          <p className="mt-2 text-zinc-500">
            Most active malicious sources
          </p>

        </div>

        <div className="rounded-full bg-amber-500/10 p-3">

          <ShieldAlert
            size={22}
            className="text-amber-400"
          />

        </div>

      </div>

      {/* Empty */}

      {ips.length === 0 ? (

        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500">
          No suspicious IPs detected.
        </div>

      ) : (

        <div className="space-y-6">

          {ips.map(([ip, count], index) => (

            <div
              key={ip}
              className="rounded-2xl bg-zinc-950 p-5 transition hover:bg-zinc-800"
            >

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${getRankColor(index)}`}
                  >
                    {index === 0 ? (
                      <Crown
                        size={18}
                        className="text-black"
                      />
                    ) : (
                      <span className="font-semibold text-white">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div>

                    <h3 className="font-mono text-lg text-white">
                      {ip}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Suspicious Requests
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h3 className="text-2xl font-bold text-amber-400">
                    {count}
                  </h3>

                  <p className="text-xs text-zinc-500">
                    detections
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-700"
                  style={{
                    width: `${(count / max) * 100}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default TopIPs;