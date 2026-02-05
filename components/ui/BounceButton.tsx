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
        background: 'linear-gradient(120deg, #FFD700, #FFF1B8, #B8860B)',
        color: '#0B0F19',
        border: '1px solid rgba(255, 215, 0, 0.8)',
        borderRadius: '24px'
    };

    const secondaryStyle = {
        background: 'rgba(11, 15, 25, 0.7)',
        color: '#FFD700',
        border: '1px solid rgba(255, 215, 0, 0.6)',
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
                style={{ background: 'rgba(255, 215, 0, 0.35)' }}
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
