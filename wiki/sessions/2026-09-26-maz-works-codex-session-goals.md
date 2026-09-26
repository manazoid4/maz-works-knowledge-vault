---
date: 2026-09-26
project: maz-works
agent: codex
status: completed
---
# Three complementary Codex session goals

## What I did
Read shared Maz Works context and checked live GitHub PR metadata, commits, changed-file lists and local worktree status. Latest visible Claude activity is PR #54 at dbd1666 (26 September 10:32 UTC). This is an activity snapshot, not access to Claude's live conversation.

PR #54 covers the audited LinkedIn introduction, posting-rule pointer, booking buttons, and narrower client-project wording. Its body says no site code changed, but its latest commit and file list include app/page.tsx, app/projects.ts, app/site.ts, app/credibility.css and tests. Use the actual diff scope when reserving work. PRs #51-53 shipped broader positioning, mailing-list signup and notifications. Older vault handovers lag this work. Private lead repository history records the HubSpot import as completed; direct CRM state was not inspected.

Source: https://github.com/manazoid4/mazos-site/pull/54
Source: https://github.com/manazoid4/mazos-site/pull/53
Source: https://github.com/manazoid4/mazos-site/pull/52

## Decisions made
Keep proposed Codex work in separate planning documents. Reserve site code, LinkedIn drafts, posting rules, booking integration, mailing list, CRM and lead records for the other agent. Do not touch existing dirty worktrees or shared STATUS.md. Recheck ownership before later implementation. No public claims of paid customers or measured outcomes without current evidence; shared sources contradict one another here.

## Goal 1: Be ready to turn an enquiry into a clear next step
Together, rehearse a 15-minute discovery call: I play a business owner; Maz answers in his own words. Turn the useful answers into a one-page call guide, five discovery questions and responses to three common objections. Use fictional scenarios without copying private leads. Finish when Maz can identify the problem, fit, missing information and a specific next step without promising unverified results. Suggested session allocation: 20 minutes.

## Goal 2: Make one paid job straightforward to scope and deliver
Use the existing Quick Win offer as the initial example. Draft a reusable scope and delivery sheet: exact problem, included change, exclusions, access required, acceptance check, revision limit and handover. Confirm any payment/timing language against current terms before customer use. Walk through one fictional booking-link repair from enquiry to completion. Finish with a filled example plus reusable blank template. Suggested allocation: 25 minutes. No changes to public pricing or website copy.

## Goal 3: Know which work is worth taking on
Build a small planning worksheet for sales time, delivery hours, revisions, direct costs and remaining cash per hour before overhead/tax. Start with existing offer prices and explicitly hypothetical effort; replace assumptions with Maz's estimates. Include gift costs only where applicable, after payment. Work through one normal job and one scope-creep scenario, then set an initial weekly capacity and review point together. Finish when Maz can explain which job fits his capacity and what would make him re-scope or decline. Suggested allocation: 15 minutes. No new CRM or live pipeline mutation.

## Files changed
Only this session/plan document and an identical mirror at Local Knowledge/projects/maz-works/2026-09-26-codex-session-goals.md.

## Next steps
Start with Goal 1 in chat, then use that fictional opportunity for Goals 2 and 3. These are proposals; no goal was activated and no outreach or product implementation was performed. Unified Memory rejected both maz-works and mazworks-site as unknown_project, so no session ID exists to close. Used vault filesystem fallback because obsidian-cli is unavailable. Preserve unrelated vault changes; stage only this run's two files.

## Founder screenshot clarification
The user supplied a screenshot of the active Claude session confirming ownership of booking buttons, narrower Scrap Finance Partners wording, rules derived from an email, and HubSpot emails. Treat all of those as reserved. The proposed call rehearsal, internal scope template and capacity worksheet remain separate. The Local Knowledge mirror is intentionally Git-ignored; retain it locally and commit only the wiki session note to the vault remote.

## Revised direction: client acquisition
Founder clarified that HubSpot already manages leads, emails and calls. This replaces the earlier call-practice/delivery/economics recommendation with three acquisition goals:
1. Find and rank a small batch of prospects with a current, evidenced problem matching an existing offer. Check existing HubSpot records for duplicates once access is verified. Output: ten researched candidates and three priorities; keep identifiable data private.
2. Prepare a specific reason for each priority prospect to talk: verified observation, useful fix, bounded offer and a short call opener or demonstration brief. Keep these as separate drafts; the other agent retains HubSpot email and site/LinkedIn ownership. Output: three reviewed prospect briefs, no messages sent.
3. Define a two-week acquisition experiment around founder capacity, recording attempts, replies, qualified conversations, booked calls and paid work in the existing HubSpot workflow. Review results and adjust one variable at a time. Output: a weekly activity plan and review criteria; no CRM configuration changes while another agent owns that work.
Plugin directory verified HubSpot is available but not installed in this Codex context. Suggested its installation/connection; no live CRM access was claimed. No additional sales tooling is needed for this planning stage. Begin with goal 1; CRM-dependent checks wait for verified access.

## HubSpot connector setup
User created a HubSpot MCP connector and authorised local setup. Added its public client ID and fixed callback URL/port to the existing hubspot OAuth configuration in ~/.codex/config.toml after a timestamped backup; parsed before/after comparison verified unrelated settings unchanged. No secret was written into config or vault. Retired only the previous setup-pending login process holding port 54321. A real Codex login now generates the HubSpot authorisation URL successfully. Authentication and CRM access are still unverified; user consent is pending. No browser surfaces were available on the PC. The user is on Android, so the loopback callback cannot reach the PC directly from the phone. Continue the OAuth handoff, then verify token exchange (including any client-secret requirement) and a read-only MCP call before claiming connection success.

## Durable Android OAuth handoff
Native Codex login expired before the callback could be relayed from Android. HubSpot authorization metadata requires client_secret_post; native configuration exposes client ID but no documented secret setting. Created local ~/.codex/hubspot-auth/auth.ps1 with Start/Complete/Headers/Status operations, PKCE S256, exact callback and state validation, serialized token refresh, pinned HTTPS token endpoint and no redirects. Client secret and pending verifier are Windows DPAPI-encrypted via CLIXML in an ACL-restricted folder; credentials are excluded from this note and all project repositories. Switched only the HubSpot config to the documented http_headers_helper, with a config backup and parsed equality check for unrelated settings. Verified PowerShell syntax, wrong-state rejection, pending state surviving separate processes and rejection when no access token exists. Fresh user approval is still required; token exchange, refresh and actual MCP access remain unverified. Helper source is local only and not copied into the public vault. Next: consume the new callback through auth.ps1 Complete, then initialize MCP and perform a read-only identity call without logging tokens.

## HubSpot connection verified
Completed the fresh OAuth code exchange through the persistent local helper. Access and refresh tokens are stored encrypted with Windows DPAPI; no tokens or callback codes are stored in this note. Verified the configured header helper supplies authentication successfully: remote HubSpot MCP initialize returned HubSpot MCP 1.0 with protocol 2025-03-26; tools/list returned 22 tools; tools/call get_user_details with TOOL_INFORMATION succeeded without an MCP error. No contacts, leads, emails or other CRM records were changed. Connection works through the local helper and direct MCP transport; this running chat's preloaded tool inventory does not automatically gain tools after a config edit. Future sessions can load the configured server; direct authenticated MCP requests are available locally now. Refresh code exists but has not yet been exercised against token expiry. Next: read-only acquisition pipeline review, preserving the other agent's ownership of HubSpot emails and website changes.
