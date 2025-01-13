import { cn } from "@/utils/classnames";
import { HTMLAttributes, useEffect, useRef } from "react";

const COUNT = 400;

const SPEED = 0.05;

class Star {
  x: number;
  y: number;
  z: number;
  xPrev: number;
  yPrev: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.xPrev = x;
    this.yPrev = y;
  }

  update(width: number, height: number, speed: number) {
    this.xPrev = this.x;
    this.yPrev = this.y;
    this.z += speed * 0.0675;
    this.x += this.x * (speed * 0.0225) * this.z;
    this.y += this.y * (speed * 0.0225) * this.z;

    if (
      this.x > width / 2 ||
      this.x < -width / 2 ||
      this.y > height / 2 ||
      this.y < -height / 2
    ) {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.xPrev = this.x;
      this.yPrev = this.y;
      this.z = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.z;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.xPrev, this.yPrev);
    ctx.stroke();
  }
}

export const Starfield: React.FC<
  Omit<HTMLAttributes<HTMLDivElement>, "children">
> = ({ className, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stars = Array.from({ length: COUNT }, () => new Star(0, 0, 0));

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) throw new Error("canvas should not be null");

    const ctx = canvas.getContext("2d");

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(canvas.parentElement!); // Use non-null assertion

    function setup() {
      if (!ctx) throw new Error("canvas should not be null");

      const { clientWidth: width, clientHeight: height } =
        canvas?.parentElement!;
      const dpr = window.devicePixelRatio || 1;
      if (canvas) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      ctx.scale(dpr, dpr);

      for (const star of stars) {
        star.x = Math.random() * width - width / 2;
        star.y = Math.random() * height - height / 2;
        star.z = 0;
      }

      ctx.translate(width / 2, height / 2);
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      requestAnimationFrame(frame);
    }

    function frame() {
      if (!ctx) throw new Error("canvas should not be null");

      const { clientWidth: width, clientHeight: height } =
        canvas?.parentElement!;

      // Clear the canvas for transparency
      ctx.clearRect(-width / 2, -height / 2, width, height);

      for (const star of stars) {
        star.update(width, height, SPEED);
        star.draw(ctx);
      }

      requestAnimationFrame(frame);
    }

    setup(); // Initial setup

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
