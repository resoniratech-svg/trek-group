"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Shape {
  points: Point3D[];
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  baseX: number;
  baseY: number;
  size: number;
}

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let shapes: Shape[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createShapes();
    };

    const createShapes = () => {
      shapes = [];
      const shapeCount = 15;
      for (let i = 0; i < shapeCount; i++) {
        // Create a simple tetrahedron or octahedron wireframe
        const points: Point3D[] = [
          { x: -1, y: -1, z: -1 },
          { x: 1, y: -1, z: -1 },
          { x: 0, y: 1, z: 0 },
          { x: 0, y: -1, z: 1 },
        ];

        shapes.push({
          points,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          speedX: (Math.random() - 0.5) * 0.01,
          speedY: (Math.random() - 0.5) * 0.01,
          speedZ: (Math.random() - 0.5) * 0.01,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 40 + 20
        });
      }
    };

    const project = (p: Point3D, size: number, baseX: number, baseY: number, rx: number, ry: number, rz: number) => {
      // Rotate
      let x = p.x, y = p.y, z = p.z;

      // RX
      let ty = y * Math.cos(rx) - z * Math.sin(rx);
      let tz = y * Math.sin(rx) + z * Math.cos(rx);
      y = ty; z = tz;

      // RY
      let tx = x * Math.cos(ry) + z * Math.sin(ry);
      tz = -x * Math.sin(ry) + z * Math.cos(ry);
      x = tx; z = tz;

      // RZ
      tx = x * Math.cos(rz) - y * Math.sin(rz);
      ty = x * Math.sin(rz) + y * Math.cos(rz);
      x = tx; y = ty;

      // Perspective
      const perspective = 400 / (400 + z * size);
      return {
        x: baseX + x * size * perspective,
        y: baseY + y * size * perspective
      };
    };

    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height * 0.6;

      ctx.strokeStyle = "rgba(0, 255, 255, 0.08)"; // Cyan neon
      ctx.lineWidth = 1;

      // Perspective Grid
      const lines = 25;
      const step = height / lines;

      for (let i = 0; i < lines; i++) {
        const y = centerY + Math.pow(i, 1.8) * 0.5;
        if (y > height) break;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let i = -15; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(width / 2 + i * 40, centerY);
        ctx.lineTo(width / 2 + i * 500, height);
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.01;

      // Clear with white base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient glow
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "#ffffff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      // Draw Shapes
      shapes.forEach(shape => {
        shape.rotationX += shape.speedX;
        shape.rotationY += shape.speedY;
        shape.rotationZ += shape.speedZ;

        // Floating motion
        shape.baseY += Math.sin(time + shape.baseX) * 0.2;

        const projectedPoints = shape.points.map(p =>
          project(p, shape.size, shape.baseX, shape.baseY, shape.rotationX, shape.rotationY, shape.rotationZ)
        );

        ctx.strokeStyle = "rgba(45, 27, 105, 0.08)"; // Dark purple with low opacity
        ctx.lineWidth = 1;

        // Draw wireframe edges
        for (let i = 0; i < projectedPoints.length; i++) {
          for (let j = i + 1; j < projectedPoints.length; j++) {
            ctx.beginPath();
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      style={{ background: "#ffffff" }}
    />
  );
}
