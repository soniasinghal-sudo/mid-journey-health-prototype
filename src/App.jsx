import { useState } from "react";

const customers = [
  {
    id: 1, name: "Bright Pixel Studio", product: "Mailchimp", plan: "Standard", tenure: "10 months", score: 24, status: "red",
    owner: "Alex Torres", acv: 3600, churnProb: 82,
    flywheel: "Risk Detection", boulder: "Boulder 1: Predictive Intelligence",
    painSummary: "Email deliverability dropped sharply. Open rates declining for 3 weeks. Tried to fix audience segmentation but bounced from help articles.",
    customerMoments: [
      { day: "3 weeks ago", event: "Deliverability started dropping", icon: "error", detail: "Priya noticed her last campaign had a 15% open rate vs. her usual 28%. She thought it was the subject line and moved on." },
      { day: "2.5 weeks ago", event: "New segmentation UI launched", icon: "change", detail: "Opened audience manager to clean her list. The segmentation UI had changed completely. Spent 45 seconds, couldn't find her saved segments, left." },
      { day: "2 weeks ago", event: "Searched for help", icon: "search", detail: "Searched 'improve deliverability' 4 times across 3 days. Opened 2 articles, spent 12 seconds on each. Generic advice with no specific steps." },
      { day: "10 days ago", event: "Bounce rate flagged", icon: "error", detail: "Two campaigns flagged for high bounce rate. Priya doesn't know why. Deliverability score: 71, down from 92." },
      { day: "1 week ago", event: "Digital assistant failed", icon: "chat", detail: "Tried the digital assistant. It suggested re-verifying her domain. She already did that. Typed 'this is useless' and closed." },
      { day: "5 days ago", event: "Campaign frequency dropped", icon: "decline", detail: "Sent 1 campaign this week vs. her usual 4. Started looking at competitor email tools." },
      { day: "Today", event: "Automation neglected", icon: "silent", detail: "Welcome series still running but she hasn't edited or monitored it in 6 weeks." }
    ],
    signals: {
      usage: { score: 12, label: "Usage Decline", detail: "Campaign sends down from 4/week to 1/week. Audience management dropped 70%. Last automation edit was 6 weeks ago.", baseline: "Was: 4 campaigns/week. Now: 1 campaign/week." },
      errors: { score: 5, label: "Workflow Errors", detail: "Deliverability dropped from 92 to 71. 2 campaigns flagged for high bounce rate. Segment builder errors on custom conditions.", events: ["Deliverability drop: 92 to 71", "High bounce rate (x2)", "Segment builder error"] },
      changes: { score: 4, label: "Product Change Exposure", detail: "New segmentation UI launched 4 weeks ago. Opened once, spent 45 seconds, returned to legacy segments.", impact: "High - segmentation is core to workflow" },
      support: { score: 3, label: "Self-Serve Resolution", detail: "Searched 'improve deliverability' 4 times. Articles averaged 12 seconds. Digital assistant ended with 'this is useless'.", attempts: ["Help search x4", "Article bounce x2 (12s avg)", "Digital assistant: 'this is useless'"] }
    },
    interventions: {
      selfServe: [
        { channel: "In-Product", copy: "Your deliverability score dropped recently. Based on your sending patterns, here are 3 specific fixes for your audience lists that should bring it back up.", altCopy: "We've identified why your open rates are declining. It's likely related to your audience list health. Here's a personalized cleanup plan based on your actual subscriber data.", rationale: "Direct and action-oriented", altRationale: "Empathetic, explains the why before the fix" },
        { channel: "Email", copy: "Hi Alex, your email deliverability has dropped from 92 to 71 over the past 3 weeks. We've analyzed your recent campaigns and have specific recommendations. No generic tips - these are based on your actual data.", altCopy: "Hi Alex, your campaigns aren't reaching as many inboxes as they used to. We looked at your subscriber data and found specific issues. Here's a step-by-step plan tailored to Bright Pixel Studio's audience.", rationale: "Data-forward, establishes credibility with numbers", altRationale: "Warm and personalized, focuses on business impact" }
      ],
      expert: { trigger: "Self-serve attempted 4+ times, deliverability still declining", copy: "Your deliverability needs hands-on attention. Let's connect you with an email strategist who can review your audience health and fix this with you in one session.", scope: "Deliverability audit + audience list cleanup + segmentation migration to new UI" }
    }
  },
  {
    id: 2, name: "Riverside Plumbing Co.", product: "QBO", plan: "Plus", tenure: "14 months", score: 28, status: "red",
    owner: "Sarah Chen", acv: 4200, churnProb: 78,
    flywheel: "Risk Detection", boulder: "Boulder 1: Predictive Intelligence",
    painSummary: "Bank sync failing for 2 weeks. Tried self-serve 3 times with no resolution. Usage down 40% from baseline. Hit by Fusion UI change.",
    customerMoments: [
      { day: "2 weeks ago", event: "Bank sync failed", icon: "error", detail: "Sarah tried to reconcile her accounts Monday morning like she always does. Bank sync error. She retried 3 times." },
      { day: "12 days ago", event: "Searched for help", icon: "search", detail: "Searched 'bank sync error Chase'. Got a generic troubleshooting article. Steps didn't match her setup. Closed after 20 seconds." },
      { day: "10 days ago", event: "Digital assistant attempt", icon: "chat", detail: "Tried the digital assistant. It asked her to reconnect her bank. She already tried that. Typed 'this isn't working' and closed." },
      { day: "8 days ago", event: "Stopped reconciling", icon: "decline", detail: "Hasn't opened bank reconciliation since. Started tracking payments in a spreadsheet instead." },
      { day: "5 days ago", event: "Fusion UI change hit", icon: "change", detail: "Logged in to send an invoice. The invoicing UI had changed. Spent 4 minutes looking for the send button. Rage clicks detected." },
      { day: "3 days ago", event: "Usage dropped sharply", icon: "decline", detail: "Logged in once this week vs. her usual 5x/week. Only checked one payment status." },
      { day: "Today", event: "No login", icon: "silent", detail: "Sarah hasn't logged in today. Her typical pattern is to log in by 8am every weekday." }
    ],
    signals: {
      usage: { score: 15, label: "Usage Decline", detail: "Invoice creation down 60% in last 30 days. Bank reconciliation stopped entirely. Was a daily user, now 2x/week.", baseline: "Was: 22 sessions/week. Now: 4 sessions/week." },
      errors: { score: 5, label: "Workflow Errors", detail: "Bank sync failed 11 times in 14 days. 3 reconciliation mismatches unresolved.", events: ["Bank sync failure (x11)", "Reconciliation mismatch (x3)"] },
      changes: { score: 5, label: "Product Change Exposure", detail: "Fusion UI changed invoicing workflow 28 days ago. Reverted to old flow twice before it was deprecated.", impact: "High - core daily workflow disrupted" },
      support: { score: 3, label: "Self-Serve Resolution", detail: "Searched help 5 times for 'bank sync error'. Digital assistant offered generic troubleshooting. Bounced after 20 seconds each time.", attempts: ["Help search x5", "Digital assistant abandoned x3", "Article bounce rate: 100%"] }
    },
    interventions: {
      selfServe: [
        { channel: "In-Product", copy: "We noticed your bank connection has been having trouble. Here's a step-by-step fix specific to your bank (Chase Business). This usually resolves in under 5 minutes.", altCopy: "Your bank sync needs attention. We've identified the issue and created a personalized fix based on your Chase Business account setup. Tap to resolve now.", rationale: "Warm, acknowledges the struggle, gives time estimate", altRationale: "Direct and urgent, leads with the fix" },
        { channel: "Email", copy: "Hi Sarah, your QuickBooks bank connection has been interrupted for 2 weeks. We know this is blocking your reconciliation workflow. Here's a direct fix tailored to your setup - no searching required.", altCopy: "Hi Sarah, we can see your bank sync isn't working the way it should. Since you rely on daily reconciliation, we've put together a quick fix specific to your account. Takes about 3 minutes.", rationale: "Acknowledges business impact, positions as effortless", altRationale: "Shows we understand her routine, gives time commitment" }
      ],
      expert: { trigger: "Self-serve attempted 3+ times without resolution", copy: "We can see you've been trying to fix this. Let's connect you with an expert who already knows your setup and can resolve this in one session.", scope: "Bank sync resolution + reconciliation catch-up for Chase Business integration" }
    }
  },
  {
    id: 3, name: "Summit Tax Advisors", product: "QBO", plan: "Advanced", tenure: "8 months", score: 52, status: "yellow",
    owner: "Marcus Rivera", acv: 7800, churnProb: 41,
    flywheel: "Intervention & Saves", boulder: "Boulder 3: Proactive Save System",
    painSummary: "Custom report usage declining. Recent reporting UI update caused confusion. Reverted to classic view and started using Excel workarounds.",
    customerMoments: [
      { day: "3 weeks ago", event: "Modern Reporting update landed", icon: "change", detail: "Marcus opened QBO to run his weekly client reports. The reporting interface looked completely different. Clicked around for 2 minutes, then switched to classic view." },
      { day: "2 weeks ago", event: "Searched for help", icon: "search", detail: "Searched 'custom report columns missing'. Found an article, read halfway through, but screenshots didn't match his screen. Left without finishing." },
      { day: "10 days ago", event: "Report export failed", icon: "error", detail: "Tried to export a client report to PDF. Formatting was broken. Had to manually adjust in Excel before sending to his client." },
      { day: "1 week ago", event: "Digital assistant failed", icon: "chat", detail: "Tried the digital assistant about custom report columns. Got generic instructions for the new UI. Typed 'this didn't help' and closed." },
      { day: "5 days ago", event: "Report volume declining", icon: "decline", detail: "Generated 3 custom reports this week vs. his usual 8. Started using Excel templates for two client reports." },
      { day: "Today", event: "Still on classic view", icon: "silent", detail: "Marcus is still using classic reporting. Hasn't attempted the new interface since week 1." }
    ],
    signals: {
      usage: { score: 18, label: "Usage Decline", detail: "Custom report generation down 35% this month. Core invoicing and payroll still regular. Advanced features stalling.", baseline: "Was: 8 custom reports/week. Now: 3 custom reports/week." },
      errors: { score: 15, label: "Workflow Errors", detail: "1 report export failed. Report formatting inconsistencies reported.", events: ["Report export failure (x1)", "Formatting inconsistency"] },
      changes: { score: 10, label: "Product Change Exposure", detail: "Modern Reporting update 3 weeks ago. Opened new interface, reverted to classic view. Hasn't tried new features.", impact: "Medium - advanced workflow disrupted, core tasks fine" },
      support: { score: 9, label: "Self-Serve Resolution", detail: "Searched 'custom report columns' twice. Read article but didn't complete steps. Digital assistant: 'this didn't help'.", attempts: ["Help search x2", "Digital assistant: 'this didn't help'"] }
    },
    interventions: {
      selfServe: [
        { channel: "In-Product", copy: "The new reporting tools can save you time on the custom reports you build weekly. Here's a 2-minute walkthrough tailored to the report types you use most.", altCopy: "We noticed you switched back to classic reports. The new tools support everything you were doing, plus faster exports. Want a quick guided tour based on your most-used reports?", rationale: "Benefit-led, positions the change as an upgrade", altRationale: "Acknowledges the revert, offers personalized help" },
        { channel: "Email", copy: "Hi Marcus, we see you've been building custom reports in the classic view. The updated tools were designed for power users like you - here's how your specific reports translate to the new system.", altCopy: "Hi Marcus, the recent reporting update has new capabilities for the types of reports you run most. Here's a personalized walkthrough that maps your current reports to the new tools.", rationale: "Flatters expertise, frames as translation not relearning", altRationale: "Feature-forward, emphasizes personalization" }
      ],
      expert: { trigger: "Self-serve nudge ignored after 7 days", copy: "Want a 15-minute session with a reporting specialist? They'll help migrate your custom reports to the new system so nothing breaks.", scope: "Custom report migration from classic to Modern Reporting for Advanced users" }
    }
  },
  {
    id: 4, name: "Nomad Coffee Roasters", product: "Mailchimp", plan: "Premium", tenure: "6 months", score: 55, status: "yellow",
    owner: "Jamie Okonkwo", acv: 13800, churnProb: 35,
    flywheel: "Intervention & Saves", boulder: "Boulder 4: Product Change as Retention Tailwind",
    painSummary: "Automation usage dropped after journey builder redesign. Customer journey builder untouched for 3 weeks despite being a core workflow.",
    customerMoments: [
      { day: "3 weeks ago", event: "Journey builder redesign", icon: "change", detail: "Jamie opened the journey builder to edit a post-purchase flow. Entire interface had changed. Got confused by new node types, abandoned mid-flow." },
      { day: "2 weeks ago", event: "Searched for help", icon: "search", detail: "Searched 'customer journey builder changes'. Read the full article but didn't take action. Article explained features but not how existing journeys translate." },
      { day: "10 days ago", event: "Automation trigger misfire", icon: "error", detail: "One automation sent a welcome email to an existing customer. Self-corrected but Jamie noticed and was concerned." },
      { day: "1 week ago", event: "Journey edits stopped", icon: "decline", detail: "Zero journey edits in 21 days. Previously editing 3x/week. Automations running on autopilot." },
      { day: "Today", event: "Campaigns still going", icon: "healthy", detail: "Still sending 2 campaigns/week. But the automation side of her strategy has gone dormant." }
    ],
    signals: {
      usage: { score: 16, label: "Usage Decline", detail: "Campaign sends stable but automation usage dropped. Journey builder untouched for 3 weeks.", baseline: "Was: 3 journey edits/week. Now: 0 in last 21 days." },
      errors: { score: 18, label: "Workflow Errors", detail: "One automation trigger misfired, self-corrected. No critical errors.", events: ["Automation misfire (x1, self-resolved)"] },
      changes: { score: 8, label: "Product Change Exposure", detail: "Journey builder redesign 3 weeks ago. Opened new builder, started editing, abandoned. Hasn't returned.", impact: "High - automation is primary Premium use case" },
      support: { score: 13, label: "Self-Serve Resolution", detail: "One help search for 'journey builder changes'. Read article but took no action.", attempts: ["Help search: read but no action"] }
    },
    interventions: {
      selfServe: [
        { channel: "In-Product", copy: "The journey builder got an upgrade. Your existing automations still work perfectly. Here's what changed and how your current journeys map to the new tools - takes 2 minutes.", altCopy: "We noticed you haven't been back to the journey builder since the update. Your automations are still running. Want a quick walkthrough based on the journeys you've already built?", rationale: "Reassures first, then offers help", altRationale: "Acknowledges the gap directly, personalizes the offer" },
        { channel: "Email", copy: "Hi Jamie, your automations are still running smoothly, but you haven't edited any journeys since the builder update. Here's a personalized guide showing how your existing 5 journeys translate to the new tools.", altCopy: "Hi Jamie, the journey builder update was designed to make what you're already doing easier. Here's a side-by-side of your current journeys in the old vs. new builder - nothing is lost.", rationale: "Specific (mentions 5 journeys), shows we know her account", altRationale: "Frames change as improvement, removes fear of loss" }
      ],
      expert: { trigger: "No journey builder engagement 14 days after nudge", copy: "Want a walkthrough of the new journey builder using your actual automations? A Mailchimp strategist can migrate your top journeys with you in 20 minutes.", scope: "Journey builder migration for 5 active automations + new feature orientation" }
    }
  }
];

