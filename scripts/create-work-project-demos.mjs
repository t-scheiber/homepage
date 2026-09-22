import fs from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
if (!process.argv[2])
  throw new Error("Pass a local output directory for the fictional demo HTML.");
const output = pathToFileURL(resolve(process.argv[2]) + "/");
fs.mkdirSync(output, { recursive: true });
const pill = (text, tone = "green") =>
  `<span class="pill ${tone}">${text}</span>`;
const header = (eyebrow, title, description, tag) =>
  `<div class="heading"><div><small>${eyebrow}</small><h1>${title}</h1><p>${description}</p></div>${pill(tag, "neutral")}</div>`;
const card = (title, content) =>
  `<section class="card"><h2>${title}</h2>${content}</section>`;
const row = (label, value) =>
  `<div class="detail"><span>${label}</span><strong>${value}</strong></div>`;
const step = (n, title, description, done = true) =>
  `<div class="step"><b class="${done ? "done" : ""}">${done ? "✓" : n}</b><div><strong>${title}</strong><p>${description}</p></div></div>`;
const screens = {
  training: {
    label: "Learning",
    nav: ["My learning", "Course library", "Practice", "Help"],
    body:
      header(
        "YOUR LEARNING SPACE",
        "Build confidence, one step at a time.",
        "Short lessons. Practical exercises. A chance to try it yourself.",
        "Demo learner",
      ) +
      `<div class="columns wide"><div>${card("Git essentials", `<div style="background:#233b44;border-radius:7px;color:#fff;padding:24px;margin-bottom:18px"><small style="color:#b6dacb">LESSON 02 / BRANCHES</small><h2 style="font-size:24px;margin:16px 0 12px;color:#fff">A place to try your changes.</h2><p style="color:#b8ced3">Create a branch. Make a small change.<br>Bring it back for review.</p><div style="display:flex;align-items:center;gap:18px;margin-top:28px"><span style="background:#c4efdc;color:#28453a;border-radius:50%;width:36px;height:36px;text-align:center;padding:11px;font-size:12px">▶</span><span style="font-size:10px;color:#c5d5db">Illustrative video lesson · 04:30</span></div></div><h2 style="font-size:12px;margin:18px 0 10px">Try it yourself</h2><p style="font-size:11px">Create a branch called <strong>practice/welcome</strong> in a sample repository and change its README.</p><div class="token" style="font-family:monospace;font-size:11px;margin-top:18px">git switch -c practice/welcome</div><div class="button">Continue to the quiz →</div>`)}</div>${card("Course outline", `<p style="font-size:10px;margin-bottom:10px">Demo progress · 1 of 4 lessons</p><div style="height:5px;background:#edf0f5;border-radius:4px"><div style="width:25%;height:5px;background:#80b5a1;border-radius:4px"></div></div>` + step(1, "Getting started", "Your first repository") + step(2, "Working with branches", "Current lesson", false) + step(3, "Reviewing a change", "Practice and a short quiz", false) + step(4, "Your first deployment", "Apply what you learned", false) + `<div class="hint">Practice uses a fictional project. No company systems required.</div>`)}</div>`,
  },
  platform: {
    label: "Development",
    nav: ["Overview", "Repositories", "Deployments", "Team access"],
    body:
      header(
        "DEVELOPER WORKSPACE",
        "A clear path from code to deploy.",
        "An illustrative overview of a connected Git and deployment workflow.",
        "Demo workspace",
      ) +
      `<div class="event"><div class="provider-icon" style="font-family:monospace;font-size:16px;padding-top:10px">&lt;/&gt;</div><div><small>SAMPLE REPOSITORY</small><h2>demo-team / welcome-app</h2><p>A fictional application for learning the workflow.</p></div>${pill("Private", "neutral")}</div>` +
      `<div class="columns">${card("Change review", row("Change", "Update the welcome page") + row("Branch", "feature/welcome") + row("Review", pill("Approved")) + row("Build checks", pill("Passed")) + `<div class="notice" style="margin-top:10px"><b>Ready for the next step</b><p>Sample checks passed for this fictional change.</p></div>`)}${card("Application deployment", step(1, "Source received", "Reviewed change selected") + step(2, "Container built", "Build completed") + step(3, "Health check passed", "Application responds") + `<div class="notice"><b>Demo app running</b><p>Environment: sample / preview</p></div>`)}</div><div class="identity"><div class="avatar">DT</div><div><strong>Demo team</strong><p>Access managed through team membership</p></div>${pill("Conceptual overview", "neutral")}</div>`,
  },
  equipment: {
    label: "Equipment",
    nav: ["Overview", "Requests", "Devices", "Returns"],
    body:
      header(
        "EQUIPMENT OPERATIONS",
        "Ready for the first day.",
        "A clear overview of requests and the next step for each handover.",
        "Demo workspace",
      ) +
      `<div class="stats"><div><small>Open requests</small><b>04</b><p>Fictional sample</p></div><div><small>Ready to ship</small><b>02</b><p>Device selected</p></div><div><small>Needs attention</small><b>01</b><p>Address review</p></div></div>` +
      card(
        "Equipment requests",
        `<table><thead><tr><th>Request</th><th>Equipment</th><th>Next step</th><th>Status</th></tr></thead><tbody><tr><td><strong>Alex Morgan</strong><small>REQ-001 · New starter</small></td><td>14-inch laptop</td><td>Prepare shipment</td><td>${pill("Ready to ship")}</td></tr><tr><td><strong>Jamie Lee</strong><small>REQ-002 · New starter</small></td><td>13-inch laptop</td><td>Review address</td><td>${pill("Needs review", "amber")}</td></tr><tr><td><strong>Casey Taylor</strong><small>REQ-003 · Replacement</small></td><td>14-inch laptop</td><td>Prepare shipment</td><td>${pill("Ready to ship")}</td></tr><tr><td><strong>Robin Ellis</strong><small>REQ-004 · Return</small></td><td>27-inch monitor</td><td>Confirm receipt</td><td>${pill("In transit", "blue")}</td></tr></tbody></table>`,
      ) +
      `<div class="notice"><b>Address review</b><p>Check the sample address before creating a shipping label.</p><span>Review request →</span></div>`,
  },
  meetings: {
    label: "Meetings",
    nav: ["Overview", "Schedule", "Materials", "Recordings"],
    body:
      header(
        "MEETING WORKSPACE",
        "Everything for the next update.",
        "Schedule, materials and follow-up in one place.",
        "Demo workspace",
      ) +
      `<div class="event"><div class="date"><b>18</b><span>OCT</span></div><div><small>UPCOMING MEETING</small><h2>Team update</h2><p>Monday, 18 October 2027 · 10:00–10:45</p></div>${pill("Scheduled")}</div>` +
      `<div class="columns">${card("Agenda", `<div class="agenda"><b>01</b><div><strong>Welcome & updates</strong><p>10 minutes · Host</p></div></div><div class="agenda"><b>02</b><div><strong>Project walkthrough</strong><p>20 minutes · Presenter</p></div></div><div class="agenda"><b>03</b><div><strong>Open questions</strong><p>15 minutes · Everyone</p></div></div><div class="text-link">Open demo materials →</div>`)}${card("Preparation", step(1, "Calendar invitations", "Recurring meeting series prepared") + step(2, "Presentation materials", "Template ready for the organisers") + step(3, "Meeting reminder", "Scheduled before the session", false) + step(4, "Recording", "Available after the meeting", false))}</div>`,
  },
  access: {
    label: "Access",
    nav: ["New request", "My requests", "Help"],
    body:
      header(
        "EXTERNAL COLLABORATION",
        "Share the right access.",
        "Review the request before it goes to an approver.",
        "Demo workspace",
      ) +
      `<div class="progress"><span>✓ Select resource</span><span>✓ Add partner</span><strong>3 Review request</strong></div><div class="columns wide">${card("Request details", row("Resource", "Sample project / Shared documents") + row("External partner", "Alex Morgan") + row("Partner email", "alex@example.com") + row("Permission", "View only") + `<div class="reason"><small>BUSINESS REASON</small><p>Review the sample project brief with an external collaborator.</p></div><div class="button">Submit for approval →</div>`)}${card("What happens next", step(1, "Submit request", "The request is sent for review", false) + step(2, "Approval", "An approver reviews the access", false) + step(3, "Access ready", "The partner receives a notification", false) + `<div class="hint">Submitting a request does not grant access.</div>`)}</div>`,
  },
  connections: {
    label: "Connections",
    nav: ["My connections", "Getting started", "Help"],
    body:
      header(
        "INTEGRATION WORKSPACE",
        "Your tools, connected.",
        "Manage the connections used by your scripts and automations.",
        "Demo workspace",
      ) +
      `<div class="identity"><div class="avatar">AM</div><div><strong>Alex Morgan</strong><p>Signed in with organisation SSO</p></div>${pill("Demo account", "neutral")}</div>` +
      card(
        "Connected provider",
        `<div class="provider"><div class="provider-icon">N</div><div><strong>Notion</strong><p>Sample workspace</p></div>${pill("Connected")}</div><div class="token"><small>ACCESS TOKEN</small><div><span>•••• •••• •••• •••• •••• ••••</span><span class="quiet-button">Hidden in demo</span></div></div>${row("Connection status", "Active")}${row("Expiry reminder", "Scheduled")}<div class="actions"><span class="text-link">Connection details →</span><span class="disconnect">Disconnect</span></div>`,
      ) +
      `<div class="notice"><b>You control the connection</b><p>Disconnect a provider when an automation no longer needs access.</p></div>`,
  },
};
const css = `*{box-sizing:border-box}body{margin:0;background:#edf1f5;font-family:Arial,Helvetica,sans-serif;color:#233344;font-size:14px}.app{display:flex;min-height:100vh}.side{width:185px;background:#182d38;color:#c7d7de;padding:30px 18px;flex-shrink:0}.brand{font-size:20px;font-weight:700;color:white;padding:0 12px;margin-bottom:40px;letter-spacing:-.7px}.brand i{font-style:normal;color:#b0e6cd}.side small{display:block;font-size:9px;letter-spacing:1.5px;color:#8fa5b0;margin:24px 12px 14px}.nav-item{padding:13px 14px;margin:5px 0;border-radius:7px;font-size:12px}.nav-item.active{background:#304c56;color:#d3f5e2}.side-bottom{margin:180px 12px 0;font-size:10px;line-height:1.8;color:#9cb2bf}.main{flex:1;min-width:0}.topbar{height:66px;padding:0 34px;border-bottom:1px solid #dee5ea;background:white;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#71818b}.demo{font-size:9px;font-weight:700;letter-spacing:1px;color:#526a64;background:#eaf3ef;border:1px solid #d7e5de;padding:7px 10px;border-radius:4px}.content{max-width:1090px;margin:0 auto;padding:36px 36px 22px}.heading{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:26px}small{font-size:9px;letter-spacing:1.15px;color:#6f848f}h1{font-size:30px;letter-spacing:-1.1px;margin:10px 0 10px;line-height:1.15;font-weight:600}h2{font-size:15px;font-weight:600;margin:0 0 20px}p{color:#72808b;line-height:1.5;margin:0;font-size:12px}.pill{display:inline-block;white-space:nowrap;border-radius:5px;padding:6px 9px;font-size:10px;font-weight:600}.green{background:#e3f4eb;color:#26734e}.amber{background:#fff1d9;color:#946619}.blue{background:#e9f0fc;color:#436ba3}.neutral{background:#eef1f4;color:#667b88;border:1px solid #dae1e7}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:22px}.stats>div{border:1px solid #dfe5e9;background:white;border-radius:9px;padding:19px 22px}.stats small{letter-spacing:0;font-size:11px}.stats b{display:block;font-size:30px;font-weight:500;margin:10px 0 4px}.stats p{font-size:10px}.card{background:#fff;border:1px solid #dfe5e9;border-radius:9px;padding:23px;margin-bottom:20px}table{width:100%;border-collapse:collapse;text-align:left;font-size:11px}th{font-size:9px;letter-spacing:.5px;color:#7b8b97;font-weight:500;padding:0 10px 14px}td{border-top:1px solid #edf0f3;padding:17px 10px}td strong{font-size:11px}td small{display:block;font-size:9px;letter-spacing:0;margin-top:6px}.notice{border:1px solid #dbe5e0;background:#e9f1ed;border-radius:8px;padding:16px 20px;position:relative}.notice b{font-size:11px}.notice p{font-size:10px;margin-top:5px}.notice>span{position:absolute;right:20px;top:26px;font-size:10px;color:#366e59}.event{display:flex;align-items:center;gap:22px;background:#fff;border:1px solid #dfe5e9;padding:23px;border-radius:9px;margin-bottom:22px}.event h2{font-size:22px;margin:8px 0}.event>.pill{margin-left:auto}.date{border-radius:8px;background:#e9eafa;color:#6b6294;padding:15px 20px;text-align:center}.date b{display:block;font-size:28px}.date span{font-size:9px}.columns{display:grid;grid-template-columns:1fr 1fr;gap:20px}.columns.wide{grid-template-columns:1.2fr 1fr}.agenda{display:flex;gap:15px;align-items:center;padding:19px 0;border-top:1px solid #edf0f3}.agenda>b{color:#8a849f;font-size:11px}.agenda strong{font-size:12px}.agenda p{font-size:10px;margin-top:6px}.text-link{font-size:10px;color:#416d60;padding-top:12px}.step{display:flex;gap:12px;margin:22px 0}.step>b{background:#f0f3f6;color:#768a98;border-radius:50%;width:23px;height:23px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px}.step>b.done{background:#e4f3e9;color:#3d8862}.step strong{font-size:11px}.step p{font-size:10px;margin-top:5px}.progress{display:flex;gap:30px;margin:4px 0 28px;font-size:11px;color:#799288}.progress strong{color:#344e5c}.detail{display:flex;justify-content:space-between;gap:24px;border-top:1px solid #edf0f3;padding:18px 0;font-size:11px}.detail>span{color:#7b8890}.detail strong{font-weight:500;text-align:right}.reason{background:#f5f7f9;border-radius:7px;padding:16px;margin:8px 0 22px}.reason p{margin-top:9px;font-size:11px}.button{background:#284e43;color:white;padding:14px 18px;font-size:11px;border-radius:6px;display:inline-block}.hint{font-size:10px;line-height:1.6;background:#f4f2eb;padding:15px;border-radius:6px;color:#8c7955}.identity{display:flex;align-items:center;gap:15px;margin:0 0 22px;padding:16px 22px;border:1px solid #dfe5e9;border-radius:9px;background:white}.avatar{background:#e6edf6;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#6685a3}.identity strong{font-size:12px}.identity p{font-size:10px;margin-top:5px}.identity>.pill{margin-left:auto}.provider{display:flex;align-items:center;gap:15px;padding:0 0 22px}.provider p{font-size:10px;margin-top:5px}.provider-icon{width:38px;height:38px;border:1px solid #ddd;border-radius:7px;text-align:center;padding:7px;font-family:Georgia;font-size:23px;font-weight:bold}.provider>.pill{margin-left:auto}.token{padding:18px;background:#f3f6f8;border-radius:7px;margin-bottom:20px}.token>div{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:#8293a0}.quiet-button{font-size:9px;border:1px solid #d8e0e6;padding:7px 10px;border-radius:4px}.actions{display:flex;justify-content:space-between;align-items:center;padding-top:4px}.disconnect{font-size:10px;color:#ad7474;border:1px solid #eadbdb;border-radius:5px;padding:8px 12px}.footnote{font-size:9px;color:#81909a;margin-top:6px;text-align:center;letter-spacing:.25px}@media(max-width:1000px){.side{width:150px}.content{padding:28px 24px}.heading h1{font-size:25px}.heading>.pill{display:none}.notice>span{display:none}td{padding:14px 6px}.card{padding:20px}.columns{gap:16px}}`;
for (const [key, s] of Object.entries(screens)) {
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${s.label} · Recreated portfolio demo</title><style>${css}</style><div class="app"><aside class="side"><div class="brand">work<i>space.</i></div><small>${s.label.toUpperCase()}</small>${s.nav.map((n, i) => `<div class="nav-item ${i === 0 ? "active" : ""}">${n}</div>`).join("")}<div class="side-bottom">Portfolio demonstration<br>Fictional organisation<br>Sample data only</div></aside><main class="main"><header class="topbar"><span>Workspace / ${s.label}</span><span class="demo">RECREATED DEMO</span></header><div class="content">${s.body}<p class="footnote">Illustrative recreation · Fictional data · No live company systems</p></div></main></div></html>`;
  fs.writeFileSync(new URL(`${key}.html`, output), html);
}
