"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const compileMessages = [
  "> Initializing system...",
  "> Loading modules...",
  "> Compiling components...",
  "> Optimizing assets...",
  "> Building UI layers...",
  "> Connecting APIs...",
  "> Running diagnostics...",
  "> Deploying portfolio...",
  "> Almost there...",
  "> Ready.",
];

export default function LoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    intervalRef.current = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      const msgIndex = Math.min(
        Math.floor((newProgress / 100) * compileMessages.length),
        compileMessages.length - 1
      );
      setMessageIndex(msgIndex);

      if (currentStep >= steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 400);
      }
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onLoadingComplete]);

  useEffect(() => {
    const currentMsg = compileMessages[messageIndex];
    setTypedText("");
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentMsg.length) {
        setTypedText(currentMsg.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [messageIndex]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary"
        >
          <div className="w-full max-w-lg px-6">
            {/* Terminal header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-text-muted">
                portfolio.exe
              </span>
            </div>

            {/* Terminal body */}
            <div className="glass rounded-lg border border-border-subtle p-4 font-mono text-sm">
              {/* Progress bar */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-accent-cyan">Progress</span>
                  <span className="text-text-muted">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                    style={{ width: `${progress}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Terminal output */}
              <div className="space-y-1">
                {compileMessages
                  .slice(0, messageIndex)
                  .map((msg, i) => (
                    <div key={i} className="text-text-muted">
                      {msg}
                    </div>
                  ))}
                <div className="text-accent-cyan">
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="ml-0.5"
                  >
                    |
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Loading animation */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-accent-blue"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