const statusColor = (s) => s === "red" ? "#EF4444" : s === "yellow" ? "#F59E0B" : "#10B981";
const statusBg = (s) => s === "red" ? "#FEF2F2" : s === "yellow" ? "#FFFBEB" : "#F0FDF4";
const statusBorder = (s) => s === "red" ? "#FECACA" : s === "yellow" ? "#FDE68A" : "#BBF7D0";
const productBg = (p) => p === "QBO" ? "#E8F5E9" : "#FFF9E0";
const productText = (p) => p === "QBO" ? "#2CA01C" : "#241C15";
const productBorder = (p) => p === "QBO" ? "#2CA01C" : "#FFE01B";

const momentIcon = (icon) => {
  const icons = {
    error: { bg: "#FEE2E2", color: "#DC2626", symbol: "!" },
    search: { bg: "#DBEAFE", color: "#2563EB", symbol: "?" },
    chat: { bg: "#E0E7FF", color: "#4F46E5", symbol: "\u2026" },
    decline: { bg: "#FEF3C7", color: "#D97706", symbol: "\u2193" },
    change: { bg: "#F3E8FF", color: "#7C3AED", symbol: "\u0394" },
    silent: { bg: "#F3F4F6", color: "#6B7280", symbol: "\u2014" },
    healthy: { bg: "#D1FAE5", color: "#059669", symbol: "\u2713" }
  };
  const i = icons[icon] || icons.silent;
  return (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: i.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: i.color, flexShrink: 0 }}>
      {i.symbol}
    </div>
  );
};

