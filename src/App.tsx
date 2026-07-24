import { useEffect, useState } from "react";
import { questions } from "./questions";

const key = "engineering-interview-practice";

export function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<number[]>(() => JSON.parse(localStorage.getItem(key) || "[]"));
  useEffect(() => localStorage.setItem(key, JSON.stringify(done)), [done]);
  const practiced = done.includes(index);
  const toggle = () => setDone(practiced ? done.filter((item) => item !== index) : [...done, index]);
  return <main><p className="eyebrow">LOCAL-ONLY PRACTICE</p><h1>Engineering interview rehearsal</h1><p className="progress">{done.length}/{questions.length} prompts practiced</p><section><p className="label">Current prompt</p><h2>{questions[index]}</h2><div><button onClick={toggle}>{practiced ? "Mark unpracticed" : "Mark practiced"}</button><button className="secondary" onClick={() => setIndex((index + 1) % questions.length)}>Next prompt</button></div></section><button className="reset" onClick={() => setDone([])}>Reset local progress</button></main>;
}
