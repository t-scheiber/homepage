export const workProjects = [
  {
    id: "training",
    number: "01",
    category: "Training & enablement",
    title: "Git training and a learning platform.",
    summary:
      "An optional online course that takes colleagues through Git and application deployment, with guided exercises, videos and knowledge checks.",
    contribution:
      "I worked on the learner experience and practical Git training, including course videos, voiceovers, visual practice aids and deployment guidance.",
    skills: ["Vue", "TypeScript", "Learning design", "Video & audio"],
    image: "/files/work-projects/training.png",
    alt: "Recreated learning platform with a fictional Git course, lesson outline and practice exercise.",
    caption:
      "Learning view. Lesson text, progress and course structure are illustrative.",
    accent: "lilac",
  },
  {
    id: "platform",
    number: "02",
    category: "Developer platforms",
    title: "An internal Git and deployment pilot.",
    summary:
      "A Forgejo and Coolify pilot on existing company hardware. Colleagues can use it to manage code, review changes and deploy their own applications. It is not yet in broad use.",
    contribution:
      "My work includes team access, deployment workflows, automated review, webhook reliability, backups and recovery documentation across Forgejo and Coolify.",
    skills: ["Forgejo", "Coolify", "CI/CD", "Docker", "Identity integration"],
    image: "/files/work-projects/platform.png",
    alt: "Recreated overview of a fictional repository, review checks and application deployment.",
    caption:
      "Conceptual platform overview. Repository, checks and deployment data are fictional.",
    accent: "blue",
  },
  {
    id: "equipment",
    number: "03",
    category: "Workflow automation",
    title: "Equipment, from request to return.",
    summary:
      "An internal tool for coordinating employee equipment requests, device selection, shipping and returns. It brings the steps of an equipment handover into one workflow.",
    contribution:
      "My work includes the equipment form, shipping actions and address validation, making it clearer when a request needs attention before a label is created.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "API integrations"],
    image: "/files/work-projects/equipment.png",
    alt: "Recreated equipment workflow with fictional requests, device choices and shipping statuses.",
    caption:
      "Equipment request overview. All people, devices and statuses are fictional.",
    accent: "mint",
  },
  {
    id: "meetings",
    number: "04",
    category: "Internal applications",
    title: "Meeting schedules, materials and recordings.",
    summary:
      "A meeting hub that connects schedules, agendas, presentation materials, reminders and recordings. Organisers can manage the meeting cycle in one place.",
    contribution:
      "My work includes recurring calendar invitations, schedule management and the automation around meeting materials and recordings.",
    skills: ["React", "TypeScript", "Microsoft Graph", "Scheduled jobs"],
    image: "/files/work-projects/meetings.png",
    alt: "Recreated meeting hub showing a fictional team update, agenda and preparation checklist.",
    caption:
      "Meeting preparation view. The meeting, dates and agenda are fictional.",
    accent: "lilac",
  },
  {
    id: "access",
    number: "05",
    category: "Identity & access",
    title: "External access, with an approval step.",
    summary:
      "A self-service app for requesting access to shared files and folders. Employees select the resource, explain the need and submit it for approval before guest access is granted.",
    contribution:
      "My work includes resource selection, resolving folder paths and guest notification links, with a clear distinction between submitting a request and granting access.",
    skills: ["Next.js", "Entra ID", "Microsoft Graph", "Power Automate"],
    image: "/files/work-projects/access.png",
    alt: "Recreated guest-access request for a fictional project folder, awaiting approval.",
    caption:
      "Access request review. The partner, email address and resource are fictional.",
    accent: "peach",
  },
  {
    id: "connections",
    number: "06",
    category: "Integration engineering",
    title: "OAuth connections for internal tools.",
    summary:
      "An OAuth connection hub where employees sign in, connect a provider and manage the access used by their scripts and automations. Connections can be revoked and expiry reminders sent.",
    contribution:
      "My work includes token encryption and safe rendering of provider responses, alongside maintenance of the integration service.",
    skills: ["OAuth 2.0", "TypeScript", "PostgreSQL", "Token encryption"],
    image: "/files/work-projects/connections.png",
    alt: "Recreated connection hub with a fictional connected workspace, hidden token and expiry reminder.",
    caption:
      "Provider connection view. The workspace and connection details are fictional.",
    accent: "blue",
  },
] as const;
