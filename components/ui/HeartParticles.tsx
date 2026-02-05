'use client';

import { useEffect, useRef } from 'react';

export function HeartParticles() {
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

        const hearts: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

        // Create 30 floating hearts
        for (let i = 0; i < 30; i++) {
            hearts.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 20 + 10,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        function drawHeart(x: number, y: number, size: number, opacity: number) {
            if (!ctx) return;
            ctx.fillStyle = `rgba(255, 182, 193, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x, y + size / 4);
            ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
            ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
            ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
            ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
            ctx.fill();
        }

        let animationId: number;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            hearts.forEach(heart => {
                drawHeart(heart.x, heart.y, heart.size, heart.opacity);
                heart.y -= heart.speed;

                // Reset heart to bottom when it goes off screen
                if (heart.y < -heart.size) {
                    heart.y = canvas.height + heart.size;
                    heart.x = Math.random() * canvas.width;
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
