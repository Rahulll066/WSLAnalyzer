import {
  ShieldAlert,
  Target,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

function SecurityOverview({ summary }) {

  const threatColor = () => {
    switch (summary?.threat_level) {
      case "High":
        return "text-rose-400";

      case "Medium":
        return "text-orange-400";

      default:
        return "text-emerald-400";
    }
  };

  const getRecommendation = () => {
    switch (summary?.most_common_attack) {
      case "SQL Injection":
        return "Use parameterized queries and validate all user inputs.";

      case "Cross Site Scripting":
        return "Sanitize user input and implement a Content Security Policy.";

      case "Directory Traversal":
        return "Restrict file access and validate all file path inputs.";

      case "Command Injection":
        return "Avoid shell execution and sanitize command parameters.";

      case "Brute Force":
        return "Enable rate limiting, account lockout and multi-factor authentication.";

      case "Security Scanner":
        return "Review suspicious IPs and enable a Web Application Firewall.";

      default:
        return "No critical threats detected. Continue monitoring server activity.";
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8">

        <h2 className="font-['Outfit'] text-3xl font-semibold text-white">
          Security Overview
        </h2>

        <p className="mt-2 text-zinc-500">
          High-level analysis of the uploaded web server logs.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Threat Level */}

        <div className="rounded-2xl bg-zinc-950 p-6">

          <ShieldAlert
            className={`${threatColor()} mb-4`}
            size={28}
          />

          <p className="text-sm text-zinc-500">
            Threat Level
          </p>

          <h3 className={`mt-3 text-2xl font-semibold ${threatColor()}`}>
            {summary?.threat_level}
          </h3>

        </div>

        {/* Most Common Attack */}

        <div className="rounded-2xl bg-zinc-950 p-6">

          <AlertTriangle
            className="mb-4 text-amber-400"
            size={28}
          />

          <p className="text-sm text-zinc-500">
            Most Common Attack
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {summary?.most_common_attack}
          </h3>

        </div>

        {/* Targeted Endpoint */}

        <div className="rounded-2xl bg-zinc-950 p-6">

          <Target
            className="mb-4 text-sky-400"
            size={28}
          />

          <p className="text-sm text-zinc-500">
            Targeted Endpoint
          </p>

          <h3 className="mt-3 truncate text-lg font-semibold text-white">
            {summary?.most_targeted_url}
          </h3>

        </div>

        {/* Recommendation */}

        <div className="rounded-2xl bg-zinc-950 p-6">

          <ShieldCheck
            className="mb-4 text-emerald-400"
            size={28}
          />

          <p className="text-sm text-zinc-500">
            Recommendation
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {getRecommendation()}
          </p>

        </div>

      </div>

    </div>
  );
}

export default SecurityOverview;