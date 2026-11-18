import { useEffect, useState } from "react";
import { prompts } from "./questions";

const storageKey = "engineering-interview-practice";

function loadProgress(): number[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved)
      ? [...new Set(saved.filter((value): value is number =>
        Number.isInteger(value) && value >= 0 && value < prompts.length))]
      : [];
  } catch {
    return [];
  }
}

export function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(loadProgress);
  const [limit, setLimit] = useState(30);
  const [remaining, setRemaining] = useState(30);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState(false);
  const prompt = prompts[index];
  const practiced = done.includes(index);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(done));
    } catch {
      // Rehearsal still works when storage is disabled.
    }
  }, [done]);

  useEffect(() => {
    if (deadline === null) return;
    const update = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setDeadline(null);
    };
    update();
    const timer = window.setInterval(update, 200);
    return () => window.clearInterval(timer);
  }, [deadline]);

  const nextPrompt = () => {
    setIndex((index + 1) % prompts.length);
    setDeadline(null);
    setRemaining(limit);
    setAnswer("");
    setReview(false);
  };
  const words = new Set(answer.toLowerCase().match(/[a-z]+/g) ?? []);
  const covered = prompt.keywords.filter(word => words.has(word));

  return (
    <main>
      <h1>Engineering interview rehearsal</h1>
      <p className="progress">{done.length}/{prompts.length} prompts practiced</p>
      <section>
        <h2>{prompt.question}</h2>
        <div>
          <label htmlFor="duration">Time limit </label>
          <select id="duration" value={limit} disabled={deadline !== null} onChange={event => {
            const seconds = Number(event.target.value);
            setLimit(seconds);
            setRemaining(seconds);
          }}>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
          </select>
          <button type="button" disabled={deadline !== null} onClick={() => {
            setRemaining(limit);
            setDeadline(Date.now() + limit * 1000);
          }}>Start timer</button>
          <span role="timer" aria-label="Time remaining"> {remaining}s</span>
          {remaining === 0 && <span role="status"> Time is up.</span>}
        </div>
        <label className="draft-label" htmlFor="draft">Practice notes</label>
        <textarea id="draft" rows={5} value={answer} onChange={event => {
          setAnswer(event.target.value);
          setReview(false);
        }} />
        <button type="button" disabled={!answer.trim()} onClick={() => setReview(true)}>Check topics</button>
        {review && <p role="status">
          {covered.length}/{prompt.keywords.length} suggested terms found.
          Review these topics in context: {prompt.keywords.join(", ")}.
        </p>}
        <p><strong>Follow-up</strong> {prompt.followUp}</p>
        <button type="button" onClick={() => setDone(practiced
          ? done.filter(item => item !== index)
          : [...done, index])}>{practiced ? "Mark unpracticed" : "Mark practiced"}</button>
        <button type="button" className="secondary" onClick={nextPrompt}>Next prompt</button>
      </section>
      <button type="button" className="reset" onClick={() => setDone([])}>Reset local progress</button>
    </main>
  );
}
