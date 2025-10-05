import { useEffect, useRef, useState } from "react";
import { fetchSort } from "../api";
import "./Visualizer.css";

const HL_COLORS = {
  compare: "#facc15",
  swap: "#ef4444",
  mark_final: "#22c55e",
  open: "#3b82f6",
  closed: "#6366f1",
  path: "#f97316",
  start: "#10b981",
  goal: "#ef4444"
};

const LEGEND = [
  { type: "compare", color: HL_COLORS.compare, desc: "Comparing values" },
  { type: "swap", color: HL_COLORS.swap, desc: "Swapping values" },
  { type: "mark_final", color: HL_COLORS.mark_final, desc: "Final position" }
];

function renderSorting({
  displayArray,
  highlightType,
  highlightIndices,
  finalized,
  barWidth,
  maxValue,
  HL_COLORS
}) {
  return displayArray.map((v, i) => {
    const isHL = highlightIndices?.includes?.(i);
    let bg = isHL ? HL_COLORS[highlightType] || undefined : undefined;
    if (finalized.includes(i)) {
      bg = HL_COLORS.mark_final;
    }
    return (
      <div className="bar-container" key={i}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}
      >
        <div
          className="bar"
          style={{
            width: `${barWidth}px`,
            height: `${(v / maxValue) * 320}px`,
            background: bg || "#8b95b3",
          }}
        />
        <span className="bar-label"
          style={{ fontSize: `${Math.min(14, Math.max(8, barWidth * 0.6))}px` }}
        >
          {v}
        </span>
      </div>
    );
  });
}

