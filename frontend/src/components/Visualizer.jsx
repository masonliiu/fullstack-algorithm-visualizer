import { useEffect, useRef, useState } from "react";
import { fetchSort } from "../api";
import { useParams } from "react-router-dom";
import "./Visualizer.css";
const HL_COLORS = {
  compare: "#facc15",
  swap: "#ef4444",
  mark_final: "#22c55e"
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
  //placeholder fallback
  return (
    <div style={{ width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#8b95b3" }}>
      <span>Graph visualization placeholder</span>
    </div>
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

  const current = frames[index] || {};
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
            min="5"
            max="50"
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
            (["dijkstra", "astar", "bfs"].some(a => algo.toLowerCase().includes(a))) ? (
              renderGrid({ frame: current })
            ) : (
              renderGraph({ frame: current })
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