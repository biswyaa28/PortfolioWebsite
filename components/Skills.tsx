"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RetroTooltip from "./RetroTooltip";
import CodeHintTooltip from "./CodeHintTooltip";
import RetroWindow from "./RetroWindow";

const SkillsRadar = dynamic(() => import("./SkillsRadar"), {
  ssr: false,
  loading: () => (
    <div className="skills-radar-container">
      <div className="codex-skeleton-line w-full h-48" />
    </div>
  ),
});

const SkillDiagnostic = dynamic(() => import("./SkillDiagnostic"), {
  ssr: false,
  loading: () => (
    <div className="skill-diagnostic-container border border-stone-800">
      <div className="codex-skeleton-line w-full h-64" />
    </div>
  ),
});

interface SkillEntry {
  skill: string;
  hint: string;
  lang: string;
}

interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  skills: SkillEntry[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    category: "Programming Languages",
    icon: "⌨",
    skills: [
      { skill: "C++", hint: "#include <iostream>\nint main() {\n  std::cout << \"Hello\";\n}", lang: "cpp" },
      { skill: "Python", hint: "import socket\ns = socket.socket()\ns.bind(('0.0.0.0', 4444))", lang: "python" },
      { skill: "JavaScript", hint: "const req = await fetch('/api');\nconst data = await req.json();", lang: "javascript" },
      { skill: "Bash/Shell", hint: "#!/bin/bash\nnmap -sV -O target\nnetstat -tulnp", lang: "bash" },
    ],
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity",
    icon: "🛡",
    skills: [
      { skill: "Network Security", hint: "iptables -A INPUT -p tcp\n  --dport 22 -j DROP", lang: "bash" },
      { skill: "Penetration Testing", hint: "msfconsole\nuse exploit/multi/handler\nset payload windows/meterpreter/reverse_tcp", lang: "bash" },
      { skill: "Vulnerability Assessment", hint: "nmap -sV --script=vuln\n  192.168.1.0/24", lang: "bash" },
      { skill: "Cryptography", hint: "openssl enc -aes-256-cbc\n  -salt -in file.txt\n  -out file.enc", lang: "bash" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Technologies",
    icon: "🔧",
    skills: [
      { skill: "Wireshark", hint: "tshark -i eth0 -Y\n  'tcp.port == 443'\n  -V", lang: "bash" },
      { skill: "Metasploit", hint: "msfvenom -p linux/x64/\n  shell_reverse_tcp\n  LHOST=10.0.0.1", lang: "bash" },
      { skill: "Nmap", hint: "nmap -sS -sV -O\n  -p- --min-rate 5000\n  target.com", lang: "bash" },
      { skill: "Burp Suite", hint: "Proxy -> Intercept\n  HTTP/HTTPS traffic\n  Repeater -> Modify", lang: "text" },
      { skill: "Git", hint: "git log --oneline\n  --graph --all\ngit diff HEAD~1", lang: "bash" },
    ],
  },
  {
    id: "frameworks",
    category: "Frameworks & Libraries",
    icon: "📦",
    skills: [
      { skill: "React", hint: "const [state, setState]\n  = useState(0);\nuseEffect(() => {}, []);", lang: "jsx" },
      { skill: "Next.js", hint: "export default function\n  Page() {\n  return <h1>SSR</h1>;\n}", lang: "tsx" },
      { skill: "Node.js", hint: "const http = require('http');\nhttp.createServer((req,res)\n  => res.end('OK')).listen(80);", lang: "javascript" },
      { skill: "TailwindCSS", hint: '<div class="\n  bg-background text-cyber-blue\n  border-2 border-cyber-blue\n">styled</div>', lang: "html" },
    ],
  },
  {
    id: "os",
    category: "Operating Systems",
    icon: "💻",
    skills: [
      { skill: "Linux", hint: "uname -a\nsystemctl status sshd\ncat /etc/passwd", lang: "bash" },
      { skill: "Windows", hint: "Get-Process | Sort CPU\n  -Descending | Select -First 5", lang: "powershell" },
      { skill: "Kali Linux", hint: "apt update && apt upgrade\n  -y\n  && apt install metasploit", lang: "bash" },
    ],
  },
  {
    id: "concepts",
    category: "Concepts",
    icon: "🧠",
    skills: [
      { skill: "System Architecture", hint: "┌──────┐  ┌──────┐\n│Client│──│Server│\n└──────┘  └──────┘", lang: "text" },
      { skill: "Network Protocols", hint: "TCP 3-Way Handshake:\n  SYN -> SYN-ACK -> ACK", lang: "text" },
      { skill: "Secure Coding", hint: "// Always sanitize input\nconst safe = escape(user);\nquery = `SELECT * WHERE\n  id = '${safe}'`;", lang: "javascript" },
      { skill: "Threat Modeling", hint: "STRIDE:\n  Spoofing\n  Tampering\n  Repudiation\n  Info Disclosure\n  DoS\n  Elevation", lang: "text" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="breadcrumb-trail">
          <span className="breadcrumb-item">ROOT</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-item breadcrumb-item--active">SKILLS</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="section-heading text-3xl md:text-4xl text-foreground">
            Skills
          </h2>
          <span className="inventory-count">{skillCategories.length} slots</span>
        </div>

        {/* Skills Radar Chart */}
        <div className="mb-16">
          <RetroTooltip content="Core competency radar — hover points for scores" placement="top">
            <h3 className="text-center text-xs text-gray-light font-mono uppercase tracking-wider mb-4 cursor-help" style={{ border: "none", boxShadow: "none" }}>
              &gt; System Health Monitor
            </h3>
          </RetroTooltip>
          <SkillsRadar />
        </div>

        {/* Skill Diagnostic — 3-Axis Radar */}
        <div className="mb-16">
          <h3 className="text-center text-xs text-gray-light font-mono uppercase tracking-wider mb-4">
            &gt; Diagnostic Analysis
          </h3>
          <SkillDiagnostic />
        </div>

        {/* Skill Category Slots */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
              whileHover={{
                y: -4,
                x: -4,
                transition: { duration: 0 },
              }}
            >
              <RetroWindow
                title={
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{category.icon}</span>
                    {category.category.toUpperCase()}
                  </span>
                }
                className="h-full"
              >
                {/* Skills as command blocks with Code Hint tooltips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((entry) => (
                    <CodeHintTooltip
                      key={`${category.id}-${entry.skill}`}
                      hint={entry.hint}
                      language={entry.lang}
                      placement="top"
                    >
                      <span className="command-block cursor-help hover:border-cyber-blue hover:text-cyber-blue transition-colors">
                        {entry.skill}
                      </span>
                    </CodeHintTooltip>
                  ))}
                </div>
              </RetroWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
