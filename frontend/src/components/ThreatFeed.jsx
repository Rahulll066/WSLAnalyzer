import {
  ShieldAlert,
  AlertTriangle,
  Bug,
  Activity,
  Clock3,
  Globe,
} from "lucide-react";

function ThreatFeed({ results = [] }) {
  const getStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return {
          color: "bg-rose-500",
          text: "text-rose-300",
          badge: "bg-rose-500/10 border-rose-500/30",
          icon: <ShieldAlert size={18} />,
        };

      case "High":
        return {
          color: "bg-orange-500",
          text: "text-orange-300",
          badge: "bg-orange-500/10 border-orange-500/30",
          icon: <AlertTriangle size={18} />,
        };

      case "Medium":
        return {
          color: "bg-amber-500",
          text: "text-amber-300",
          badge: "bg-amber-500/10 border-amber-500/30",
          icon: <Bug size={18} />,
        };

      default:
        return {
          color: "bg-emerald-500",
          text: "text-emerald-300",
          badge: "bg-emerald-500/10 border-emerald-500/30",
          icon: <Activity size={18} />,
        };
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8">

        <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
          Live Threat Feed
        </h2>

        <p className="mt-2 text-zinc-500">
          Chronological view of detected suspicious activities.
        </p>

      </div>

      {results.length === 0 ? (

        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500">
          No threats detected.
        </div>

      ) : (

        <div className="relative space-y-6">

          {/* Vertical Timeline */}

          <div className="absolute left-3 top-0 h-full w-[2px] bg-zinc-800"></div>

          {results.map((item, index) => {

            const finding = item.findings[0];

            const style = getStyle(finding.severity);

            return (

              <div
                key={index}
                className="relative ml-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-amber-500/30"
              >

                {/* Timeline Dot */}

                <div
                  className={`absolute -left-9 top-6 h-5 w-5 rounded-full border-4 border-zinc-900 ${style.color}`}
                />

                {/* Top */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className={`${style.text}`}>
                      {style.icon}
                    </div>

                    <h3 className="font-semibold text-white">
                      {finding.type}
                    </h3>

                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${style.badge} ${style.text}`}
                  >
                    {finding.severity}
                  </span>

                </div>

                {/* Details */}

                <div className="mt-5 grid gap-4 text-sm">

                  <div className="flex items-center gap-3">

                    <Globe size={16} className="text-zinc-500" />

                    <span className="font-mono text-zinc-300">
                      {item.log.ip}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Clock3 size={16} className="text-zinc-500" />

                    <span className="text-zinc-400">
                      {item.log.timestamp}
                    </span>

                  </div>

                  <div className="rounded-xl bg-zinc-900 p-3">

                    <code className="text-xs text-amber-300 break-all">

                      {item.log.url}

                    </code>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default ThreatFeed;