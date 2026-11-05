# Notion dashboard inspection and delivery plan

5 November 2026. Inspection only; no Notion records, views, application states or runtime code changed. Owner clarified: approve quickly and execute through Telegram; Notion is the phone-friendly progress dashboard. This supersedes any proposal for Notion approval controls.

## What exists

[Job Hunter home](https://app.notion.com/p/4064c624d5cc81748409ee84ae128cda) contains only a link to [Hermes Job Hunter](https://app.notion.com/p/4064c624d5cc813fae29c52bd4316bfb). The database has eight views, including three mobile lists: Approve these, Needs me, Applied. Existing mobile views already show employer/location/status, so a replacement database would add unnecessary duplication.

Schema includes title, employer, location, URL, source, status, applied date, confirmation checkbox and notes. It has no structured blocker, next action, last sync, confirmed-attempt identifier, reply/interview date, or budget properties. A bounded sample of three Needs Attention records had empty notes; one fetched record had a blank page body. This is sample evidence, not an audit of all records.

Applied views combine Applied, Interview and Offer and have no explicit date sort or evidence filter. Sample includes historical records as well as a newer application. Current mirror uses bool(job.confirmation), not the newer confirmed-attempt ledger, so the checkbox must not be advertised as proof that the verified ledger was reconciled. No fresh total count was calculated.

## Highest-value correction

Local notion/review.py still tells users to set Status to Approved and supports Q-number overrides. notion/sync.py can transition a record following that change, but submission_safety.claim requires a fresh signature-bound Telegram grant. Therefore Notion approval instructions conflict with the current execution boundary and can create confusing states. Do not weaken the submission guard to match old instructions.

## Recommended phone layout

One narrow page, no columns or wide primary table:

1. **Today:** freshly synced confirmed applications, ready for Telegram review, replies/interviews, last successful sync time. Show unavailable/stale explicitly. Budget only after shared accounting is implemented; never hard-code remaining USD10 or infer it from the top-up.
2. **Open Telegram:** one prominent link to the existing bot https://t.me/Mzjbhuntbot. Existing bot controls handle review, approve and apply. This link opens the bot, not a specific job or an automatic command; do not promise a deep action link before the bot supports it.
3. **Progress:** compact chronological application list, newest first, with employer, role, actual stage, submission date and evidence availability. Separate attempted/uncertain from confirmed; link receipts where safely accessible rather than exposing local filesystem paths or private browser data.
4. **Blockers:** distinguish Needs you (login, missing fact, human verification) from Bot needs fixing (unsupported form, extraction/validation failures). Each row states the reason, next action and who acts. Send actionable prompts to Telegram; do not demand the same answer twice. Do not portray all technical failures as user tasks.
5. **Replies and interviews:** date and next action when verified or entered by the owner. Implement alongside the planned inbox tracking; do not create empty decorative metrics now. Retain the full database as an archive below these sections.

## Smallest implementation sequence

A. Correct approval semantics first. Trace Notion status ingestion and override callers/tests. Stop Notion Approved edits from authorizing/transiting application execution; preserve safe non-approval status proposals and existing notes. Replace generated approval instructions with Telegram guidance. Test that Notion edits cannot create approvals or submit claims and that Telegram snapshot approvals still work. Do not silently erase existing edited statuses or notes; reconcile conflicting records explicitly.

B. Extend the existing sync narrowly: structured blocker category, human-readable next action, last successful sync and verified outcome/evidence metadata. Add only fields supported by real local data. Keep manual Notes separate from bot-managed fields; preserve row identity and database IDs. Verify two representative blocked records and confirmed vs uncertain application fixtures. No job facts or approval grants are inferred by a language model.

C. Update home and existing list views: rename Approve these to Ready in Telegram (informational), add the Telegram link, show useful blocker metadata, and sort progress newest first. Preserve existing records and archive access. Avoid a second Notion approval workflow. Verify filters and properties through Notion and inspect phone-width rendering; actual phone usability still requires owner feedback.

D. Add replies/interview dates with the existing application-tracking feature, and cost summary with the shared lifetime ledger. Validate freshness after a failed sync and restart. Dashboard work should use deterministic code and existing Notion APIs, with no paid-model dependency.

## Verification boundaries

Read the actual Notion home/database/view configurations, sampled six rows and fetched one blocked page. Inspected local notion/sync.py, notion/review.py and submission_safety.py. Did not visually inspect the phone app, run tests, audit every row, send Telegram messages, change Notion or submit applications. Notion page fetch timestamps vary; no claim that every record is current. The connector supports views and page edits, so those layout changes are feasible after sync semantics are corrected.
