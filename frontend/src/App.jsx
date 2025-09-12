import { useEffect, useRef, useState } from "react";
import { fetchSort } from "./api";

const styles = {
  app: {maxWidth: 1000, margin: "24px auto", padding: 16, color: "#e6e9ef", fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif"},

  bodyWrap: { background: "#0f1220", fontSize: 28, minHeight: "100vh" },
  h1: { margin: "0, 0 12px", fontSize: 28 },
  controls: {display: "grid", gridTemplateColumns: "auto 1fr", gridTemplateRows: "auto auto", gap: 12, alignItems: "center", background: "#181a2b", padding: 12, borderRadius: 14},
  label: { display: "flex", gap: 8, alignItems: "center", whiteSpace: "nowrap"},
  range: { width: 120, flexShrink: 0},
  buttons: {display: "flex", gap: 8, flexWrap: "nowrap", justifyContent: "flex-start"},
  btn: { background: "#3b82f6", color: "white", border: "none", padding: "12px 12px", borderRadius: 10, cursor: "pointer", flexShrink: 0},
  barsWrap: { display: "flex", alignItems: "flex-end", height: 360, gap: 2, background: "#181a2b", borderRadius: 14, padding: 10, marginTop: 16, overflow: "hidden"},
  bar: { background: "#8b95b3", borderRadius: "6px 6px 0 0"},
  note: { opacity: 0.7, fontSize: 12, marginTop: 8}
};

const HL_COLORS = {
  compare: "#3b82f6",
  swap: "#ef4444",
  overwrite: "#f59342",
  mark_final: "#22c55e"
};
const LEGEND = [
  { type: "compare", color: HL_COLORS.compare, desc: "Comparing values" },
  { type: "swap", color: HL_COLORS.swap, desc: "Swapping values" },
  { type: "overwrite", color: HL_COLORS.overwrite, desc: "Overwriting value" },
  { type: "mark_final", color: HL_COLORS.mark_final, desc: "Final position" }
];


export default function App() {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [size, setSize] = useState(15);
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

  const barWidth = Math.max(2, Math.floor(900/ Math.max(1, displayArray.length)));

  async function loadRun() {
    setPlaying(false);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setFrames([]); 
    setIndex(0);
    setFinalized([]);
  
    const data = await fetchSort({ algorithm, size });
  
    const steps = Array.isArray(data.steps) ? data.steps : [];
    setFrames(steps);
  
    //display snapshot
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
        if (nextIndex >= frames.length) {
          clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          const lastFrame = frames[frames.length - 1];

          setFinalized([...Array(displayArray.length).keys()]);
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
  }, [algorithm, size]);

  useEffect(() => {
    if (!playing) return;``
    stop();
    play();
  }, [speed]);

  return (
    <div style={styles.bodyWrap}>
    <div style={styles.app}>
      <h1 style={styles.h1}>Algorithm Visualizer</h1>

      {/* Controls */}
      <div style={styles.controls}>
        <label style={styles.label}>
          Size: <span style={{display: "inline-block", minWidth: 35, textAlign: "right"}}>{size}</span>
          <input
            type="range"
            min="5"
            max="50"
            value={size}
            style={styles.range}
            onChange={e => setSize(Number(e.target.value))}
          />
        </label>

        <label style = {styles.label}>
          Speed (ms): <span style ={{display: "inline-block", minWidth: 52, textAlign: "right"}}>{speed}</span>
          <input    
            type="range"
            min="5"
            max="300"
            value={speed}
            style={styles.range}
            onChange={e => setSpeed(Number(e.target.value))}
          />
        
        <div style={styles.buttons}>
          {!playing ? (
            <button style={styles.btn} onClick={play}>Run</button>
          ) : (
            <button style={styles.btn} onClick={stop}>Stop</button>
          )}
          <button style={styles.btn} onClick={loadRun}>Shuffle</button>
        </div>
        </label>
      <div style={{gridColumn: "1 / -1"}}>
        <label style={styles.label}>
          Algorithm:
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
            <option value="bubble">Bubble</option>
            <option value="insertion">Insertion</option>
            <option value="selection">Selection</option>
            <option value="merge">Merge</option>
            <option value="quick">Quick</option>
            <option value="heap">Heap</option>
          </select>
        </label>
      </div>   
    </div>

      {/* Bars */}
      <div style={styles.barsWrap}>
        {displayArray.map((v, i) => {
          const isHL = highlightIndices?.includes?.(i);
          let bg = isHL ? HL_COLORS[highlightType] || styles.bar.background : styles.bar.background;
          if (finalized.includes(i)) {
            bg = HL_COLORS.mark_final;
          }
          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height: `${(v / Math.max(...displayArray)) * 100}%`,
                background: bg,
                borderRadius: "4px 4px 0 0",
                transition: "height 0.2s ease",
              }}
            />
          );
        })}
      </div>

      <div style={{...styles.note, display: "flex", gap: 14, alignItems: "center", gap: 4}}>
        {LEGEND.map(l => (
          <span key={l.type} style ={{display: "flex", alignItems: "center", gap: 4}}>
            <span style={{
              display: "inline-block",
              width: 16,
              height: 12,
              background: l.color,
              borderRadius: 3,
              marginRIght: 3,
              border: "1px solid #2226"
            }} />
            <span>{l.desc}</span>
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}