function renderSearch({ displayArray, highlightIndices, targetIndex, targetValue, currentComparison, containerWidth = 600, containerHeight = 240 }) {
  const n = displayArray.length;
  const maxVal = Math.max(...displayArray, 1);
  const margin = 24;
  const availableWidth = Math.max(containerWidth - margin, 120);
  const minBarWidth = 12;
  const maxBarWidth = 42;
  const gap = Math.max(3, Math.min(10, Math.floor(availableWidth / (n * 6))));
  const barWidth = Math.max(minBarWidth, Math.min(maxBarWidth, Math.floor((availableWidth - gap * (n - 1)) / n)));
  const chartWidth = n * barWidth + (n - 1) * gap;
  const chartHeight = Math.max(120, Math.min(320, containerHeight - 60));

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          minHeight: chartHeight + 30,
          marginTop: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            width: `${chartWidth}px`,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {displayArray.map((v, i) => {
            let bg = undefined;
            if (i === targetIndex) {
              bg = "#22c55e";
            } else if (highlightIndices?.includes?.(i)) {
              bg = "#facc15";
            }
            return (
              <div
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
                    height: `${(v / maxVal) * chartHeight}px`,
                    background: bg || "#8b95b3",
                    borderRadius: "3px",
                    transition: "all 0.2s cubic-bezier(.6,.2,.2,1)",
                  }}
                />
                <span
                  className="bar-label"
                  style={{
                    fontSize: `${Math.min(14, Math.max(9, barWidth * 0.65))}px`,
                    marginTop: "4px",
                    color: "#cbd5e1",
                  }}
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function forceLayout(nodes, edges, width, height, iter = 400) {
  const n = nodes.length;
  if (n === 0) return [];

  const positions = nodes.map((_, i) => {
    const angle = (2 * Math.PI * i) / n;
    const jitter = ((i * 37) % 10) - 5;
    return {
      x: width / 2 + (width / 3) * Math.cos(angle) + jitter,
      y: height / 2 + (height / 3) * Math.sin(angle) + jitter,
      dx: 0,
      dy: 0
    };
  });

  const area = width * height;
  const k = Math.sqrt(area / n);

  let temperature = width / 10;

  const limitDisplacement = (dx, dy, temp) => {
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { dx: 0, dy: 0 };
    const limitedDist = Math.min(dist, temp);
    return {
      dx: (dx / dist) * limitedDist,
      dy: (dy / dist) * limitedDist
    };
  };

  const minDist = 40;

  for (let it = 0; it < iter; it++) {
    for (let i = 0; i < n; i++) {
      positions[i].dx = 0;
      positions[i].dy = 0;
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let dx = positions[i].x - positions[j].x;
        let dy = positions[i].y - positions[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        let force = (k * k) / dist;

        let repulseX = (dx / dist) * force;
        let repulseY = (dy / dist) * force;

        positions[i].dx += repulseX;
        positions[i].dy += repulseY;
        positions[j].dx -= repulseX;
        positions[j].dy -= repulseY;
      }
    }

    for (let edge of edges) {
      const u = nodes.indexOf(edge[0]);
      const v = nodes.indexOf(edge[1]);
      if (u === -1 || v === -1) continue;

      let dx = positions[u].x - positions[v].x;
      let dy = positions[u].y - positions[v].y;
      let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      let force = (dist * dist) / k;

      let attractX = (dx / dist) * force;
      let attractY = (dy / dist) * force;

      positions[u].dx -= attractX;
      positions[u].dy -= attractY;
      positions[v].dx += attractX;
      positions[v].dy += attractY;
    }

    for (let i = 0; i < n; i++) {
      let { dx, dy } = positions[i];
      let limited = limitDisplacement(dx, dy, temperature);
      positions[i].x += limited.dx;
      positions[i].y += limited.dy;
      positions[i].x = Math.min(width - 40, Math.max(40, positions[i].x));
      positions[i].y = Math.min(height - 40, Math.max(40, positions[i].y));
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let dx = positions[i].x - positions[j].x;
        let dy = positions[i].y - positions[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (dist < minDist) {
          let overlap = (minDist - dist) / 2;
          let offsetX = (dx / dist) * overlap;
          let offsetY = (dy / dist) * overlap;
          positions[i].x += offsetX;
          positions[i].y += offsetY;
          positions[j].x -= offsetX;
          positions[j].y -= offsetY;

          positions[i].x = Math.min(width - 40, Math.max(40, positions[i].x));
          positions[i].y = Math.min(height - 40, Math.max(40, positions[i].y));
          positions[j].x = Math.min(width - 40, Math.max(40, positions[j].x));
          positions[j].y = Math.min(height - 40, Math.max(40, positions[j].y));
        }
      }
    }

    temperature *= 0.95;
  }

  return positions.map(({ x, y }) => ({ x, y }));
}

function renderGraph({ frame, width = 300, height = 300 }) {
  const nodes = frame?.nodes || [];
  if (!nodes.length) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        border: "1px solid #cbd5e1",
        color: "#6b7280"
      }}>
        Graph visualization placeholder
      </div>
    );
  }

  const allEdges = frame?.edges || [];
  const mstEdges = frame?.mstEdges || [];
  const activeEdge = frame?.activeEdge || null;

  const positions = forceLayout(nodes, allEdges, width, height);

  const posOf = (n) => positions[nodes.findIndex(v => v === n)];
  const finalSet = new Set(frame.finalized || []);
  const activeSet = new Set(activeEdge ? [activeEdge[0], activeEdge[1]] : []);

  const drawnEdges = new Set();

  const edgeLine = (e, key, stroke, strokeWidth=2, dash=false, showWeight=true, index=0) => {
    const [u, v, w] = e;
    const p1 = posOf(u), p2 = posOf(v);
    if (!p1 || !p2) return null;

    const midx = (p1.x + p2.x) / 2;
    const midy = (p1.y + p2.y) / 2;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx*dx + dy*dy) || 1;

    const labelOffset = 14;
    const offsetX = (-dy / len) * labelOffset;
    const offsetY = (dx / len) * labelOffset;

    const edgeKey = `${Math.min(u,v)}-${Math.max(u,v)}`;
    let shouldShowWeight = showWeight;
    if (showWeight) {
      if (drawnEdges.has(edgeKey)) {
        shouldShowWeight = false;
      } else {
        drawnEdges.add(edgeKey);
      }
    }

    return (
      <g key={key}>
        <line
          x1={p1.x} y1={p1.y}
          x2={p2.x} y2={p2.y}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dash ? "6 4" : "none"}
        />
        {shouldShowWeight && (
          <text
            x={midx + offsetX}
            y={midy + offsetY}
            textAnchor="middle"
            fontSize="10"
            fill="#111"
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
            style={{ pointerEvents: "none" }}
          >
            {w}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: "#f9fafb", border: "1px solid #cbd5e1" }}
    >
      {allEdges.map((e, i) => edgeLine(e, `bg-${i}`, "#d1d5db", 1, false, true, i))}
      {mstEdges.map((e, i) => edgeLine(e, `mst-${i}`, HL_COLORS.mark_final, 3, false, false, i))}
      {activeEdge ? edgeLine(activeEdge, "active", HL_COLORS.compare, 3, true, false, 0) : null}
      {nodes.map((node, idx) => {
        const p = positions[idx];
        const isFinal = finalSet.has(node);
        const isActive = activeSet.has(node);
        const fill = isFinal ? HL_COLORS.mark_final : isActive ? HL_COLORS.compare : "#8b95b3";
        return (
          <g key={`n-${node}`}>
            <circle cx={p.x} cy={p.y} r={15} fill={fill} stroke="#374151" strokeWidth={1.5} />
            <text
              x={p.x}
              y={p.y + 3}
              textAnchor="middle"
              fontSize="9"
              fill="#f9fafb"
              fontWeight="bold"
              stroke="#374151"
              strokeWidth="0.5"
              paintOrder="stroke"
            >
              {node}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function renderPathfinding({ frame }) {
  const grid = frame?.grid || [[]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 20px)`, gap: "2px" }}>
      {grid.flat().map((cell, idx) => {
        let bg = "#e5e7eb";
        switch(cell) {
          case "wall":
          case 1: bg = "#8b95b3"; break;
          case "open": bg = HL_COLORS.open; break;
          case "closed": bg = HL_COLORS.closed; break;
          case "path": bg = HL_COLORS.path; break;
          case "start": bg = HL_COLORS.start; break;
          case "goal": bg = HL_COLORS.goal; break;
          default: bg = "#e5e7eb";
        }
        return (
          <div key={idx} style={{
            width: 20,
            height: 20,
            background: bg,
            border: "1px solid #cbd5e1"
          }} />
        );
      })}
    </div>
  );
}

export default function Visualizer({ algo }) {
  const isSearch = algo.toLowerCase().includes("search");
  const [size, setSize] = useState(isSearch ? 20 : 10);
  const [speed, setSpeed] = useState(isSearch ? 700 : 300);
  const [playing, setPlaying] = useState(false);
  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const [finalized, setFinalized] = useState([]);

  function getDisplayArray(frames, i) {
    for (let k = i; k >= 0; k--) {
      const f = frames[k];
      if (f && Array.isArray(f.array)) {
        return f.array;
      }
    }
    return [];
  }

  const rawCurrent = frames[index] || {};
  const isGraphAlgo = ["prim", "kruskal", "floydwarshall", "dijkstra"].some(a => algo.toLowerCase().includes(a));
  const current = isGraphAlgo ? { ...rawCurrent, array: [] } : rawCurrent;
  const displayArray = getDisplayArray(frames, index) || [];
  const highlightType = (current.type || "").toLowerCase();
  const highlightIndices = current.indices || [];

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  const barWidth = Math.max(2, Math.floor((containerWidth - 24) / displayArray.length));
  const maxValue = Math.max(...displayArray, 1);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new window.ResizeObserver(entries => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
        setContainerHeight(entries[0].contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    const rect = containerRef.current.getBoundingClientRect();
    setContainerWidth(rect.width);
    setContainerHeight(rect.height);
    return () => observer.disconnect();
  }, []);

  async function loadRun() {
    setPlaying(false);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setFrames([]); setIndex(0); setFinalized([]);
    const effectiveSize = isGraphAlgo ? 6 : size;
    const data = await fetchSort({ algorithm: algo, size: effectiveSize });
    const steps = Array.isArray(data.steps) ? data.steps : [];
    setFrames(steps);
    if (steps.length > 0) setIndex(0);
  }

  function play() {
    if (timer.current) return;
    setPlaying(true);
    if (index >= frames.length-1) { setIndex(0); setFinalized([]); }
    timer.current = setInterval(() => {
      setIndex(i => {
        const nextIndex = i + 1;
        if (nextIndex >= frames.length) {
          clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          return i;
        }
        if (frames[nextIndex]?.type === "MARK_FINAL") {
          setFinalized(prev => [...new Set([...prev, ...frames[nextIndex].indices])]);
        }
        return nextIndex;
      });
    }, speed);
  }

  function stop() {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setPlaying(false);
  }

  useEffect(() => {
    loadRun();
    return () => {if (timer.current) clearInterval(timer.current); };
  }, [algo, size]);

  useEffect(() => {
    if (!playing) return;
    stop();
    play();
  }, [speed]);

  const sortingAlgos = ["bubble", "insertion", "selection", "merge", "quick", "heap"];

  const isSearchAlgo = algo.toLowerCase().includes("search");
  const searchTargetValue = current.targetValue ?? current.extra?.targetValue;
  const searchCurrentComparison = current.currentComparison ?? current.extra?.currentComparison;

  return (
    <div className="visualizer-body">
      <div className="visualizer-app">
        <div className="controls" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <label className="label">
            Size: <span style={{minWidth: 35, textAlign: "right"}}>{isGraphAlgo ? 6 : size}</span>
            <input
              type="range"
              min="4"
              max={["prim","kruskal"].includes(algo.toLowerCase()) ? "7" : "50"}
              value={isGraphAlgo ? 6 : size}
              onChange={e => setSize(Number(e.target.value))}
              disabled={isGraphAlgo}
            />
          </label>

          <label className="label">
            Speed (ms): <span style ={{minWidth: 52, textAlign: "right"}}>{speed}</span>
            <input    
              type="range"
              min="5"
              max="400"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            />
            <div className="buttons" style={{ display: "inline-flex", marginLeft: 10 }}>
              {!playing ? (
                <button className="btn" onClick={play}>Run</button>
              ) : (
                <button className="btn" onClick={stop}>Stop</button>
              )}
              <button className="btn" onClick={loadRun}>Shuffle</button>
            </div>
          </label>
          {isSearchAlgo && (
            <div className="search-info">
              <span>
                Target Value:{" "}
                <span className={`search-value target ${searchTargetValue !== undefined ? "visible" : "hidden"}`}>
                  {searchTargetValue !== undefined ? searchTargetValue : "-"}
                </span>
              </span>
              <span>
                Comparison:{" "}
                {searchCurrentComparison !== undefined ? (
                  <>
                    <span className="search-value target">{searchTargetValue}</span>{" "}
                    {searchTargetValue === searchCurrentComparison
                      ? "=="
                      : searchTargetValue > searchCurrentComparison
                      ? ">"
                      : "<"}{" "}
                    <span className="search-value comparison">{searchCurrentComparison}</span>
                  </>
                ) : (
                  "-"
                )}
              </span>
            </div>
          )}
        </div>
        

        <div className="bars-wrap" ref={containerRef}>
          {
            sortingAlgos.some(a => algo.toLowerCase().includes(a)) ? (
              renderSorting({
                displayArray,
                highlightType,
                highlightIndices,
                finalized,
                barWidth,
                maxValue,
                HL_COLORS
              })
            ) : isSearchAlgo ? (
              renderSearch({
                displayArray,
                highlightIndices: current.indices,
                targetIndex: current.targetIndex,
                targetValue: current.targetValue,
                currentComparison: current.currentComparison,
                containerWidth,
                containerHeight
              })
            ) : (
              ["bfs", "dfs", "astar"].some(a => algo.toLowerCase().includes(a)) ? (
                renderPathfinding({ frame: current })
              ) : (
                ["prim", "kruskal", "dijkstra"].some(a => algo.toLowerCase().includes(a)) ? (
                  renderGraph({ frame: current, width: containerWidth, height: containerHeight })
                ) : (
                  renderGraph({ frame: current, width: containerWidth, height: containerHeight })
                )
              )
            )
          }
        </div>

        <div className="legend">
          {isSearchAlgo ? (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className="legend-box" style={{ background: HL_COLORS.compare }} />
              <span>Comparing values</span>
            </span>
          ) : (
            LEGEND.map(l => (
              <span key={l.type} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span className="legend-box" style={{ background: l.color }} />
                <span>{l.desc}</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}