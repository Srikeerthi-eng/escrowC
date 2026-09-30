import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Wallet,
  FileCheck,
  ArrowRight,
  Building2,
  User,
  CheckCircle2,
} from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="font-semibold text-lg text-neutral-900">EscrowCreator</span>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100 mb-6">
          <ShieldCheck size={16} />
          Trust & Orchestration for the Creator Economy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight max-w-3xl mx-auto">
          Brands fund escrow. Creators deliver. Everyone gets paid fairly.
        </h1>
        <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto">
          EscrowCreator manages campaigns, mock escrow, deliverable verification, milestone payouts, and disputes —
          all backed by a tamper-evident audit log.
        </p>
      </section>

      {/* Role selection */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Brand card */}
          <Link
            to="/brand/dashboard"
            className="group bg-white rounded-2xl border border-neutral-200 p-8 hover:border-primary-300 hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5 border border-primary-100">
              <Building2 size={28} />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">I'm a Brand</h2>
            <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
              Create campaigns, fund mock escrow, review deliverables, approve milestones, and release simulated payouts to creators.
            </p>
            <div className="mt-5 flex items-center gap-2 text-primary-600 text-sm font-medium group-hover:gap-3 transition-all">
              Enter Brand Dashboard
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Creator card */}
          <Link
            to="/creator/dashboard"
            className="group bg-white rounded-2xl border border-neutral-200 p-8 hover:border-accent-300 hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600 mb-5 border border-accent-100">
              <User size={28} />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">I'm a Creator</h2>
            <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
              Discover campaigns, submit deliverables, track verification, earn milestone payouts, and raise disputes if needed.
            </p>
            <div className="mt-5 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
              Enter Creator Dashboard
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Lock, title: 'Mock Escrow', desc: 'Simulated escrow locking with provider transaction IDs' },
            { icon: FileCheck, title: 'Verification Engine', desc: 'Automated checks for hashtags, platform, and deadlines' },
            { icon: Wallet, title: 'Milestone Payouts', desc: 'Per-deliverable payouts released on verification pass' },
            { icon: CheckCircle2, title: 'Audit Trail', desc: 'SHA-256 tamper-evident logging of every event' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-neutral-200 p-5">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 mb-3">
                <f.icon size={20} />
              </div>
              <div className="font-semibold text-sm text-neutral-900">{f.title}</div>
              <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-neutral-500">
          <span>EscrowCreator — Hackathon Prototype</span>
          <span>DEMO / MOCK ENVIRONMENT</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
