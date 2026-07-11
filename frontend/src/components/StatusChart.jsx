function StatusChart({ summary }) {
  const statusCodes = summary?.status_codes || {};

  const data = Object.entries(statusCodes).map(([code, count]) => ({
    code,
    count,
  }));

  const max = Math.max(...data.map((d) => d.count), 1);

  const getColor = (status) => {
    if (status.startsWith("2")) return "bg-emerald-500";
    if (status.startsWith("3")) return "bg-sky-500";
    if (status.startsWith("4")) return "bg-amber-500";
    if (status.startsWith("5")) return "bg-rose-500";

    return "bg-zinc-500";
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8">

        <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
          HTTP Status Codes
        </h2>

        <p className="mt-2 text-zinc-500">
          Distribution of server responses
        </p>

      </div>

      {data.length === 0 ? (

        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500">
          No status code data.
        </div>

      ) : (

        <div className="space-y-6">

          {data.map((item) => (

            <div key={item.code}>

              <div className="mb-2 flex justify-between">

                <span className="font-semibold text-white">
                  {item.code}
                </span>

                <span className="text-zinc-400">
                  {item.count}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className={`h-full rounded-full ${getColor(item.code)}`}
                  style={{
                    width: `${(item.count / max) * 100}%`,
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

export default StatusChart;