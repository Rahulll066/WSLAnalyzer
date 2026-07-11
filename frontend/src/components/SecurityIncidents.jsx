import {
  AlertTriangle,
  Globe,
  Clock3,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

function SecurityIncidents({ results = [] }) {
  const severityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return {
          badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
          dot: "bg-rose-500",
        };

      case "High":
        return {
          badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
          dot: "bg-orange-500",
        };

      case "Medium":
        return {
          badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
          dot: "bg-amber-500",
        };

      default:
        return {
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          dot: "bg-emerald-500",
        };
    }
  };

  return (
    <section className="space-y-6">

      <div>

        <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
          Security Incidents
        </h2>

        <p className="mt-2 text-zinc-500">
          Detailed information about every detected threat.
        </p>

      </div>

      {results.length === 0 ? (
        <div className="flex h-60 items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 text-zinc-500">
          Upload a log file to begin analysis.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {results.map((item, index) => {

            const finding = item.findings[0];

            const style = severityStyle(
              finding.severity
            );

            return (

              <div
                key={index}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30"
              >

                <div className="mb-6 flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`h-3 w-3 rounded-full ${style.dot}`}
                    />

                    <div>

                      <h3 className="text-xl font-semibold text-white">

                        {finding.type}

                      </h3>

                      <p className="text-sm text-zinc-500">

                        Suspicious Activity Detected

                      </p>

                    </div>

                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${style.badge}`}
                  >
                    {finding.severity}
                  </span>

                </div>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <Globe
                      size={18}
                      className="text-zinc-500"
                    />

                    <div>

                      <p className="text-xs text-zinc-500">
                        Source IP
                      </p>

                      <p className="font-mono text-white">
                        {item.log.ip}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <ShieldAlert
                      size={18}
                      className="text-zinc-500"
                    />

                    <div>

                      <p className="text-xs text-zinc-500">
                        HTTP Request
                      </p>

                      <p className="text-white">
                        {item.log.method} • {item.log.status}
                      </p>

                    </div>

                  </div>

                  <div>

                    <p className="mb-2 text-xs text-zinc-500">
                      Target Endpoint
                    </p>

                    <div className="overflow-x-auto rounded-xl bg-zinc-950 p-3">

                      <code className="font-mono text-sm text-amber-300">

                        {item.log.url}

                      </code>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <Clock3
                      size={18}
                      className="text-zinc-500"
                    />

                    <div>

                      <p className="text-xs text-zinc-500">
                        Timestamp
                      </p>

                      <p className="text-white">

                        {item.log.timestamp}

                      </p>

                    </div>

                  </div>

                </div>

                <button
                  className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-medium text-black transition hover:bg-amber-400"
                >

                  <ExternalLink size={18} />

                  View Details

                </button>

              </div>

            );

          })}

        </div>
      )}

    </section>
  );
}

export default SecurityIncidents;