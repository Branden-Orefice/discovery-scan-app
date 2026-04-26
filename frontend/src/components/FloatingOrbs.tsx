import { useEffect, useRef } from "react";

/*
 Canvas-based particle animation.
 The initial implementation was generated with AI assistance and then adapted/maintained manually.
*/

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  isHub: boolean;
}

const FloatingOrbs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);

  const initNodes = (width: number, height: number) => {
    const nodeCount = 60;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isHub = Math.random() < 0.07;
      const x = Math.random() * width;
      const y = Math.random() * height;

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: isHub ? 4 + Math.random() * 2 : 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        isHub,
      });
    }
    nodesRef.current = nodes;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize()
    initNodes(canvas.width, canvas.height);

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const connectionRadius = 135;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        n.phase += 0.018;
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            const opacity = 1 - dist / connectionRadius;
            ctx.strokeStyle = `rgba(132, 204, 22, ${opacity * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pulse = (Math.sin(n.phase) + 1) / 2;

        if (n.isHub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249, 115, 22, ${0.1 + pulse * 0.1})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = "#f97316";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          const brightness = 0.3 + pulse * 0.5;
          ctx.fillStyle = `rgba(132, 204, 22, ${brightness})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden h-dvh w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />
    </div>
  );
};

export default FloatingOrbs;
