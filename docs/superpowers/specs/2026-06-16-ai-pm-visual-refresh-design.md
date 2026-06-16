# AI PM Visual Refresh Design

## Goal

Refresh the AI product manager learning platform from a plain white-card look into a clean technology learning dashboard based on the approved A direction.

## Approved Direction

Use a crisp blue/cyan learning-platform palette inspired by modern education tools. Keep the UI focused and professional, but add stronger visual hierarchy through icon-led cards, status badges, progress emphasis, and clearer current-stage highlighting.

## Scope

- Update the global Tailwind palette and page background.
- Refresh the authenticated app shell navigation.
- Restyle the dashboard task card, progress summary, resource list, roadmap, note editor, translation tool, notebook, settings, and auth form surfaces.
- Add lucide icons where useful for goals, actions, resources, notes, progress, and reminders.
- Preserve existing data flow, routes, API behavior, and copy.

## Design Requirements

- Background should feel light, modern, and learning-focused rather than flat beige.
- Primary actions use blue/cyan gradients or blue fills.
- Important learning states use badges, highlight panels, and icon containers.
- Cards should remain readable and compact, with 12-16px radii and consistent borders.
- Current roadmap stage must stand out more strongly than locked and completed stages.
- Forms should use the same field and button styling across pages.

## Verification

- Run lint/build checks available in the project.
- Start the Next dev server and inspect the refreshed UI if possible.
