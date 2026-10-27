export type DemoId =
  | "equipment"
  | "support"
  | "lifecycle"
  | "scheduler"
  | "access"
  | "connections"
  | "training"
  | "platform";

export interface WorkProject {
  id: DemoId;
  category: string;
  title: string;
  shortTitle: string;
  summary: string;
  contribution: string;
  decision: string;
  scenario: string;
  skills: string[];
}

export const workProjects: WorkProject[] = [
  {
    id: "equipment",
    category: "Workflow automation",
    title: "Equipment, without the loose ends.",
    shortTitle: "Equipment handover",
    summary:
      "Equipment requests connect employee details, device choices, shipping and returns. The interesting part is handling incomplete data and uncertain delivery responses.",
    contribution:
      "My work includes the equipment forms, shipping actions, address validation, return tracking and clearer explanations when a request is blocked.",
    decision:
      "A missing address should stop a shipment. An uncertain carrier response should trigger reconciliation, rather than another potentially billable label.",
    scenario:
      "Fix an incomplete address, prepare a sample label, then explore an uncertain carrier response.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "API integrations"],
  },
  {
    id: "support",
    category: "AI-assisted support",
    title: "A useful draft still needs a source.",
    shortTitle: "AI support drafts",
    summary:
      "An osTicket extension helps staff draft replies using maintained knowledge and relevant fixes from resolved tickets. Staff remain responsible for the reply.",
    contribution:
      "My work includes the AI reply interface, knowledge editing, learning from resolved tickets, source validation and visibility into skipped or failed extraction.",
    decision:
      "A learned fix is a prior example, not policy. If its source changes or reopens, it should stop informing new drafts. A suggested reply is never sent automatically.",
    scenario:
      "Compare an active source with a reopened one, then review and edit a sample reply.",
    skills: ["PHP", "osTicket", "LLM integration", "Evidence validation"],
  },
  {
    id: "lifecycle",
    category: "Identity automation",
    title: "Lifecycle changes are rarely all-or-nothing.",
    shortTitle: "Employee lifecycle",
    summary:
      "Employee events coordinate inventory records, equipment workflows and directory or mailbox actions across several systems.",
    contribution:
      "My work includes onboarding and reactivation handling, equipment-return invitations, preserving preparation work and surfacing incomplete directory operations.",
    decision:
      "An accepted request is not proof that every downstream action succeeded. Preserve independent progress and make partial failures visible for follow-up.",
    scenario:
      "Run a return-from-leave scenario with a simulated directory failure, then retry it.",
    skills: ["Node.js", "Microsoft Graph", "HiBob", "Snipe-IT"],
  },
  {
    id: "scheduler",
    category: "Internal applications",
    title: "The meeting and the room belong together.",
    shortTitle: "Meeting scheduling",
    summary:
      "A scheduling application brings directory lookup, Teams meetings, room availability and recurring invitations into one flow.",
    contribution:
      "My work includes the scheduler and its integrations, plus reconciliation that adds new department members to future meetings.",
    decision:
      "Room availability depends on the chosen time. Recurring invites also need to account for people who join after the series was created.",
    scenario:
      "Find a room for a sample meeting. Change the time to expose a booking conflict.",
    skills: ["Next.js", "TypeScript", "Microsoft Graph", "PostgreSQL"],
  },
  {
    id: "access",
    category: "Identity & access",
    title: "A request is not an access grant.",
    shortTitle: "Guest access",
    summary:
      "Employees can request access to shared resources for an external partner, with an approval step before access is granted.",
    contribution:
      "My work includes resource discovery, folder-path resolution, reliable guest notification links and avoiding duplicate invitations.",
    decision:
      "Keep submitted, approved and rejected states distinct. A successful form submission should never imply that a guest already has access.",
    scenario:
      "Submit a fictional partner request, then compare the approval and rejection paths.",
    skills: ["Next.js", "Entra ID", "Microsoft Graph", "Power Automate"],
  },
  {
    id: "connections",
    category: "Integration engineering",
    title: "Connect a tool. Keep control of its access.",
    shortTitle: "OAuth connections",
    summary:
      "An OAuth connection hub lets employees connect providers for scripts and automations, manage connections and revoke access.",
    contribution:
      "My work includes encrypted token storage, safe rendering of provider responses, token migration tests and service maintenance.",
    decision:
      "Connection state must be understandable without displaying credentials. Revoking a connection should clearly stop the work that depends on it.",
    scenario:
      "Connect a fictional workspace, run a sample sync and revoke the connection.",
    skills: ["OAuth 2.0", "TypeScript", "PostgreSQL", "Token handling"],
  },
  {
    id: "training",
    category: "Training & enablement",
    title: "Learn the workflow by doing it.",
    shortTitle: "Practical Git training",
    summary:
      "A configurable learning platform supports employee training with interactive modules, quizzes and practical Git and deployment exercises.",
    contribution:
      "My work includes the Git learning path, practical exercises, course videos and voiceovers, visual practice aids, configuration validation and browser tests.",
    decision:
      "Teach the next useful action, explain why an answer is wrong, and check the actual learner path. Completing a slide is not the same as understanding a workflow.",
    scenario:
      "Work through a short original Git exercise with feedback on each answer.",
    skills: ["Vue", "TypeScript", "Learning design", "Playwright"],
  },
  {
    id: "platform",
    category: "Developer platforms",
    title: "A deployment path people can inspect.",
    shortTitle: "Git & deployment pilot",
    summary:
      "A Forgejo and Coolify pilot provides a route from version control and review to application deployment on existing hardware. It is not yet in broad use.",
    contribution:
      "My work includes team access, deployment workflows, automated review, webhook reliability, backups and recovery documentation.",
    decision:
      "Make the gate visible: passing checks and a review are separate from deployment. The demo illustrates that distinction without reproducing internal infrastructure.",
    scenario:
      "Run failing checks, repair the sample, and approve a demo deployment.",
    skills: ["Forgejo", "Coolify", "CI/CD", "Docker"],
  },
];

