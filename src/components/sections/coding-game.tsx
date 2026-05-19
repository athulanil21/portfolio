"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, RotateCcw, Check, X, Trophy, Zap, Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

interface Challenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Fix the Bug",
    description: "This function should return the sum of all numbers in an array, but it has a bug. Fix it!",
    initialCode: `function sumArray(arr) {\n  let total = 0;\n  for (let i = 0; i < arr.length; i++) {\n    total = total + arr[i];\n  }\n  return total;\n}\n\nconsole.log(sumArray([1, 2, 3, 4, 5]));`,
    expectedOutput: "15",
    hint: "The code is actually correct! Just run it to see.",
    difficulty: "easy",
  },
  {
    id: 2,
    title: "Complete the Function",
    description: "Write a function that returns true if a string is a palindrome, false otherwise.",
    initialCode: `function isPalindrome(str) {\n  // Your code here\n  \n}\n\nconsole.log(isPalindrome("racecar"));`,
    expectedOutput: "true",
    hint: "Try: return str === str.split('').reverse().join('');",
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Debug the Loop",
    description: "This function should find the largest number in an array. Fix the bug!",
    initialCode: `function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\n\nconsole.log(findMax([3, 7, 2, 9, 1]));`,
    expectedOutput: "9",
    hint: "The loop and comparison look correct. Run it!",
    difficulty: "medium",
  },
  {
    id: 4,
    title: "Array Filter",
    description: "Filter the array to only include numbers greater than 10.",
    initialCode: `const numbers = [5, 12, 8, 15, 3, 20, 7];\nconst result = numbers.filter(n => {\n  // Your condition here\n  \n});\n\nconsole.log(result);`,
    expectedOutput: "[12,15,20]",
    hint: "Try: return n > 10;",
    difficulty: "medium",
  },
  {
    id: 5,
    title: "Object Keys",
    description: "Extract all keys from the object and return them as an array.",
    initialCode: `const user = {\n  name: "Athul",\n  role: "AI Engineer",\n  location: "India"\n};\n\nconst keys = Object.keys(user);\nconsole.log(keys);`,
    expectedOutput: '["name","role","location"]',
    hint: "Object.keys() returns an array of keys.",
    difficulty: "easy",
  },
  {
    id: 6,
    title: "Async Challenge",
    description: "Write an async function that simulates fetching data and returns it.",
    initialCode: `async function fetchData() {\n  // Simulate API call\n  await new Promise(r => setTimeout(r, 100));\n  return { status: "success", data: "Hello!" };\n}\n\nfetchData().then(r => console.log(JSON.stringify(r)));`,
    expectedOutput: '{"status":"success","data":"Hello!"}',
    hint: "The code is correct! Just run it.",
    difficulty: "hard",
  },
];

const difficultyColors = {
  easy: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10",
  medium: "text-accent-blue border-accent-blue/30 bg-accent-blue/10",
  hard: "text-accent-purple border-accent-purple/30 bg-accent-purple/10",
};

export default function CodingGame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [shake, setShake] = useState(false);

  const challenge = challenges[currentChallenge];

  useEffect(() => {
    setCode(challenge.initialCode);
    setOutput("");
    setShowHint(false);
  }, [currentChallenge]);

  const runCode = () => {
    setIsRunning(true);
    setOutput("");

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => {
            logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
          },
        };

        const fn = new Function("console", code);
        fn(mockConsole);

        const result = logs.join("\n");
        setOutput(result);

        const normalizedResult = result.replace(/\s/g, "");
        const normalizedExpected = challenge.expectedOutput.replace(/\s/g, "");

        if (normalizedResult === normalizedExpected) {
          setScore(prev => prev + 10);
          setCompleted(prev => new Set(prev).add(challenge.id));
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      } catch (err: any) {
        setOutput(`Error: ${err.message}`);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      setIsRunning(false);
    }, 500);
  };

  const resetCode = () => {
    setCode(challenge.initialCode);
    setOutput("");
    setShowHint(false);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1);
    }
  };

  return (
    <section id="coding-game" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Code Challenge" subtitle="Test Your Skills" />

        {/* Score & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-accent-blue/10 px-4 py-2 border border-accent-blue/20">
              <Trophy size={16} className="text-accent-blue" />
              <span className="text-sm font-medium text-accent-blue">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-accent-purple/10 px-4 py-2 border border-accent-purple/20">
              <Zap size={16} className="text-accent-purple" />
              <span className="text-sm font-medium text-accent-purple">{completed.size}/{challenges.length} Completed</span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {challenges.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setCurrentChallenge(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === currentChallenge
                    ? "bg-accent-blue scale-150"
                    : completed.has(c.id)
                    ? "bg-accent-cyan"
                    : "bg-border-subtle"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-border-subtle p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs text-text-muted">Challenge {currentChallenge + 1} of {challenges.length}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary">{challenge.title}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevChallenge}
                  disabled={currentChallenge === 0}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted bg-bg-secondary border border-border-subtle transition-all hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  onClick={nextChallenge}
                  disabled={currentChallenge === challenges.length - 1}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted bg-bg-secondary border border-border-subtle transition-all hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-text-secondary">{challenge.description}</p>
          </div>

          {/* Code Editor */}
          <div className="p-6">
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-accent-cyan" />
                <span className="text-xs font-medium text-text-muted">JavaScript</span>
              </div>
              <div className={`relative rounded-xl overflow-hidden border ${shake ? "border-red-500/50" : "border-border-subtle"}`}>
                {/* Editor header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border-b border-border-subtle">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-text-muted">challenge.js</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 bg-bg-primary text-text-primary font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-lg bg-accent-blue/10 px-5 py-2.5 text-sm font-medium text-accent-blue border border-accent-blue/20 transition-all hover:bg-accent-blue/20 disabled:opacity-50"
              >
                {isRunning ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
                ) : (
                  <Play size={14} />
                )}
                Run Code
              </button>
              <button
                onClick={resetCode}
                className="flex items-center gap-2 rounded-lg bg-bg-secondary px-4 py-2.5 text-sm font-medium text-text-muted border border-border-subtle transition-all hover:text-text-primary"
              >
                <RotateCcw size={14} />
                Reset
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="ml-auto text-xs text-text-muted hover:text-accent-purple transition-colors"
              >
                {showHint ? "Hide Hint" : "Need a hint?"}
              </button>
            </div>

            {/* Hint */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 rounded-lg bg-accent-purple/5 border border-accent-purple/20 p-3"
              >
                <p className="text-xs text-accent-purple">💡 {challenge.hint}</p>
              </motion.div>
            )}

            {/* Output */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl bg-bg-secondary border border-border-subtle overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
                  <div className="h-2 w-2 rounded-full bg-accent-cyan" />
                  <span className="text-xs font-medium text-text-muted">Output</span>
                </div>
                <pre className="p-4 font-mono text-sm text-accent-cyan whitespace-pre-wrap">{output}</pre>
              </motion.div>
            )}

            {/* Success indicator */}
            {completed.has(challenge.id) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 flex items-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 px-4 py-3"
              >
                <Check size={16} className="text-accent-cyan" />
                <span className="text-sm font-medium text-accent-cyan">Correct! +10 points</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
