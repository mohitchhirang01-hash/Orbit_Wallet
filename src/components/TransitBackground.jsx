import React, { useEffect, useRef } from 'react';

export default function TransitBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let w = canvas.width = canvas.parentElement.offsetWidth;
        let h = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            w = canvas.width = canvas.parentElement.offsetWidth;
            h = canvas.height = canvas.parentElement.offsetHeight;
        });

        const lines = [];
        const numLines = 20;

        for (let i = 0; i < numLines; i++) {
            lines.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                length: Math.random() * 100 + 50,
                color: Math.random() > 0.5 ? '#00D1FF' : '#6366F1'
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            lines.forEach(line => {
                line.x += line.vx;
                line.y += line.vy;

                if (line.x < 0) line.x = w;
                if (line.x > w) line.x = 0;
                if (line.y < 0) line.y = h;
                if (line.y > h) line.y = 0;

                ctx.beginPath();
                ctx.strokeStyle = line.color;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.2;

                // Draw trail
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x - line.vx * 20, line.y - line.vy * 20);
                ctx.stroke();

                // Draw head
                ctx.beginPath();
                ctx.fillStyle = line.color;
                ctx.globalAlpha = 0.8;
                ctx.arc(line.x, line.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
