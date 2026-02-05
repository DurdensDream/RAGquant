'use client';

import { motion } from 'framer-motion';
import { BounceButton } from './ui/BounceButton';

export function VaultHero() {
    const tickerItems = [
        { text: 'Market Pulse' },
        { text: 'Sharpe 1.52 ▲', className: 'text-emerald-profit' },
        { text: 'VaR 4.8%' },
        { text: 'Momentum +2.1%', className: 'text-emerald-profit' },
        { text: 'Drawdown -1.4%', className: 'text-ruby-loss' },
    ];

    return (
        <section className="relative min-h-screen overflow-hidden bg-vault-gradient text-ivory">
            <div className="absolute inset-0 opacity-30 bg-ticker-pattern" />
            <div className="absolute -top-32 right-10 h-80 w-80 rounded-full bg-gold-shine blur-3xl opacity-70" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold-shine blur-3xl opacity-40" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-semibold tracking-wide glitter-text"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    QuantOver
                </motion.h1>

                <motion.p
                    className="mt-4 text-xl md:text-2xl font-playfair text-ivory/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Money Maestro&apos;s Trading Strategy Optimizer
                </motion.p>

                <motion.p
                    className="mt-6 max-w-2xl text-base md:text-lg text-ivory/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    Orchestrate RAG-driven market intelligence, ML-powered signals, and
                    institutional-grade risk controls to refine your portfolio strategy.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <BounceButton onClick={() => window.location.href = '/optimize'} type="button">
                        Enter the Strategy Vault
                    </BounceButton>
                </motion.div>

                <motion.div
                    className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {[
                        {
                            title: 'RAG Intelligence',
                            copy: 'Hybrid vector + graph retrieval for contextual market evidence.',
                        },
                        {
                            title: 'Risk & VaR',
                            copy: 'Automated guardrails with VaR/CVaR simulations and drawdown alerts.',
                        },
                        {
                            title: 'Portfolio Frontier',
                            copy: 'Markowitz-efficient allocations with gold-standard metrics.',
                        },
                    ].map((item) => (
                        <div key={item.title} className="vault-panel rounded-3xl px-6 py-5 text-left">
                            <h3 className="text-lg font-playfair text-vault-gold">{item.title}</h3>
                            <p className="mt-2 text-sm text-ivory/70">{item.copy}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    className="mt-10 text-xs text-ivory/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    For educational purposes only. Not financial advice.
                </motion.p>

                <motion.div
                    className="absolute right-10 top-16 text-5xl"
                    animate={{ y: [0, -16, 0], rotate: [0, 6, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                >
                    🪙
                </motion.div>
            </div>

            <div className="ticker-strip absolute bottom-0 left-0 flex w-[200%] items-center gap-12 py-3 text-xs uppercase tracking-[0.3em] text-ivory/70">
                {[0, 1].map((group) => (
                    <div key={group} className="flex w-1/2 animate-ticker items-center gap-12">
                        {tickerItems.map((item, index) => (
                            <span key={`${group}-${item.text}-${index}`} className={item.className}>
                                {item.text}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
