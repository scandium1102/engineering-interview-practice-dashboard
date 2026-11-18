# Engineering Interview Practice Dashboard

[Portfolio case study](https://scandial-portfolio.scandium.chatgpt.site/project-interview-tool.html) · This public demonstration uses generic engineering prompts. The portfolio explains the wider private prototype.

A small privacy-first practice dashboard for engineering interviews. It uses generic questions and stores progress only in the browser; no user account, external API, personal notes, application records, or private Drive content is included.

## Run locally

```powershell
npm install
npm run dev
```

## Features

- Rotate through generic robotics, control, and systems-integration questions
- Mark a question as practiced
- Save the local checklist in `localStorage`
- Reset the local practice state

## Scope

This public rebuild preserves the idea of a lightweight interview helper without copying private preparation material or configuration. The sample prompts are intentionally generic.

## License

Apache-2.0. See [LICENSE](LICENSE).

## Public demonstration

Use `npm ci` and `npm run dev`. The public demo includes a 30/60-second timer, generic follow-up prompts and text-based topic matching. Practice notes stay in memory for the current prompt. Only the practiced-prompt checklist is saved to browser storage. The private prototype's question bank and speech controls are outside this release.
