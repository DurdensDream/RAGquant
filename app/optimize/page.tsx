'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartParticles } from '@/components/ui/HeartParticles';
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
        "Find me a momentum trading strategy for tech stocks 📈",
        "Optimize a portfolio for maximum Sharpe ratio with minimal risk 💎",
        "Create a mean reversion strategy for swing trading ✨",
        "Suggest a dividend growth strategy for long-term gains 💰"
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
        } catch (err: any) {
            setError(err.message || 'Something went wrong, babe! 💔');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen" style={{
            background: 'linear-gradient(to bottom, #FFC0CB, #FFE4E1, #FFFFFF)'
        }}>
            <HeartParticles />

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1
                        className="text-5xl md:text-7xl mb-4 glitter-text"
                        style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}
                    >
                        ✨ Strategy Optimizer ✨
                    </h1>
                    <p className="text-xl text-pink-600 italic">
                        Tell me what trading strategy you want, babe! 💕
                    </p>
                </motion.div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl p-8 md:p-12"
                    style={{ borderRadius: '24px', border: '4px solid #FF69B4' }}
                >
                    {/* Floating mascot decoration */}
                    <motion.div
                        className="absolute -right-16 top-0 text-7xl hidden md:block"
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        💖
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        {/* Strategy Input */}
                        <div className="mb-6">
                            <label
                                htmlFor="strategy-query"
                                className="block text-lg font-bold mb-3"
                                style={{ color: '#FF69B4' }}
                            >
                                What strategy are you dreaming of? 💭
                            </label>
                            <textarea
                                id="strategy-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Example: Create a momentum trading strategy for FAANG stocks with backtesting..."
                                className="w-full px-6 py-4 border-2 text-gray-800 focus:outline-none focus:ring-4 transition-all"
                                style={{
                                    borderColor: '#FFC0CB',
                                    borderRadius: '16px',
                                    backgroundColor: '#FFFAF0',
                                    boxShadow: loading ? '0 0 20px rgba(255, 105, 180, 0.3)' : 'none'
                                }}
                                rows={6}
                                disabled={loading}
                            />
                        </div>

                        {/* Example Suggestions */}
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 mb-3 italic">
                                ✨ Need inspiration? Try these cute examples:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {exampleStrategies.map((example, idx) => (
                                    <motion.button
                                        key={idx}
                                        type="button"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setQuery(example)}
                                        className="text-left px-4 py-3 text-sm border-2 transition-all"
                                        style={{
                                            borderColor: '#FFB6C1',
                                            borderRadius: '12px',
                                            backgroundColor: '#FFF5F7',
                                            color: '#FF69B4'
                                        }}
                                    >
                                        {example}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <BounceButton
                                onClick={() => { }}
                                className={loading ? 'opacity-70 cursor-wait' : ''}
                            >
                                {loading ? '✨ Optimizing... ✨' : 'Generate Strategy! 💖'}
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
                                className="mt-6 p-4 border-2 text-center"
                                style={{
                                    borderColor: '#FFB6D9',
                                    borderRadius: '12px',
                                    backgroundColor: '#FFF0F5'
                                }}
                            >
                                <p className="text-red-500">❌ {error}</p>
                                <p className="text-xs text-gray-600 mt-2">
                                    Make sure the Python backend is running on port 8001!
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
                            className="max-w-4xl mx-auto mt-8 bg-white/90 backdrop-blur-sm shadow-2xl p-8 md:p-12"
                            style={{ borderRadius: '24px', border: '4px solid #FFD700' }}
                        >
                            <h2
                                className="text-3xl md:text-4xl mb-6 text-center glitter-text"
                                style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}
                            >
                                💖 Your Custom Strategy! 💖
                            </h2>

                            {/* Strategy Description */}
                            <div className="mb-6 p-6" style={{
                                borderRadius: '16px',
                                backgroundColor: '#FFF5F7',
                                border: '2px solid #FFB6C1'
                            }}>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#FF69B4' }}>
                                    📊 Strategy Overview
                                </h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{result.strategy}</p>
                            </div>

                            {/* Risk Analysis */}
                            <div className="mb-6 p-6" style={{
                                borderRadius: '16px',
                                backgroundColor: '#FFFAF0',
                                border: '2px solid #FFB6C1'
                            }}>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#FF69B4' }}>
                                    ⚠️ Risk Analysis
                                </h3>
                                <p className="text-gray-700">{result.risk_analysis}</p>
                            </div>

                            {/* Expected Returns */}
                            <div className="mb-6 p-6" style={{
                                borderRadius: '16px',
                                backgroundColor: '#F0FFF4',
                                border: '2px solid #98FB98'
                            }}>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#FF69B4' }}>
                                    💰 Expected Returns
                                </h3>
                                <p className="text-gray-700">{result.expected_return}</p>
                            </div>

                            {/* Implementation Steps */}
                            <div className="p-6" style={{
                                borderRadius: '16px',
                                backgroundColor: '#F0F9FF',
                                border: '2px solid #BFDBFE'
                            }}>
                                <h3 className="text-xl font-bold mb-4" style={{ color: '#FF69B4' }}>
                                    📝 Implementation Steps
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
                                                style={{ backgroundColor: '#FF69B4' }}
                                            >
                                                {idx + 1}
                                            </span>
                                            <span className="text-gray-700 pt-1">{step}</span>
                                        </motion.li>
                                    ))}
                                </ol>
                            </div>

                            {/* Generate Another Button */}
                            <div className="mt-8 text-center">
                                <BounceButton onClick={() => {
                                    setResult(null);
                                    setQuery('');
                                }}>
                                    Generate Another Strategy! ✨
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
                    >
                        ← Back to Home
                    </BounceButton>
                </motion.div>
            </div>
        </main>
    );
}
