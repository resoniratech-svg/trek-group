"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface HomeScrollAnimationProps {
  progress?: any;
}

export default function HomeScrollAnimation({ progress }: HomeScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const frameCount = 200;

  // Use the passed progress or fallback to global scroll
  const { scrollYProgress: globalScroll } = useScroll();
  const effectiveProgress = progress || globalScroll;
  
  // Use a spring for buttery smooth scroll transitions
  const smoothProgress = useSpring(effectiveProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/home1/ezgif-frame-${frameNum}.jpg`;
        promises.push(new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; 
        }));
        loadedImages.push(img);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setLoaded(true);
    };

    preloadImages();
  }, []);

  // Drawing logic
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentFrame = Math.floor(frameIndex.get());
      const image = images[Math.max(0, Math.min(frameCount - 1, currentFrame - 1))] || images[0];

      // Responsive cover scaling
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = image.width;
      const imgHeight = image.height;
      
      if (imgWidth === 0 || imgHeight === 0) return;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(image, x, y, newWidth, newHeight);
    };

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

    const unsubscribe = frameIndex.on("change", render);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [images, frameIndex]);

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
      {/* Dark Cinematic Overlay to ensure white text legibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
