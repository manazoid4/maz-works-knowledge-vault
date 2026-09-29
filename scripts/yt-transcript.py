#!/usr/bin/env python3
"""Fetch a YouTube video's metadata and full timestamped transcript.

Usage: python3 scripts/yt-transcript.py <youtube-url-or-id> [out.md]
       python3 scripts/yt-transcript.py --from-text <transcript.txt> --duration <seconds> [out.md]
         (fallback when YouTube blocks this machine: plain text from Exa web_fetch;
          timestamps are ESTIMATED from word position and marked ~mm:ss)
Needs: pip install youtube-transcript-api  (yt-dlp optional, for description/date).
Writes a Markdown transcript with [mm:ss] timestamps for .raw/transcripts/.
Prints a clear error if no transcript is available; never invents text.
"""
import json, re, sys, subprocess, urllib.parse, urllib.request

def video_id(s):
    m = re.search(r'(?:v=|youtu\.be/|shorts/|embed/|live/)([A-Za-z0-9_-]{11})', s)
    return m.group(1) if m else (s if re.fullmatch(r'[A-Za-z0-9_-]{11}', s) else None)

def meta(vid):
    url = f'https://www.youtube.com/watch?v={vid}'
    out = {'url': url, 'title': 'Unknown', 'channel': 'Unknown', 'upload_date': 'Unknown'}
    try:
        o = json.load(urllib.request.urlopen('https://www.youtube.com/oembed?format=json&url=' + urllib.parse.quote(url), timeout=20))
        out.update(title=o.get('title', 'Unknown'), channel=o.get('author_name', 'Unknown'))
    except Exception as e:
        out['meta_error'] = str(e)[:120]
    try:
        j = json.loads(subprocess.run(['yt-dlp', '-j', '--skip-download', url], capture_output=True, text=True, timeout=60).stdout or '{}')
        if j: out.update(title=j.get('title', out['title']), channel=j.get('channel', out['channel']), upload_date=j.get('upload_date', 'Unknown'), duration=j.get('duration'))
    except Exception:
        pass
    return out

def ts(sec):
    sec = int(sec); h, m, s = sec // 3600, sec % 3600 // 60, sec % 60
    return f'{h}:{m:02d}:{s:02d}' if h else f'{m:02d}:{s:02d}'

def transcript(vid):
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    try:
        tl = api.list(vid)
        try: t = tl.find_manually_created_transcript(['en', 'en-GB', 'en-US'])
        except Exception: t = tl.find_transcript(['en', 'en-GB', 'en-US'])
        kind = 'manual' if not t.is_generated else 'auto-generated'
        return [(s.start, s.text) for s in t.fetch()], kind
    except Exception as e:
        raise SystemExit(f'NO TRANSCRIPT for {vid}: {type(e).__name__}: {str(e)[:200]}')

def from_text():
    a = sys.argv; f = a[a.index('--from-text') + 1]; dur = float(a[a.index('--duration') + 1])
    out = next((x for x in a[1:] if x.endswith('.md') and x != f), None)
    words = open(f).read().split(); n = max(len(words), 1); lines = ['_Timestamps estimated from word position (~). Check against the video before quoting._', '']
    for i in range(0, len(words), 90):  # ~30s of speech per paragraph
        lines.append(f'[~{ts(dur * i / n)}] ' + ' '.join(words[i:i + 90]))
    md = '\n\n'.join(lines) + '\n'
    if out: open(out, 'w').write(md); print(f'wrote {out}: {n} words, estimated timestamps')
    else: print(md)

def main():
    if '--from-text' in sys.argv: return from_text()
    if len(sys.argv) < 2: raise SystemExit(__doc__)
    vid = video_id(sys.argv[1]) or sys.exit('Could not read a video id from ' + sys.argv[1])
    m = meta(vid); segs, kind = transcript(vid)
    lines = [f'# {m["title"]}', '', f'- Channel: {m["channel"]}', f'- URL: {m["url"]}', f'- Uploaded: {m["upload_date"]}',
             f'- Transcript: {kind}, {len(segs)} segments, ends at {ts(segs[-1][0]) if segs else "n/a"}', '']
    block, start = [], None
    for t, text in segs:  # group into ~30s paragraphs so timestamps stay useful
        if start is None: start = t
        block.append(text.replace('\n', ' '))
        if t - start >= 30:
            lines.append(f'[{ts(start)}] ' + ' '.join(block)); block, start = [], None
    if block: lines.append(f'[{ts(start)}] ' + ' '.join(block))
    md = '\n\n'.join(lines) + '\n'
    if len(sys.argv) > 2: open(sys.argv[2], 'w').write(md); print(f'wrote {sys.argv[2]}: {m["title"]} / {m["channel"]} / {len(segs)} segments')
    else: print(md)

main()
