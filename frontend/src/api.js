export async function fetchSort({ algorithm = "bubble", size = 30, seed = "" }) {
    const url = new URL("http://localhost:8080/sort");
    url.searchParams.set("algorithm", algorithm);
    url.searchParams.set("size", size);
    if (seed !== "" && seed !== null && seed !== undefined) url.searchParams.set("seed", seed);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error (`Backend error ${res.status}`);
    return res.json();
}