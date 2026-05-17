# Copilot / Copilot Chat workspace instructions

Primary purpose: tell Copilot Chat agents which local source(s) to prefer
when producing suggestions, edits, plans or automated changes for this
repository.

IMPORTANT: This is a local, workspace-level guidance file. Agents that
respect workspace instruction files should read this file first.

Primary source of truth (READ FIRST):

- ../everything-claude-code/
  - rules/
  - skills/
  - agents/
  - plugins/
  - hooks/
  - .claude/

Behavioral instructions for Copilot Chat / editor agents:

1. Before making any code edits or recommending architecture changes in
   this `amithon` workspace, first read the directories listed above from
   the `everything-claude-code` repository (relative path: `../everything-claude-code`).
2. Use the `rules/` and `skills/` documents in `everything-claude-code` as
   the primary policy and style guide (security, code style, and allowed
   behaviors) when producing changes in this workspace.
3. If there is a conflict between guidance in `everything-claude-code`
   and local `amithon` docs, prefer `everything-claude-code` unless the
   user explicitly indicates otherwise in a clear instruction.
4. Favor conservative, secure edits: validate inputs, avoid secrets,
   and add server-side guards per the `rules/security` guidance.
5. When producing a plan or multi-file patch, list which `everything-claude-code`
   documents you consulted.

Paths worth consulting (quick list):

- ../everything-claude-code/rules
- ../everything-claude-code/skills
- ../everything-claude-code/agents
- ../everything-claude-code/plugins
- ../everything-claude-code/.claude

If you (the user) want a different ordering or to point to a remote
repository instead, update this file or tell the agent explicitly.

-- End of workspace guidance --
