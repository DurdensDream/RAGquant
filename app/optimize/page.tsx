'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoinParticles } from '@/components/ui/CoinParticles';
import { BounceButton } from '@/components/ui/BounceButton';

interface StrategyResult {
    strategy: string;
    risk_analysis: string;
    expected_return: string;
    implementation_steps: string[];
}

export default function OptimizePage() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<StrategyResult | null>(null);
    const [error, setError] = useState('');

    const exampleStrategies = [
        "Optimize a momentum strategy for NASDAQ leaders with volatility filters",
        "Build a low-risk portfolio targeting a Sharpe ratio above 1.3",
        "Design a mean reversion playbook with VaR constraints",
        "Suggest a dividend growth strategy with downside protection"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate strategy');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Strategy generation failed. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen text-ivory">
            <CoinParticles />

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl mb-4 glitter-text">
                        Strategy Optimizer
                    </h1>
                    <p className="text-lg text-ivory/70">
                        Describe your market objective and let QuantOver craft a refined strategy.
                    </p>
                </motion.div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto vault-panel rounded-3xl border border-vault-gold/40 p-8 md:p-12"
                >
                    <motion.div
                        className="absolute -right-12 top-2 text-6xl hidden md:block"
                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, 6, -6, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 4.5 }}
                    >
                        🪙
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        {/* Strategy Input */}
                        <div className="mb-6">
                            <label
                                htmlFor="strategy-query"
                                className="block text-lg font-semibold mb-3 text-vault-gold"
                            >
                                What strategy should we refine?
                            </label>
                            <textarea
                                id="strategy-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Example: Create a momentum trading strategy for FAANG stocks with VaR limits..."
                                className="w-full rounded-2xl border border-vault-gold/40 bg-midnight/60 px-6 py-4 text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-vault-gold/60 transition-all"
                                rows={6}
                                disabled={loading}
                            />
                        </div>

                        {/* Example Suggestions */}
                        <div className="mb-8">
                            <p className="text-sm text-ivory/60 mb-3">
                                Suggested prompts:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {exampleStrategies.map((example, idx) => (
                                    <motion.button
                                        key={idx}
                                        type="button"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setQuery(example)}
                                        className="text-left px-4 py-3 text-sm border border-vault-gold/30 rounded-xl bg-slate-ink/60 text-ivory/80 transition-all hover:border-vault-gold"
                                    >
                                        {example}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <BounceButton
                                className={loading ? 'opacity-70 cursor-wait' : ''}
                                type="submit"
                            >
                                {loading ? 'Optimizing Vault Strategy...' : 'Generate Strategy'}
                            </BounceButton>
                        </div>
                    </form>

                    {/* Error Display */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-6 rounded-xl border border-ruby-loss/60 bg-slate-ink/70 p-4 text-center"
                            >
                                <p className="text-ruby-loss">⚠️ {error}</p>
                                <p className="text-xs text-ivory/60 mt-2">
                                    Ensure the Python backend is running on port 8001.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Card */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl mx-auto mt-8 vault-panel rounded-3xl border border-vault-gold/40 p-8 md:p-12"
                        >
                            <h2 className="text-3xl md:text-4xl mb-6 text-center glitter-text">
                                Vault Strategy Brief
                            </h2>

                            {/* Strategy Description */}
                            <div className="mb-6 rounded-2xl border border-vault-gold/30 bg-slate-ink/60 p-6">
                                <h3 className="text-xl font-semibold mb-3 text-vault-gold">
                                    Strategy Overview
                                </h3>
                                <p className="text-ivory/80 whitespace-pre-wrap">{result.strategy}</p>
                            </div>

                            {/* Risk Analysis */}
                            <div className="mb-6 rounded-2xl border border-ruby-loss/60 bg-midnight/70 p-6">
                                <h3 className="text-xl font-semibold mb-3 text-ruby-loss">
                                    Risk Analysis
                                </h3>
                                <p className="text-ivory/80">{result.risk_analysis}</p>
                            </div>

                            {/* Expected Returns */}
                            <div className="mb-6 rounded-2xl border border-emerald-profit/70 bg-slate-ink/50 p-6">
                                <h3 className="text-xl font-semibold mb-3 text-emerald-profit">
                                    Expected Returns
                                </h3>
                                <p className="text-ivory/80">{result.expected_return}</p>
                            </div>

                            {/* Implementation Steps */}
                            <div className="rounded-2xl border border-vault-gold/20 bg-midnight/60 p-6">
                                <h3 className="text-xl font-semibold mb-4 text-vault-gold">
                                    Implementation Steps
                                </h3>
                                <ol className="space-y-3">
                                    {result.implementation_steps.map((step, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <span
                                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-white"
                                                style={{ backgroundColor: '#B8860B' }}
                                            >
                                                {idx + 1}
                                            </span>
                                            <span className="text-ivory/80 pt-1">{step}</span>
                                        </motion.li>
                                    ))}
                                </ol>
                            </div>

                            {/* Generate Another Button */}
                            <div className="mt-8 text-center">
                                <BounceButton
                                    onClick={() => {
                                        setResult(null);
                                        setQuery('');
                                    }}
                                    type="button"
                                >
                                    Generate Another Strategy
                                </BounceButton>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mt-8"
                >
                    <BounceButton
                        variant="secondary"
                        onClick={() => window.location.href = '/'}
                        type="button"
                    >
                        ← Back to Vault Lobby
                    </BounceButton>
                </motion.div>
            </div>
        </main>
    );
}
