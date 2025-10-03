import { useEffect, useRef, useState } from "react";
import { fetchSort } from "../api";
import "./Visualizer.css";

const HL_COLORS = {
  compare: "#facc15",
  swap: "#ef4444",
  mark_final: "#22c55e",
};

const LEGEND = [
  { type: "compare", color: HL_COLORS.compare, desc: "Comparing values" },
  { type: "swap", color: HL_COLORS.swap, desc: "Swapping values" },
  { type: "mark_final", color: HL_COLORS.mark_final, desc: "Final position" },
];

function renderSorting({
  displayArray,
  highlightType,
  highlightIndices,
  finalized,
  barWidth,
  maxValue,
}) {
  return displayArray.map((v, i) => {
    const isHL = highlightIndices?.includes?.(i);
    let bg = isHL ? HL_COLORS[highlightType] : undefined;
    if (finalized.includes(i)) bg = HL_COLORS.mark_final;

    return (
      <div
        className="bar-container"
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="bar"
          style={{
            width: `${barWidth}px`,
            height: `${(v / maxValue) * 320}px`,
            background: bg || "#8b95b3",
          }}
        />
        <span
          className="bar-label"
          style={{
            fontSize: `${Math.min(14, Math.max(8, barWidth * 0.6))}px`,
          }}
        >
          {v}
        </span>
      </div>
    );
  });
}

function renderSearch({ displayArray, highlightIndices, targetIndex }) {
  const max = Math.max(...displayArray, 1);
  return displayArray.map((v, i) => {
    let bg;
    if (i === targetIndex) bg = "#22c55e";
    else if (highlightIndices?.includes?.(i)) bg = "#facc15";

    return (
      <div
        className="bar-container"
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="bar"
          style={{
            width: "18px",
            height: `${(v / max) * 320}px`,
            background: bg || "#8b95b3",
          }}
        />
        <span className="bar-label" style={{ fontSize: "10px" }}>
          {v}
        </span>
      </div>
    );
  });
}

function renderGraph() {
  return (
    <div
      style={{
        width: "100%",
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8b95b3",
      }}
    >
      <span>Graph visualization placeholder</span>
    </div>
  );
}

function renderGrid({ frame }) {
  const grid = frame?.grid || [[]];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 20px)`,
        gap: "2px",
      }}
    >
      {grid.flat().map((cell, idx) => (
        <div
          key={idx}
          style={{
            width: 20,
            height: 20,
            background: cell === 1 ? "#8b95b3" : "#e5e7eb",
            border: "1px solid #cbd5e1",
          }}
        />
      ))}
    </div>
  );
}

export default function Visualizer({ algo }) {
  const algorithm = (algo || "bubble").toLowerCase();

  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(300);
  const [playing, setPlaying] = useState(false);

  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);
  const [finalized, setFinalized] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const timer = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const displayArray = (() => {
    for (let k = index; k >= 0; k--) {
      const f = frames[k];
      if (f && Array.isArray(f.array)) return f.array;
    }
    return [];
  })();

  const current = frames[index] || {};
  const highlightType = (current.type || "").toLowerCase();
  const highlightIndices = current.indices || [];

  const gap = 4;
  const totalGap = gap * Math.max(0, displayArray.length - 1);
  const barWidth = Math.max(
    2,
    Math.floor((containerWidth - 24 - totalGap) / Math.max(displayArray.length, 1))
  );
  const maxValue = Math.max(...displayArray, 1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    setContainerWidth(containerRef.current.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      setPlaying(false);
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      setFrames([]);
      setIndex(0);
      setFinalized([]);
      setErrorMsg("");

      try {
        const data = await fetchSort({ algorithm, size });
        const steps = Array.isArray(data.steps) ? data.steps : [];
        setFrames(steps);
        if (steps.length > 0) setIndex(0);
      } catch (err) {
        console.error(err);
        setErrorMsg(
          err?.message || "Could not load steps for this algorithm."
        );
      }
    })();
  }, [algorithm, size]);

  useEffect(() => {
    if (!playing) return;
    stop();
    play();
  }, [speed]);

  function play() {
    if (timer.current || frames.length === 0) return;
    setPlaying(true);
    if (index >= frames.length - 1) {
      setIndex(0);
      setFinalized([]);
    }
    timer.current = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next >= frames.length) {
          clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          const last = frames[frames.length - 1];
          if (last?.type === "MARK_FINAL") {
            setFinalized((prev) => [...new Set([...prev, ...last.indices])]);
          }
          return i;
        }
        if (frames[next]?.type === "MARK_FINAL") {
          setFinalized((prev) => [
            ...new Set([...prev, ...(frames[next].indices || [])]),
          ]);
        }
        return next;
      });
    }, speed);
  }

  function stop() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setPlaying(false);
  }

  const sortingAlgos = ["bubble", "insertion", "selection", "merge", "quick", "heap"];

  return (
    <div className="visualizer-body">
      <div className="visualizer-app">
        <div className="controls">
          <label className="label">
            Size:{" "}
            <span style={{ display: "inline-block", minWidth: 35, textAlign: "right" }}>
              {size}
            </span>
            <input
              type="range"
              min="5"
              max="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </label>

          <label className="label">
            Speed (ms):{" "}
            <span style={{ display: "inline-block", minWidth: 52, textAlign: "right" }}>
              {speed}
            </span>
            <input
              type="range"
              min="5"
              max="400"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <div className="buttons">
              {!playing ? (
                <button className="btn" onClick={play} disabled={frames.length === 0}>
                  Run
                </button>
              ) : (
                <button className="btn" onClick={stop}>Stop</button>
              )}
              <button className="btn" onClick={() => {                      
                const s = size;
                setSize((prev) => prev); 
              }}>
                Shuffle
              </button>
            </div>
          </label>

          <div style={{ gridColumn: "1 / -1" }} />
        </div>

        <div className="bars-wrap" ref={containerRef}>
          {errorMsg ? (
            <div className="error-overlay">{errorMsg}</div>
          ) : sortingAlgos.some((a) => algorithm.includes(a)) ? (
            renderSorting({
              displayArray,
              highlightType,
              highlightIndices,
              finalized,
              barWidth,
              maxValue,
            })
          ) : algorithm.includes("search") ? (
            renderSearch({
              displayArray,
              highlightIndices: current.indices,
              targetIndex: current.targetIndex,
            })
          ) : ["dijkstra", "astar", "bfs"].some((a) => algorithm.includes(a)) ? (
            renderGrid({ frame: current })
          ) : (
            renderGraph({ frame: current })
          )}
        </div>

        <div className="legend">
          {LEGEND.map((l) => (
            <span key={l.type} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className="legend-box" style={{ background: l.color }} />
              <span>{l.desc}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}