import {
  Globe,
  ShieldAlert,
  Activity,
  TriangleAlert,
} from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    key: "total_requests",
    title: "Total Requests",
    icon: Activity,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    key: "suspicious_requests",
    title: "Threats Detected",
    icon: ShieldAlert,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    key: "risk_score",
    title: "Risk Score",
    icon: TriangleAlert,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    key: "unique_ips",
    title: "Unique IPs",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

function SummaryCards({ summary }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        let value = summary?.[card.key];

        if (card.key === "risk_score") {
          value = `${value ?? 0}%`;
        }

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
            }}
            className={`rounded-3xl border ${card.border} bg-zinc-900 p-7 transition`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-500">
                  {card.title}
                </p>

                <h2 className="mt-3 font-['Outfit'] text-5xl font-bold text-white">
                  {value}
                </h2>

              </div>

              <div
                className={`rounded-2xl ${card.bg} p-4`}
              >
                <Icon
                  className={`${card.color}`}
                  size={30}
                />
              </div>

            </div>

            <div className="mt-8 h-[1px] bg-zinc-800"></div>

            <p className="mt-4 text-sm text-zinc-500">

              Updated from current analysis

            </p>

          </motion.div>
        );
      })}
    </div>
  );
}

export default SummaryCards;