const ScoreRing = ({ score, status, size = 56 }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="6" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={statusColor(status)} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" style={{ transform: "rotate(90deg)", transformOrigin: "center", fontSize: size > 50 ? "14px" : "11px", fontWeight: 700, fill: "#1F2937" }}>{score}</text>
    </svg>
  );
};

const SignalBar = ({ label, score, max = 25 }) => {
  const pct = Math.min((score / max) * 100, 100);
  const clr = pct > 70 ? "#10B981" : pct > 40 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 3 }}>
        <span>{label}</span><span>{score}/{max}</span>
      </div>
      <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3 }}>
        <div style={{ height: 6, width: `${pct}%`, background: clr, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
};

const fmt = (n) => "$" + n.toLocaleString();

export default function App() {
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("journey");
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? customers : customers.filter(c => c.product === filter);
  const totalAtRisk = filtered.reduce((s, c) => s + Math.round(c.acv * c.churnProb / 100), 0);

  if (view === "list") {
    return (
      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 4px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer Retention Beyond 90 Days</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>What Are Your Customers Experiencing Right Now?</h1>
          <p style={{ fontSize: 14, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>After onboarding, customers enter a dead zone. No health visibility, no proactive guidance, no intervention until they try to cancel.</p>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140, padding: 14, background: "#FEF2F2", borderRadius: 10, border: "1px solid #FECACA" }}>
            <p style={{ fontSize: 11, color: "#991B1B", margin: "0 0 2px", fontWeight: 500 }}>Revenue at Risk (this view)</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#DC2626", margin: 0 }}>{fmt(totalAtRisk)}</p>
          </div>
          <div style={{ flex: 1, minWidth: 140, padding: 14, background: "#FEF2F2", borderRadius: 10, border: "1px solid #FECACA" }}>
            <p style={{ fontSize: 11, color: "#991B1B", margin: "0 0 2px", fontWeight: 500 }}>Customers Needing Intervention</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#DC2626", margin: 0 }}>{filtered.length}</p>
          </div>
          <div style={{ flex: 1, minWidth: 140, padding: 14, background: "#FFFBEB", borderRadius: 10, border: "1px solid #FDE68A" }}>
            <p style={{ fontSize: 11, color: "#92400E", margin: "0 0 2px", fontWeight: 500 }}>Avg Churn Probability</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#D97706", margin: 0 }}>{Math.round(filtered.reduce((s, c) => s + c.churnProb, 0) / filtered.length)}%</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 3, marginBottom: 20 }}>
          {[["all", "All Customers"], ["QBO", "QuickBooks"], ["Mailchimp", "Mailchimp"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{ padding: "6px 14px", fontSize: 12, fontWeight: filter === k ? 600 : 400, background: filter === k ? "white" : "transparent", color: filter === k ? "#111827" : "#6B7280", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: filter === k ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>{l}</button>
          ))}
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map(c => {
            const revAtRisk = Math.round(c.acv * c.churnProb / 100);
            return (
              <div key={c.id} onClick={() => { setSelected(c); setView("detail"); setTab("journey"); }}
                style={{ padding: 16, background: "white", border: `1px solid ${statusBorder(c.status)}`, borderRadius: 12, cursor: "pointer", transition: "box-shadow 0.2s", borderLeft: `4px solid ${statusColor(c.status)}` }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <ScoreRing score={c.score} status={c.status} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{c.name}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: productBg(c.product), color: productText(c.product), border: `1px solid ${productBorder(c.product)}`, fontWeight: 500 }}>{c.product} {c.plan}</span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c.tenure}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#FEF2F2", color: "#DC2626", fontWeight: 500 }}>{fmt(revAtRisk)} at risk</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#4B5563", margin: "0 0 8px", lineHeight: 1.5, fontStyle: "italic" }}>"{c.customerMoments[c.customerMoments.length - 2]?.detail || c.customerMoments[0]?.detail}"</p>
                    <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>Latest: {c.customerMoments[c.customerMoments.length - 1]?.event}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 4 }}><path d="M7 5l5 5-5 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB" }}>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 8px", fontWeight: 600 }}>Today, we have no way to see any of this until they try to cancel.</p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[["red", "At Risk", "Immediate intervention needed"], ["yellow", "Declining", "Monitor and nudge"]].map(([s, l, d]) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor(s) }} />
                <div><span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{l}</span><span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>{d}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const c = selected;
  if (!c) return null;
  const sigs = c.signals;
  const revAtRisk = Math.round(c.acv * c.churnProb / 100);
  const revSaved = Math.round(revAtRisk * 0.6);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
      <button onClick={() => setView("list")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back to Customers
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
        <ScoreRing score={c.score} status={c.status} size={64} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>{c.name}</h2>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: productBg(c.product), color: productText(c.product), border: `1px solid ${productBorder(c.product)}`, fontWeight: 500 }}>{c.product} {c.plan}</span>
          </div>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>{c.owner} | Tenure: {c.tenure} | Status: <span style={{ color: statusColor(c.status), fontWeight: 600 }}>{c.status === "red" ? "At Risk" : "Declining"}</span></p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 100, padding: 10, background: "#F9FAFB", borderRadius: 8, textAlign: "center", border: "1px solid #E5E7EB" }}>
          <p style={{ fontSize: 10, color: "#6B7280", margin: "0 0 2px" }}>Annual Value</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>{fmt(c.acv)}</p>
        </div>
        <div style={{ flex: 1, minWidth: 100, padding: 10, background: "#FEF2F2", borderRadius: 8, textAlign: "center", border: "1px solid #FECACA" }}>
          <p style={{ fontSize: 10, color: "#991B1B", margin: "0 0 2px" }}>Churn Probability</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#DC2626", margin: 0 }}>{c.churnProb}%</p>
        </div>
        <div style={{ flex: 1, minWidth: 100, padding: 10, background: "#FEF2F2", borderRadius: 8, textAlign: "center", border: "1px solid #FECACA" }}>
          <p style={{ fontSize: 10, color: "#991B1B", margin: "0 0 2px" }}>Revenue at Risk</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#DC2626", margin: 0 }}>{fmt(revAtRisk)}</p>
        </div>
        <div style={{ flex: 1, minWidth: 100, padding: 10, background: "#F0FDF4", borderRadius: 8, textAlign: "center", border: "1px solid #BBF7D0" }}>
          <p style={{ fontSize: 10, color: "#065F46", margin: "0 0 2px" }}>Est. Recoverable</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#059669", margin: 0 }}>{fmt(revSaved)}</p>
        </div>
      </div>

      <div style={{ display: "inline-block", fontSize: 10, padding: "3px 10px", borderRadius: 4, background: "#EFF6FF", color: "#1E40AF", fontWeight: 500, marginBottom: 16 }}>
        {c.flywheel} | {c.boulder}
      </div>

      <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 3, marginBottom: 20 }}>
        {[["journey", "Customer Journey"], ["signals", "Health Signals"], ["interventions", "Interventions"], ["expert", "Expert Brief"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "8px 8px", fontSize: 12, fontWeight: tab === k ? 600 : 400, background: tab === k ? "white" : "transparent", color: tab === k ? "#111827" : "#6B7280", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,0.08)" : "none" }}>{l}</button>
        ))}
      </div>

      {tab === "journey" && (
        <div>
          <div style={{ padding: 14, background: statusBg(c.status), border: `1px solid ${statusBorder(c.status)}`, borderRadius: 10, marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}><strong>What {c.owner.split(" ")[0]} is experiencing:</strong> {c.painSummary}</p>
          </div>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "#E5E7EB" }} />
            {c.customerMoments.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, position: "relative" }}>
                <div style={{ position: "relative", zIndex: 1 }}>{momentIcon(m.icon)}</div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{m.day}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{m.event}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.5 }}>{m.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 14, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#991B1B", margin: "0 0 6px" }}>Without Intervention</p>
              <p style={{ fontSize: 12, color: "#991B1B", margin: "0 0 4px", lineHeight: 1.5 }}>Projected churn within 30 days</p>
              <p style={{ fontSize: 12, color: "#991B1B", margin: "0 0 4px" }}>Revenue lost: {fmt(revAtRisk)}/yr</p>
              <p style={{ fontSize: 11, color: "#B91C1C", margin: 0 }}>{c.owner.split(" ")[0]} joins the 125K customers we lose every month without ever telling us why.</p>
            </div>
            <div style={{ padding: 14, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#065F46", margin: "0 0 6px" }}>With Intervention</p>
              <p style={{ fontSize: 12, color: "#065F46", margin: "0 0 4px", lineHeight: 1.5 }}>Projected recovery to green in 14 days</p>
              <p style={{ fontSize: 12, color: "#065F46", margin: "0 0 4px" }}>Revenue preserved: {fmt(revSaved)}/yr</p>
              <p style={{ fontSize: 11, color: "#047857", margin: 0 }}>Contextual nudge resolves the core issue. {c.owner.split(" ")[0]} returns to normal usage patterns.</p>
            </div>
          </div>
        </div>
      )}

      {tab === "signals" && (
        <div>
          <div style={{ padding: 16, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 12px" }}>Health Score Breakdown</h3>
            {Object.values(sigs).map((s, i) => <SignalBar key={i} label={s.label} score={s.score} />)}
          </div>
          {Object.values(sigs).map((s, i) => (
            <div key={i} style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 6px" }}>{s.label}</h4>
              <p style={{ fontSize: 12, color: "#4B5563", margin: "0 0 6px", lineHeight: 1.5 }}>{s.detail}</p>
              {s.baseline && <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{s.baseline}</p>}
              {s.events && s.events.length > 0 && (
                <div style={{ marginTop: 6 }}>{s.events.map((e, j) => <span key={j} style={{ display: "inline-block", fontSize: 11, padding: "2px 8px", background: "#FEF2F2", color: "#991B1B", borderRadius: 4, marginRight: 4, marginBottom: 4 }}>{e}</span>)}</div>
              )}
              {s.attempts && s.attempts.length > 0 && (
                <div style={{ marginTop: 6 }}>{s.attempts.map((a, j) => <span key={j} style={{ display: "inline-block", fontSize: 11, padding: "2px 8px", background: "#FFF7ED", color: "#92400E", borderRadius: 4, marginRight: 4, marginBottom: 4 }}>{a}</span>)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "interventions" && (
        <div>
          <div style={{ padding: 14, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1E40AF", margin: "0 0 4px" }}>Decision Logic</h3>
            <p style={{ fontSize: 12, color: "#1E40AF", margin: 0, lineHeight: 1.5 }}>
              {c.score <= 35 ? `${c.owner.split(" ")[0]} is at high risk. Self-serve has been attempted multiple times without resolution. System recommends parallel self-serve fix + expert escalation.` : `${c.owner.split(" ")[0]} is showing early decline. Start with contextual self-serve nudge. Escalate to expert if no engagement within 7 days.`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120, padding: 12, background: statusBg(c.status), borderRadius: 8, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 2px" }}>Channel</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{c.score <= 35 ? "In-Product + Email" : "In-Product first"}</p>
            </div>
            <div style={{ flex: 1, minWidth: 120, padding: 12, background: statusBg(c.status), borderRadius: 8, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 2px" }}>Urgency</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{c.score <= 35 ? "Immediate" : "Within 48 hours"}</p>
            </div>
            <div style={{ flex: 1, minWidth: 120, padding: 12, background: statusBg(c.status), borderRadius: 8, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 2px" }}>Expert Escalation</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>Ready if self-serve fails</p>
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 12px" }}>Self-Serve Nudges</h3>
          {c.interventions.selfServe.map((iv, i) => (
            <div key={i} style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, padding: "2px 8px", background: iv.channel === "In-Product" ? "#ECFDF5" : "#EFF6FF", color: iv.channel === "In-Product" ? "#065F46" : "#1E40AF", borderRadius: 4, fontWeight: 500 }}>{iv.channel}</span>
              <div style={{ marginTop: 10, marginBottom: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", margin: "0 0 4px" }}>Option A <span style={{ fontWeight: 400, fontStyle: "italic" }}>- {iv.rationale}</span></p>
                <p style={{ fontSize: 13, color: "#1F2937", margin: 0, lineHeight: 1.5, padding: 10, background: "#F9FAFB", borderRadius: 6 }}>{iv.copy}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", margin: "0 0 4px" }}>Option B <span style={{ fontWeight: 400, fontStyle: "italic" }}>- {iv.altRationale}</span></p>
                <p style={{ fontSize: 13, color: "#1F2937", margin: 0, lineHeight: 1.5, padding: 10, background: "#F9FAFB", borderRadius: 6 }}>{iv.altCopy}</p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 12px" }}>Expert Escalation Path</h3>
            <div style={{ padding: 14, background: "#FFF7ED", border: "1px solid #FDE68A", borderRadius: 10 }}>
              <p style={{ fontSize: 11, color: "#92400E", margin: "0 0 6px" }}><strong>Trigger:</strong> {c.interventions.expert.trigger}</p>
              <p style={{ fontSize: 13, color: "#1F2937", margin: "0 0 8px", lineHeight: 1.5 }}>{c.interventions.expert.copy}</p>
              <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}><strong>Expert session scope:</strong> {c.interventions.expert.scope}</p>
            </div>
          </div>
        </div>
      )}

      {tab === "expert" && (
        <div>
          <div style={{ padding: 16, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 12px" }}>Expert Brief: {c.name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["Product", `${c.product} ${c.plan}`], ["Tenure", c.tenure], ["Health Score", `${c.score}/100 (${c.status === "red" ? "At Risk" : "Declining"})`], ["Primary Issue", Object.values(sigs).sort((a, b) => a.score - b.score)[0].label]].map(([k, v], i) => (
                <div key={i}>
                  <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 2px" }}>{k}</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#111827", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 14, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#991B1B", margin: "0 0 6px" }}>Do NOT treat this customer as a beginner</h4>
            <p style={{ fontSize: 12, color: "#991B1B", margin: 0, lineHeight: 1.5 }}>{c.owner.split(" ")[0]} has been on {c.product} for {c.tenure}. They know the product. Their issue is specific, not general. Start from their context, not a troubleshooting script.</p>
          </div>

          <div style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>What This Customer Uses</h4>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.6 }}>{sigs.usage.detail}</p>
          </div>

          <div style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>What Broke</h4>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.6 }}>{sigs.errors.detail}</p>
            {sigs.errors.events && sigs.errors.events.length > 0 && (
              <div style={{ marginTop: 6 }}>{sigs.errors.events.map((e, j) => <span key={j} style={{ display: "inline-block", fontSize: 11, padding: "2px 8px", background: "#FEF2F2", color: "#991B1B", borderRadius: 4, marginRight: 4, marginBottom: 4 }}>{e}</span>)}</div>
            )}
          </div>

          <div style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>Recent Product Changes</h4>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.6 }}>{sigs.changes.detail}</p>
            <p style={{ fontSize: 11, color: "#9CA3AF", margin: "4px 0 0" }}>Impact: {sigs.changes.impact}</p>
          </div>

          <div style={{ padding: 14, background: "white", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>Self-Serve Attempts (Failed)</h4>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.6 }}>{sigs.support.detail}</p>
          </div>

          <div style={{ padding: 14, background: "#ECFDF5", border: "1px solid #BBF7D0", borderRadius: 10 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#065F46", margin: "0 0 6px" }}>Recommended Action for This Session</h4>
            <p style={{ fontSize: 13, color: "#065F46", margin: "0 0 6px", lineHeight: 1.5 }}>{c.interventions.expert.copy}</p>
            <p style={{ fontSize: 12, color: "#065F46", margin: 0 }}><strong>Scope:</strong> {c.interventions.expert.scope}</p>
          </div>
        </div>
      )}
    </div>
  );
}