export const furtherProjects = [
  {
    id: "meetings",
    category: "Internal applications",
    title: "Meeting operations",
    description:
      "Schedules, agendas, presentation materials and recordings in one meeting hub.",
    contribution:
      "Recurring invitations, schedule management, recording publication and verification.",
    skills: "React · Microsoft Graph · Scheduled jobs",
  },
  {
    id: "backup",
    category: "Platform tooling",
    title: "Workspace backup & restore",
    description:
      "Incremental workspace backups with version history and a restore-by-URL interface.",
    contribution:
      "Restore tooling, the local recovery UI, backup scheduling and an operations runbook.",
    skills: "Python · Notion API · Recovery tooling",
  },
  {
    id: "inventory",
    category: "Identity & devices",
    title: "Laptop inventory audit",
    description:
      "Reconcile inventory and device-management signals to find stale or mismatched records.",
    contribution:
      "Finding rules, stale-record cleanup proposals and an approval step before messages or changes.",
    skills: "TypeScript · Snipe-IT · Intune · Slack",
  },
  {
    id: "app-deployment",
    category: "Platform tooling",
    title: "Application deployment tooling",
    description:
      "Configuration-driven deployment for Windows applications, macOS packages, setup scripts and remediations.",
    contribution:
      "Verified macOS package uploads, platform-compatible assignments and shared deployment tooling.",
    skills: "Node.js · Intune · PowerShell · GitLab CI",
  },
  {
    id: "group-sync",
    category: "Identity & devices",
    title: "Directory group reconciliation",
    description:
      "Keep a directory group aligned with an approved list in a workspace database.",
    contribution:
      "Dry-run planning, membership validation, limits on removals and read-back verification.",
    skills: "Python · Notion API · Microsoft Graph",
  },
  {
    id: "provisioning",
    category: "Identity & devices",
    title: "Storage account provisioning",
    description:
      "Synchronize approved directory identities with network storage accounts and groups.",
    contribution:
      "Identity synchronization scripts, configuration guidance and credential-handoff integration.",
    skills: "Python · Entra ID · Synology",
  },
  {
    id: "handoff",
    category: "Identity & devices",
    title: "Time-limited credential handoff",
    description:
      "Give one employee temporary access to a credential, with an expiry and cleanup workflow.",
    contribution:
      "Integration for handing storage credentials to the intended employee through the sharing service.",
    skills: "1Password · Service integrations",
  },
  {
    id: "analytics",
    category: "Internal applications",
    title: "AI-tool usage reporting",
    description:
      "Bring usage information from several providers into scheduled reports with clearly different metric types.",
    contribution:
      "Provider connectors, reporting integration and repeatable imports that preserve other tools' history.",
    skills: "Python · Provider APIs · Notion · Cloud Run",
  },
];
