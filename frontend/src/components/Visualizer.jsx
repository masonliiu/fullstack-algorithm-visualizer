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
  const gap = 4;
  return displayArray.map((v, i) => {
    const isHL = highlightIndices?.includes?.(i);
    let bg = isHL ? HL_COLORS[highlightType] || undefined : undefined;
    if (finalized.includes(i)) {
      bg = HL_COLORS.mark_final;
    }
    return (
      <div className="bar-container" key={i}
        style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end"
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
        <span className="bar-label"
        style={{ fontSize: `${Math.min(14, Math.max(8, barWidth * 0.6))}px` }}
        >
          {v}
        </span>
      </div>
    );
  });
}

function renderSearch({ displayArray, highlightIndices, targetIndex }) {
  return displayArray.map((v, i) => {
    let bg = undefined;
    if (i === targetIndex) {
      bg = "#22c55e"; 
    } else if (highlightIndices?.includes?.(i)) {
      bg = "#facc15";
    }
    return (
      <div className="bar-container" key={i}
        style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <div
          className="bar"
          style={{
            width: "18px",
            height: `${(v / Math.max(...displayArray, 1)) * 320}px`,
            background: bg || "#8b95b3",
          }}
        />
        <span className="bar-label"
        style={{ fontSize: "10px" }}
        >
          {v}
        </span>
      </div>
    );
  });
}

