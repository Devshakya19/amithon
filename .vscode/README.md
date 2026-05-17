This folder contains workspace guidance for GitHub Copilot / Copilot Chat.

- `copilot-instructions.md`: Primary workspace instructions that ask
  Copilot Chat agents to consult the local `../everything-claude-code`
  repository's `rules/`, `skills/`, and `agents/` directories before
  making edits in this workspace.
- `extensions.json`: recommends installing the Copilot and Copilot Chat
  extensions so the editor has the correct tooling.

How it works:

- When opening this workspace, enable the recommended extensions.
- If your Copilot Chat agent respects workspace instruction files, it
  should read `copilot-instructions.md` and consult the specified
  directories in `../everything-claude-code`.

Adjust the `copilot-instructions.md` file if you want a different
ordering or to include other local paths.
