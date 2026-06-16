# AI PM Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved A-direction visual refresh across the AI product manager learning platform.

**Architecture:** Keep the existing Next.js component structure and update styling in place. Extend Tailwind tokens for the new blue/cyan palette, then restyle reusable shells and dashboard components without changing API behavior or data contracts.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, lucide-react.

---

### Task 1: Global Visual Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] Add blue/cyan learning-platform color tokens, softer card shadows, and a radial light background.
- [ ] Keep existing token names where components already depend on them.
- [ ] Verify the body background and focus ring use the refreshed palette.

### Task 2: Navigation And Auth Surfaces

**Files:**
- Modify: `components/app-shell.tsx`
- Modify: `components/auth-form.tsx`
- Modify: `app/login/page.tsx`

- [ ] Add stronger brand treatment and icon-led navigation styling.
- [ ] Update auth cards, fields, buttons, and links to match the new visual system.
- [ ] Preserve logout and auth submit behavior.

### Task 3: Dashboard Learning Components

**Files:**
- Modify: `components/current-task-card.tsx`
- Modify: `components/progress-summary.tsx`
- Modify: `components/resource-list.tsx`
- Modify: `components/note-editor.tsx`
- Modify: `components/roadmap.tsx`
- Modify: `app/page.tsx`

- [ ] Add icon-led emphasis to learning goal, action task, notes, resources, and progress.
- [ ] Restyle task and roadmap cards with stronger current-state highlighting.
- [ ] Keep task completion and note submission behavior unchanged.

### Task 4: Secondary Pages

**Files:**
- Modify: `components/translation-tool.tsx`
- Modify: `components/reminder-settings-form.tsx`
- Modify: `app/translate/page.tsx`
- Modify: `app/notebook/page.tsx`
- Modify: `app/settings/page.tsx`

- [ ] Apply the same panel, field, badge, and button treatments.
- [ ] Keep translation, reminder, and notebook data behavior unchanged.

### Task 5: Verification

**Files:**
- Read: `package.json`

- [ ] Run the available lint command.
- [ ] Run a production build if the environment supports it.
- [ ] Start the app locally and visually inspect the refreshed dashboard if possible.
