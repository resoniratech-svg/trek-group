"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollAnimationProps {
  progress?: any;
}

export default function ScrollAnimation({ progress }: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const frameCount = 146;

  // Use the passed progress or fallback to global scroll
  const { scrollYProgress: globalScroll } = useScroll();
  const effectiveProgress = progress || globalScroll;
  
  // Use a spring for buttery smooth scroll transitions
  const smoothProgress = useSpring(effectiveProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);
  const [autoFrame, setAutoFrame] = useState(0);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/home/ezgif-frame-${frameNum}.jpg`;
        promises.push(new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        }));
        loadedImages.push(img);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setLoaded(true);
    };

    preloadImages();
  }, []);

  // Auto-play logic (continuous motion even when stable)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delta > interval) {
        setAutoFrame((prev) => (prev + 1) % frameCount);
        lastTime = time - (delta % interval);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [frameCount]);

  // Drawing logic
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Combine scroll frame with auto-play frame for constant motion
      const scrollFrame = Math.floor(frameIndex.get());
      const currentFrame = (scrollFrame + autoFrame) % frameCount;
      const image = images[currentFrame] || images[0];

      // Responsive cover scaling
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = image.width;
      const imgHeight = image.height;
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(image, x, y, newWidth, newHeight);
    };

    // Update canvas size on resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Re-render when frame index or autoFrame changes
    const unsubscribe = frameIndex.onChange(render);
    render(); // Initial render and render on autoFrame change

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [images, frameIndex, autoFrame]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover'
        }}
        className="block"
      />
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white/10" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
