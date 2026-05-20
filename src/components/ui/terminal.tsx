"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  help        - Show this help message
  about       - Who is Athul?
  skills      - List tech stack
  projects    - View featured projects
  contact     - Get contact info
  clear       - Clear terminal
  exit        - Close terminal`,
  about: "Athul Anil Kumar — AI Engineer specializing in LLM engineering, agentic systems, and full-stack development. I build intelligent systems that solve real-world problems.",
  skills: "Python, TypeScript, React, Next.js, Node.js, PyTorch, LangChain, Docker, AWS, PostgreSQL, MongoDB, Redis.",
  projects: "1. ERP MCP Server\n2. Telegram ERP Bot\n3. WhatsApp ERP Bot\n4. ARTCL AI\n5. SayBill ERP\n6. Lend Rental\n7. Omnichannel Integration\n8. Custom ERP",
  contact: "Email: athul@example.com\nGitHub: github.com/athulanil21\nLinkedIn: linkedin.com/in/athulanil21",
};

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([
    { type: "output", content: "Welcome to Athul's Portfolio Terminal v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: "input", content: cmd }]);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "exit") {
      onClose();
      return;
    }

    if (COMMANDS[trimmed]) {
      const result = typeof COMMANDS[trimmed] === "function" ? COMMANDS[trimmed]() : COMMANDS[trimmed];
      setHistory((prev) => [...prev, { type: "output", content: result as string }]);
    } else {
      setHistory((prev) => [...prev, { type: "output", content: `Command not found: ${trimmed}. Type 'help' for options.` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-[200] w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-subtle bg-bg-card px-4 py-2">
            <div className="flex items-center gap-2">
              <TerminalIcon size={16} className="text-accent-blue" />
              <span className="text-xs font-medium text-text-secondary">portfolio-terminal</span>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="h-64 overflow-y-auto bg-bg-primary p-4 font-mono text-sm">
            {history.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === "input" ? (
                  <div className="flex gap-2">
                    <span className="text-accent-blue">➜</span>
                    <span className="text-accent-purple">~</span>
                    <span className="text-text-primary">{line.content}</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-text-secondary">{line.content}</pre>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border-subtle bg-bg-card px-4 py-2">
            <span className="text-accent-blue">➜</span>
            <span className="text-accent-purple">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-muted"
              placeholder="Type a command..."
              autoComplete="off"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
