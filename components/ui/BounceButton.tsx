'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BounceButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    mascotSticker?: string;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export function BounceButton({
    children,
    onClick,
    mascotSticker,
    variant = 'primary',
    className = ''
}: BounceButtonProps) {
    const primaryStyle = {
        background: 'linear-gradient(to right, #FF69B4, #FFC0CB)',
        color: 'white',
        borderRadius: '24px'
    };

    const secondaryStyle = {
        background: 'white',
        color: '#FF69B4',
        border: '2px solid #FF69B4',
        borderRadius: '24px'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                y: [0, -3, 0],
            }}
            transition={{
                y: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }
            }}
            onClick={onClick}
            style={variant === 'primary' ? primaryStyle : secondaryStyle}
            className={`
        relative px-8 py-4 font-bold text-lg
        shadow-lg overflow-hidden
        ${className}
      `}
        >
            {/* Sparkle effect on hover */}
            <motion.div
                className="absolute inset-0 opacity-0"
                style={{ background: '#FFD700' }}
                whileHover={{ opacity: 0.3 }}
            />

            {/* Mascot sticker overlay */}
            {mascotSticker && (
                <motion.div
                    className="absolute -right-2 -top-2 w-16 h-16 z-10"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <Image
                        src={mascotSticker}
                        alt="Cute mascot"
                        fill
                        className="object-contain"
                    />
                </motion.div>
            )}

            <span className="relative z-5">{children}</span>
        </motion.button>
    );
}
