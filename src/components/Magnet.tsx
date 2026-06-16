import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface MagnetProps {
    children: ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    className?: string;
}

export default function Magnet({
    children,
    padding = 60,
    disabled = false,
    magnetStrength = 0.4,
    className = "",
}: MagnetProps) {
    const ref = useRef<HTMLDivElement>(null);
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    useEffect(() => {
        if (disabled || !ref.current) return;

        xTo.current = gsap.quickTo(ref.current, "x", {
            duration: 1,
            ease: "elastic.out(1,0.3)",
        });
        yTo.current = gsap.quickTo(ref.current, "y", {
            duration: 1,
            ease: "elastic.out(1,0.3)",
        });

        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current || !xTo.current || !yTo.current) return;
            const { left, top, width, height } =
                ref.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const absDistX = Math.abs(distX);
            const absDistY = Math.abs(distY);

            // Only activate inside the padded proximity zone
            if (
                absDistX < width / 2 + padding &&
                absDistY < height / 2 + padding
            ) {
                xTo.current(distX * magnetStrength);
                yTo.current(distY * magnetStrength);
            }
        };

        const handleMouseLeave = () => {
            if (!xTo.current || !yTo.current) return;
            xTo.current(0);
            yTo.current(0);
        };

        const el = ref.current;
        window.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [disabled, magnetStrength, padding]);

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}
