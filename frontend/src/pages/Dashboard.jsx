import { useState } from "react";

import Hero from "../components/Hero";
import SummaryCards from "../components/SummaryCards";
import AttackTimeline from "../components/AttackTimeline";
import AttackChart from "../components/AttackChart";
import StatusChart from "../components/StatusChart";
import ThreatFeed from "../components/ThreatFeed";
import TopIPs from "../components/TopIPs";
import FindingsTable from "../components/SecurityIncidents";
import SecurityOverview from "../components/SecurityOverview";
import Footer from "../components/Footer";

function Dashboard() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-[#0E0E10]">

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <Hero
          setAnalysis={setAnalysis}
          analysis={analysis}
        />

        {/* Dashboard */}
        {analysis && (

          <div className="mt-14 space-y-8">

            <SummaryCards summary={analysis.summary} />

            <SecurityOverview summary={analysis.summary} />

            <AttackTimeline
              results={analysis.results}
            />

            <div className="grid gap-8 xl:grid-cols-2">

              <AttackChart
                summary={analysis.summary}
              />

              <StatusChart
                summary={analysis.summary}
              />

            </div>

            <div className="grid gap-8 xl:grid-cols-2">

              <ThreatFeed
                results={analysis.results}
              />

              <TopIPs
                summary={analysis.summary}
              />

            </div>

            <FindingsTable
              results={analysis.results}
            />


          </div>

        )}

        <Footer/>

      </main>

    </div>
  );
}

export default Dashboard;