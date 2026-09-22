"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  FileSpreadsheet,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  X,
  Clock3,
  Activity,
  AlertCircle,
  BookOpen,
  Layers3,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  cn,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@kbs/ui";
import { bankDisplay } from "@kbs/domain";

type Tab =
  | "Overview"
  | "Lead workspace"
  | "Import centre"
  | "Payouts"
  | "Project readiness";
const examples = [
  {
    id: "DEMO-001",
    name: "Example customer A",
    bank: "HDFC",
    card: "Catalogue mapping pending",
    stage: "Decisioned Cases",
    decision: "Approve",
    activation: "INACTIVE",
    matched: true,
    date: "22 Sep 2026 · 10:00 UTC",
    reason: "No reason reported",
    initial: "A",
  },
  {
    id: "DEMO-002",
    name: "Example customer B",
    bank: "HDFC",
    card: "Catalogue mapping pending",
    stage: "Document Curing",
    decision: "Inprocess",
    activation: "#N/A",
    matched: true,
    date: "21 Sep 2026 · 10:00 UTC",
    reason: "Example bank text: additional document review",
    initial: "B",
  },
  {
    id: "DEMO-003",
    name: "Example customer C",
    bank: "Issuer not linked",
    card: "Catalogue mapping pending",
    stage: null,
    decision: null,
    activation: null,
    matched: false,
    date: "No matching MIS",
    reason: "Bank application reference not yet available",
    initial: "C",
  },
];
type Lead = (typeof examples)[number];
const icons = {
  Overview: LayoutDashboard,
  "Lead workspace": Layers3,
  "Import centre": FileSpreadsheet,
  Payouts: Wallet,
  "Project readiness": ShieldCheck,
};
const readiness = [
  ["Shared rules", "Core verified"],
  ["Web & Android", "Foundation"],
  ["OTP & sessions", "Not connected"],
  ["MIS workbook import", "Planned"],
  ["Calling & identity", "Provider required"],
  ["Payout settlement", "Policy required"],
];
export default function Home() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const filtered = examples.filter(
    (l) =>
      `${l.name} ${l.id} ${l.bank}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (filter === "all" || (filter === "matched" ? l.matched : !l.matched)),
  );
  return (
    <div className="min-h-screen lg:flex">
      <aside className="flex flex-col bg-[#122e2f] text-white lg:fixed lg:inset-y-0 lg:w-60">
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="flex size-10 items-center justify-center rounded-xl bg-teal-300 text-lg font-bold text-[#123b39]">
            K
          </div>
          <div>
            <p className="text-xl font-bold tracking-widest">KBS</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[.2em] text-teal-100/50">
              Partner operations
            </p>
          </div>
        </div>
        <div className="px-6 pb-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">
          Workspace
        </div>
        <nav
          aria-label="Main navigation"
          className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col"
        >
          {(Object.keys(icons) as Tab[]).map((t) => {
            const Icon = icons[t];
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-current={tab === t ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-teal-300",
                  tab === t
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon size={17} />
                {t}
                {tab === t && (
                  <span className="ml-auto size-1.5 rounded-full bg-teal-300" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="mx-5 mt-auto hidden border-t border-white/10 py-6 lg:block">
          <div className="flex items-center gap-2 text-xs text-teal-200">
            <ShieldCheck size={15} /> Evidence comes first
          </div>
          <p className="mt-2 text-xs leading-5 text-white/40">
            Bank facts stay separate from activity and payments.
          </p>
        </div>
      </aside>
      <div className="min-w-0 flex-1 lg:ml-60">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:px-9">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            Workspace <ChevronRight size={13} />
            <span className="font-medium text-slate-700">{tab}</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="border-amber-200 bg-amber-50 text-amber-800">
              Development preview
            </Badge>
            <div
              aria-label="Admin preview"
              className="flex size-8 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-800"
            >
              AD
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1450px] px-5 py-7 lg:px-9 lg:py-9">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-teal-700">
                KBS / CREDIT CARD OPERATIONS
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {tab === "Overview" ? "Your operations, in focus." : tab}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {tab === "Overview"
                  ? "A clear view of leads, bank evidence and payout readiness."
                  : "One workspace. Clear ownership. Traceable decisions."}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setTab("Project readiness")}
            >
              <BookOpen />
              View readiness
            </Button>
          </div>
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-3 text-xs leading-5 text-teal-900">
            <AlertCircle className="mt-0.5 shrink-0" size={16} />
            <p>
              <strong>Synthetic preview.</strong> These examples demonstrate the
              interface and source labels. No customer data, bank connection or
              live payout is shown. Full workflows are tracked in the
              repository’s feature specifications.
            </p>
          </div>
          {tab === "Overview" && (
            <>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Example leads", "03", "Synthetic records", Layers3],
                  [
                    "MIS matched",
                    "02",
                    "Example evidence only",
                    FileSpreadsheet,
                  ],
                  ["Awaiting MIS", "01", "No bank status inferred", Clock3],
                  [
                    "Available payouts",
                    "—",
                    "Commercial policy required",
                    Wallet,
                  ],
                ].map(([label, value, sub, Icon]) => {
                  const I = Icon as typeof Wallet;
                  return (
                    <Card key={String(label)} className="shadow-none">
                      <CardContent className="p-5">
                        <div className="mb-5 flex items-center justify-between text-xs font-medium text-slate-500">
                          {String(label)}
                          <I size={17} className="text-slate-400" />
                        </div>
                        <div className="text-3xl font-semibold tracking-tight">
                          {String(value)}
                        </div>
                        <div className="mt-2 text-[11px] text-slate-400">
                          {String(sub)}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="mb-6 grid gap-5 xl:grid-cols-[1.8fr_1fr]">
                <Card className="overflow-hidden border-0 bg-[#173e3c] text-white shadow-none">
                  <CardContent className="p-7">
                    <div className="flex items-center gap-2 text-xs text-teal-200">
                      <Activity size={16} />
                      THE SOURCE OF TRUTH
                    </div>
                    <h2 className="mt-4 max-w-md text-2xl font-medium leading-snug">
                      Bank-reported facts.
                      <br />A clearer picture of every lead.
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-teal-50/60">
                      Stage, decision and activation each tell a different
                      story. Keep the original MIS values and the evidence
                      behind them.
                    </p>
                    <Button
                      onClick={() => setTab("Lead workspace")}
                      className="mt-5 bg-teal-200 text-teal-950 hover:bg-teal-100"
                    >
                      Explore lead examples
                      <ArrowUpRight />
                    </Button>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm">
                      Three sources. Clear boundaries.
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      [
                        FileSpreadsheet,
                        "Bank MIS",
                        "Stage · decision · activation",
                      ],
                      [
                        Users,
                        "KBS activity",
                        "Lead creation · links · follow-ups",
                      ],
                      [
                        Wallet,
                        "Accounts payment",
                        "Approvals · proof · settlement",
                      ],
                    ].map(([Icon, label, desc]) => {
                      const I = Icon as typeof Wallet;
                      return (
                        <div
                          key={String(label)}
                          className="flex items-center gap-3"
                        >
                          <div className="rounded-lg bg-slate-50 p-2.5 text-teal-700">
                            <I size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {String(label)}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                              {String(desc)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          {(tab === "Overview" || tab === "Lead workspace") && (
            <Card className="overflow-hidden shadow-none">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <div>
                  <h2 className="text-sm font-semibold">Lead workspace</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Synthetic examples · bank facts shown independently
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <Input
                      aria-label="Search example leads"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search leads..."
                      className="w-48 pl-9"
                    />
                  </div>
                  <select
                    aria-label="MIS match filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 text-xs"
                  >
                    <option value="all">All examples</option>
                    <option value="matched">MIS matched</option>
                    <option value="awaiting">Awaiting MIS</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase tracking-wider text-slate-400">
                    <tr>
                      {[
                        "Customer / Reference",
                        "Bank",
                        "Current stage",
                        "Final decision",
                        "Card activation",
                        "",
                      ].map((h, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="px-5 py-3 font-medium"
                        >
                          {h || <span className="sr-only">Details</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr
                        key={l.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                              {l.initial}
                            </span>
                            <div>
                              <p className="font-semibold text-slate-700">
                                {l.name}
                              </p>
                              <p className="mt-1 text-[10px] text-slate-400">
                                {l.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-slate-500">{l.bank}</td>
                        <td className="px-5 py-5">
                          <Badge>{bankDisplay(l.stage, l.matched)}</Badge>
                        </td>
                        <td className="px-5 py-5">
                          <Badge
                            className={
                              l.decision === "Approve"
                                ? "border-teal-100 bg-teal-50 text-teal-800"
                                : ""
                            }
                          >
                            {bankDisplay(l.decision, l.matched)}
                          </Badge>
                        </td>
                        <td className="px-5 py-5">
                          <Badge
                            className={
                              l.activation === "INACTIVE"
                                ? "border-amber-100 bg-amber-50 text-amber-800"
                                : ""
                            }
                          >
                            {bankDisplay(l.activation, l.matched)}
                          </Badge>
                        </td>
                        <td className="px-5 py-5">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`View ${l.name}`}
                            onClick={() => setSelected(l)}
                          >
                            <ChevronRight />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="p-10 text-center text-sm text-slate-500">
                    No examples match your search.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[10px] text-slate-400">
                <span>{filtered.length} of 3 synthetic examples</span>
                <span>Bank approval is not card activation</span>
              </div>
            </Card>
          )}
          {tab === "Import centre" && (
            <div className="grid gap-5 md:grid-cols-3">
              {[
                [
                  "Customer calling list",
                  "NAME, PAN NO, MOBILE, Pincode",
                  "Source consent and duplicate policy required",
                ],
                [
                  "Bank sourcing pincodes",
                  "Nine bank-specific sheet profiles",
                  "Reviewed sourceability mapping required",
                ],
                [
                  "Bank MIS",
                  "Exact references and raw bank facts",
                  "Approved snapshot/delta policy required",
                ],
              ].map(([title, desc, gate]) => (
                <Card key={title} className="shadow-none">
                  <CardHeader>
                    <FileSpreadsheet className="mb-4 text-teal-700" size={28} />
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="min-h-12 text-sm text-slate-500">{desc}</p>
                    <Badge className="my-5">
                      Specification ready · importer planned
                    </Badge>
                    <p className="text-xs leading-5 text-slate-400">
                      {gate}. Uploading is unavailable until the secure import
                      workflow is implemented.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {tab === "Payouts" && (
            <Card className="shadow-none">
              <CardContent className="p-8">
                <Wallet size={30} className="text-teal-700" />
                <h2 className="mt-5 text-xl font-semibold">
                  Payouts start with verified evidence.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  No payable amount is inferred from the example MIS. A
                  bank-specific commercial rule, unique event and approved rate
                  must exist first. Each request then needs separate Manager and
                  Admin approval.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    "1. MIS-backed entitlement",
                    "2. Two independent approvals",
                    "3. External payment + proof",
                  ].map((t) => (
                    <div
                      key={t}
                      className="rounded-lg border border-slate-200 p-4 text-sm font-medium"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-slate-400">
                  Core safeguards are implemented. Persistent payout workflows
                  and real settlement are not enabled.
                </p>
              </CardContent>
            </Card>
          )}
          {tab === "Project readiness" && (
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Foundation first</CardTitle>
                <p className="text-sm text-slate-500">
                  Detailed requirements and next tasks live in DOCS. This view
                  shows capability boundaries.
                </p>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-100">
                  {readiness.map(([name, state]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between py-4"
                    >
                      <span className="text-sm">{name}</span>
                      <Badge>{state}</Badge>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-5 text-slate-400">
                  Read AGENTS.md → DOCS/START-HERE.md → memory/STATUS.md →
                  memory/NEXT.md in a new session. Commercial and provider
                  decisions remain explicit launch gates.
                </p>
              </CardContent>
            </Card>
          )}
          <footer className="mt-7 flex flex-wrap justify-between gap-2 text-[10px] text-slate-400">
            <span>KBS operations workspace / English · India</span>
            <span>Foundation preview · No live customer data</span>
          </footer>
        </main>
      </div>
      {selected && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <DialogContent>
            <div className="flex items-center justify-between">
              <Badge>Synthetic lead detail</Badge>
              <Button
                autoFocus
                aria-label="Close lead detail"
                variant="ghost"
                size="icon"
                onClick={() => setSelected(null)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSelected(null);
                }}
              >
                <X />
              </Button>
            </div>
            <DialogTitle>{selected.name}</DialogTitle>
            <p className="mt-1 text-xs text-slate-400">
              {selected.id} · {selected.bank}
            </p>
            <div className="my-5 divide-y divide-slate-100">
              {[
                [
                  "Current stage",
                  bankDisplay(selected.stage, selected.matched),
                ],
                [
                  "Final decision",
                  bankDisplay(selected.decision, selected.matched),
                ],
                [
                  "Card activation",
                  bankDisplay(selected.activation, selected.matched),
                ],
                ["Last matched MIS", selected.date],
                ["Bank reference", "Not available in this example"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-6 py-3 text-xs"
                >
                  <span className="text-slate-500">{k}</span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
            <DialogDescription>
              {selected.reason}. Bank facts are read-only; operational notes and
              payment history belong to separate records.
            </DialogDescription>
            <Button className="mt-5 w-full" onClick={() => setSelected(null)}>
              Back to workspace
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