function renderGraph({ frame }) {
  const nodes = frame?.nodes || [];
  if (!nodes.length) {
    return (
      <div style={{width: 400, height: 400, display: "flex",
                   alignItems: "center", justifyContent: "center",
                   background: "#f9fafb", border: "1px solid #cbd5e1",
                   color: "#6b7280"}}>
        Graph visualization placeholder
      </div>
    );
  }

  const allEdges = frame?.edges || [];      // all edges for background
  const mstEdges = frame?.mstEdges || [];   // accepted MST edges
  const activeEdge = frame?.activeEdge || null; // currently considered

  const width = 400, height = 400;
  const cx = width / 2, cy = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // circular node positions
  const positions = nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  const posOf = (n) => positions[nodes.findIndex(v => v === n)];
  const finalSet = new Set(frame.finalized || []);
  const activeSet = new Set(activeEdge ? [activeEdge[0], activeEdge[1]] : []);

  const edgeLine = (e, key, stroke, strokeWidth=2, dash=false) => {
    const [u, v, w] = e;
    const p1 = posOf(u), p2 = posOf(v);
    if (!p1 || !p2) return null;
  
    const midx = (p1.x + p2.x) / 2;
    const midy = (p1.y + p2.y) / 2;
  
    // vector for offset
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx*dx + dy*dy);
  
    // perpendicular direction
    const offsetX = (-dy / len) * 12; 
    const offsetY = (dx / len) * 12;
  
    // push label a bit further from the line if it's too close to a node
    const distFromP1 = Math.sqrt((midx - p1.x)**2 + (midy - p1.y)**2);
    const distFromP2 = Math.sqrt((midx - p2.x)**2 + (midy - p2.y)**2);
    const nearNode = Math.min(distFromP1, distFromP2) < 25;
  
    const labelOffset = 18; // push labels further out
    const finalX = midx + offsetX * 1.5;
    const finalY = midy + offsetY * 1.5 + (nearNode ? labelOffset : 0);
  
    return (
      <g key={key}>
        <line
          x1={p1.x} y1={p1.y}
          x2={p2.x} y2={p2.y}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dash ? "6 4" : "none"}
        />
        {typeof w === "number" && (
          <text
            x={finalX}
            y={finalY}
            textAnchor="middle"
            fontSize="12"
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
    <svg width={width} height={height} style={{ background: "#f9fafb", border: "1px solid #cbd5e1" }}>
      {/* background edges (gray) */}
      {allEdges.map((e, i) => edgeLine(e, `bg-${i}`, "#d1d5db", 2))}

      {/* MST edges (green, thick) */}
      {mstEdges.map((e, i) => edgeLine(e, `mst-${i}`, HL_COLORS.mark_final, 4))}

      {/* active edge (yellow, dashed) */}
      {activeEdge ? edgeLine(activeEdge, "active", HL_COLORS.compare, 4, true) : null}

      {/* nodes */}
      {nodes.map((node, idx) => {
        const p = positions[idx];
        const isFinal = finalSet.has(node);
        const isActive = activeSet.has(node);
        const fill = isFinal ? HL_COLORS.mark_final : isActive ? HL_COLORS.compare : "#8b95b3";
        return (
          <g key={`n-${node}`}>
            <circle cx={p.x} cy={p.y} r={20} fill={fill} stroke="#374151" strokeWidth={2} />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="10"
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

function renderGrid({ frame }) {
  const grid = frame?.grid || [[]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 20px)`, gap: "2px" }}>
      {grid.flat().map((cell, idx) => (
        <div key={idx} style={{
          width: 20,
          height: 20,
          background: cell === 1 ? "#8b95b3" : "#e5e7eb",
          border: "1px solid #cbd5e1"
        }} />
      ))}
    </div>
  );
}

function renderPathfinding({ frame }) {
  const grid = frame?.grid || [[]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 20px)`, gap: "2px" }}>
      {grid.flat().map((cell, idx) => {
        let bg = "#e5e7eb"; // default background
        switch(cell) {
          case "wall":
          case 1:
            bg = "#8b95b3";
            break;
          case "open":
            bg = HL_COLORS.open;
            break;
          case "closed":
            bg = HL_COLORS.closed;
            break;
          case "path":
            bg = HL_COLORS.path;
            break;
          case "start":
            bg = HL_COLORS.start;
            break;
          case "goal":
            bg = HL_COLORS.goal;
            break;
          default:
            bg = "#e5e7eb";
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
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(300);
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

  const gap = 4;
  const totalGap = gap * (displayArray.length-1);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const barWidth = Math.max(2, Math.floor((containerWidth - 24 - totalGap) / displayArray.length));
  const maxValue = Math.max(...displayArray, 1);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new window.ResizeObserver(entries => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);

    setContainerWidth(containerRef.current.getBoundingClientRect().width);
    return () => {
      observer.disconnect();
    };
  }, []);

  async function loadRun() {
    setPlaying(false);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setFrames([]); 
    setIndex(0);
    setFinalized([]);
  
    const data = await fetchSort({ algorithm: algo, size });
  
    const steps = Array.isArray(data.steps) ? data.steps : [];
    console.log("Visualizer: received frames", { algo, size, stepsCount: steps.length, first: steps[0] });
    setFrames(steps);
  
    if (steps.length > 0) {
      setIndex(0);
    }
  }


  function play() {
    if (timer.current) return;
    setPlaying(true);
    if (index >= frames.length-1) {
      setIndex(0);
      setFinalized([]);
    }
    timer.current = setInterval(() => {
      setIndex(i => {
        const nextIndex = i + 1;
        console.log("FRAME", nextIndex, frames[nextIndex]);
        console.log("FINALIZED BEFORE", finalized);
        if (nextIndex >= frames.length) {
          clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          const lastFrame = frames[frames.length - 1];

          if (lastFrame?.type === "MARK_FINAL") {
            setFinalized(prev => [...new Set([...prev, ...lastFrame.indices])]);
          }
          return i;
        }
        if (frames[nextIndex]?.type === "MARK_FINAL") {
          console.log("Marking final:", frames[nextIndex].indices);
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

  return (
    <div className="visualizer-body">
    <div className="visualizer-app">

      <div className="controls">
        <label className="label">
          Size: <span style={{display: "inline-block", minWidth: 35, textAlign: "right"}}>{size}</span>
          <input
            type="range"
            min="2"
            max={["prim","kruskal"].includes(algo.toLowerCase()) ? "10" : "50"}
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </label>

        <label className="label">
          Speed (ms): <span style ={{display: "inline-block", minWidth: 52, textAlign: "right"}}>{speed}</span>
          <input    
            type="range"
            min="5"
            max="400"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
          />
        
        <div className="buttons">
          {!playing ? (
            <button className="btn" onClick={play}>Run</button>
          ) : (
            <button className="btn" onClick={stop}>Stop</button>
          )}
          <button className="btn" onClick={loadRun}>Shuffle</button>
        </div>
        </label>
      <div style={{gridColumn: "1 / -1"}}>
        
      </div>   
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
          ) : algo.toLowerCase().includes("search") ? (
            renderSearch({
              displayArray,
              highlightIndices: current.indices,
              targetIndex: current.targetIndex
            })
          ) : (            
            ["bfs", "dfs", "astar", "dijkstra"].some(a => algo.toLowerCase().includes(a)) ? (
              renderPathfinding({ frame: current })
            ) : (        
              ["prim", "kruskal", "floydwarshall", "dijkstra"].some(a => algo.toLowerCase().includes(a)) ? (
                renderGraph({ frame: current })
              ) : (
                renderGraph({ frame: current })
              )
            )
          )
        }
      </div>

      <div className="legend">
        {LEGEND.map(l => (
          <span key={l.type} style ={{display: "flex", alignItems: "center", gap: 4}}>
            <span className="legend-box" style={{background: l.color}} />
            <span>{l.desc}</span>
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}