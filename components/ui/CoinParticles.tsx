'use client';

import { useEffect, useRef } from 'react';

export function CoinParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const coins: { x: number; y: number; size: number; speed: number; opacity: number; drift: number }[] = [];

        for (let i = 0; i < 28; i++) {
            coins.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 14 + 8,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.4 + 0.2,
                drift: Math.random() * 0.6 - 0.3,
            });
        }

        function drawCoin(x: number, y: number, size: number, opacity: number) {
            if (!ctx) return;
            const radius = size / 2;
            const gradient = ctx.createRadialGradient(x - radius / 3, y - radius / 3, radius / 4, x, y, radius);
            gradient.addColorStop(0, `rgba(255, 236, 179, ${opacity})`);
            gradient.addColorStop(0.6, `rgba(255, 215, 0, ${opacity})`);
            gradient.addColorStop(1, `rgba(184, 134, 11, ${opacity})`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 248, 220, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = `rgba(255, 248, 220, ${opacity})`;
            ctx.font = `${radius}px 'Inter', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', x, y);
        }

        let animationId: number;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            coins.forEach(coin => {
                drawCoin(coin.x, coin.y, coin.size, coin.opacity);
                coin.y -= coin.speed;
                coin.x += coin.drift;

                if (coin.y < -coin.size) {
                    coin.y = canvas.height + coin.size;
                    coin.x = Math.random() * canvas.width;
                }
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
