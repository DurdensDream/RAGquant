'use client';

import { motion } from 'framer-motion';
import { BounceButton } from './ui/BounceButton';

export function PinkHero() {
    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #FFC0CB, #FFE4E1, #FFFFFF)' }}
        >
            {/* Lace pattern overlay (subtle) */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,182,193,0.1) 10px, rgba(255,182,193,0.1) 20px)'
            }} />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
                <motion.h1
                    className="text-6xl md:text-8xl mb-6 glitter-text"
                    style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    ✨ QuantOver ✨
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl text-pink-600 italic mb-8 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Your <span className="font-bold">adorably</span> powerful AI trading bestie!
                    💕📈✨
                </motion.p>

                <motion.p
                    className="text-lg text-gray-600 mb-12 max-w-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Upload cute financial docs, ask your sparkly questions, and let our
                    kawaii AI generate <em>totally</em> optimized trading strategies! 💸🎀
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <BounceButton onClick={() => window.location.href = '/optimize'}>
                        Start Trading Cutely! 💖
                    </BounceButton>
                </motion.div>

                {/* Disclaimer with sparkles */}
                <motion.p
                    className="mt-8 text-xs text-pink-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    ✨ For simulation & education only! Not financial advice, babe! ✨
                </motion.p>

                {/* Floating emojis */}
                <motion.div
                    className="absolute top-20 left-10 text-6xl"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    💕
                </motion.div>

                <motion.div
                    className="absolute bottom-20 right-10 text-6xl"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 5 }}
                >
                    💖
                </motion.div>

                <motion.div
                    className="absolute top-1/3 right-20 text-5xl"
                    animate={{
                        y: [0, -10, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 3.5 }}
                >
                    ✨
                </motion.div>
            </div>
        </div>
    );
}
