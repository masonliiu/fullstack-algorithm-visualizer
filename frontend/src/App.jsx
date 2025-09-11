import { useEffect, useRef, useState } from "react";
import { fetchSort } from "./api";

const styles = {
  app: {maxWidth: 1000, margin: "24px auto", padding: 16, color: "#e6e9ef", fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif"},

  bodyWrap: { background: "#0f1220", fontSize: 28, minHeight: "100vh" },
  h1: { margin: "0, 0 12px", fontSize: 28 },
  controls: {display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, alignItems: "center", background: "#181a2b", padding: 12, borderRadius: 14},
  label: { display: "flex", gap: 8, alignItems: "center"},
  range: { width: 140},
  buttons: {display: "flex", gap: 8},
  btn: { background: "#3b82f6", color: "white", border: "none", padding: "8px 12px", borderRadius: 10, cursor: "pointer"},
  barsWrap: { display: "flex", alignItems: "flex-end", height: 360, gap: 2, background: "#181a2b", borderRadius: 14, padding: 10, marginTop: 16, overflow: "hidden"},
  bar: { background: "#8b95b3", borderRadius: "6px 6px 0 0"},
  note: { opacity: 0.7, fontSize: 12, marginTop: 8}
};

const HL_COLORS = {
  compare: "#facc15",
  swap: "#fb923c",
  overwrite: "#a78bfa",
  mark_final: "#34d399"
};

export default function App() {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(40);
  const [playing, setPlaying] = useState(false);

  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  function getDisplayArray(frames, i) {
    for (let k = i; k >= 0; k--) {
      const f = frames[k];
      if (f && Array.isArray(f.array)) {
        console.log("Display array at frame", k, ":", f.array);
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
  
    const data = await fetchSort({ algorithm, size });
    console.log("Fetched from backend:", data);   // <— debug line
  
    const steps = Array.isArray(data.steps) ? data.steps : [];
    setFrames(steps);
  
    // Immediately display the first snapshot if available
    if (steps.length > 0) {
      setIndex(0);
    }
  }


  function play() {
    if (timer.current) return;
    setPlaying(true);
    timer.current = setInterval(() => {
      setIndex(i => {
        if (i + 1 >= frames.length) {
          clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, speed);
  }

  function pause() {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setPlaying(false);
  }

  useEffect(() => {
    loadRun();
    return () => {if (timer.current) clearInterval(timer.current); };
  }, [algorithm, size]);

  useEffect(() => {
    if (!playing) return;
    pause();
    play();
  }, [speed]);

  return (
    <div style={styles.bodyWrap}>
    <div style={styles.app}>
      <h1 style={styles.h1}>Algorithm Visualizer</h1>

      {/* Controls */}
      <div style={styles.controls}>
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

        <label style={styles.label}>
          Size: {size}
          <input type="range" min="5" max="150" value={size} style={styles.range}
                 onChange={e => setSize(Number(e.target.value))} />
        </label>

        <label style={styles.label}>
          Speed (ms): {speed}
          <input type="range" min="5" max="300" value={speed} style={styles.range}
                 onChange={e => setSpeed(Number(e.target.value))} />
        </label>

        <div style={styles.buttons}>
          {!playing ? (
            <button style={styles.btn} onClick={play}>Run</button>
          ) : (
            <button style={styles.btn} onClick={pause}>Pause</button>
          )}
          <button style={styles.btn} onClick={loadRun}>Shuffle</button>
        </div>
      </div>

      {/* Bars */}
      <div style={styles.barsWrap}>
        {console.log("Rendering bars with displayArray:", displayArray)}
        {displayArray.map((v, i) => {
          const isHL = highlightIndices?.includes?.(i);
          const bg = isHL ? HL_COLORS[highlightType] || styles.bar.background : styles.bar.background;
          return (
            <div key={i} style={{ ...styles.bar, height: v * 3, width: barWidth, background: bg }} title={String(v)} />
          );
        })}
      </div>

      <p style={styles.note}>compare: yellow | swap: orange | overwrite: purple | final: green</p>
      </div>
    </div>
  );
}