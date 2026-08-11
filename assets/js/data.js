/**
 * Vaidarbhi Buddhe - Chemical Engineering Portfolio Data
 * Integrated M.Tech (Chemical Engineering) - Minor: Petroleum & Petrochemical Engineering
 * Institute of Chemical Technology (ICT Mumbai), Marathwada Campus Jalna
 */

const portfolioData = {
  personal: {
    name: "Vaidarbhi Buddhe",
    title: "Chemical & Petrochemical Process Engineer",
    degree: "Integrated M.Tech in Chemical Engineering",
    minor: "Minor: Petroleum & Petrochemical Engineering",
    institution: "Institute of Chemical Technology (ICT Mumbai), MARJ Jalna",
    classRank: "Class Rank: 3 / 45",
    cgpa: "8.73",
    email: "imt22vs.buddhe@stumarj.ictmumbai.edu.in",
    phone: "+91 8484968019",
    location: "Bhandara / Jalna, Maharashtra, India",
    address: "Lilai, Malati Nagar, Near Zudio, Khat Road, Bhandara, Maharashtra – 441904",
    linkedin: "https://linkedin.com/in/vaidarbhi-buddhe",
    linkedinDisplay: "linkedin.com/in/vaidarbhi-buddhe",
    objective: "Aspiring Chemical Engineer with strong industrial and research experience, seeking to contribute to process engineering, process optimisation, data analysis, and sustainable manufacturing. Eager to apply analytical skills, simulation tools, and engineering knowledge to enhance process safety, operational efficiency, energy performance, and sustainability across the chemical and petrochemical industry."
  },

  stats: [
    { value: "8.73", label: "CGPA (Rank 3/45)", icon: "award", highlight: "Academic Top 7%" },
    { value: "5+", label: "Industrial & Research Stints", icon: "factory", highlight: "CSIR-IIP, Lubes, Synthetics" },
    { value: "27", label: "Reaction Network Modeled", icon: "atom", highlight: "Aspen Plus RGibbs" },
    { value: "50%", label: "Heat Loss Reduction", icon: "flame", highlight: "Indorama Synthetics" },
    { value: "1,200+", label: "Students Mentored", icon: "users", highlight: "STEM Science Outreach" }
  ],

  experiences: [
    {
      id: "csir-iip",
      company: "CSIR – Indian Institute of Petroleum (IIP)",
      location: "Dehradun, Uttarakhand",
      role: "Research Intern – Syngas & Catalysis",
      period: "Nov 2025 – Feb 2026",
      category: "Research & Simulation",
      badge: "Flagship Research",
      icon: "flask",
      projectTitle: "Thermodynamic and Experimental Analysis for Syngas to LPG Conversion through Modified Route",
      highlights: [
        "Synthesized novel quaternary Cu–ZnO–ZrO₂–Al₂O₃ (CZZA) catalysts using precision co-precipitation method under stringent pH and temperature controls, followed by controlled calcination.",
        "Evaluated catalyst active sites and hydrocarbon product distribution via Gas Chromatography (GC) during experimental syngas-to-LPG conversion runs.",
        "Engineered a rigorous 27-reaction thermodynamic equilibrium network using Aspen Plus (RGibbs reactor block).",
        "Conducted multi-variable sensitivity analyses across operating temperatures (200–350°C), pressures (20–60 bar), and CO/H₂ feed ratios to maximize C₃–C₄ selectivity."
      ],
      technologies: ["Aspen Plus", "RGibbs", "Gas Chromatography", "Catalyst Synthesis", "Thermodynamics", "Reaction Engineering", "Syngas to LPG"],
      metrics: [
        { label: "Reaction Network", val: "27 Equilibrium Steps" },
        { label: "Catalyst System", val: "CZZA (Cu-ZnO-ZrO₂-Al₂O₃)" },
        { label: "Analytical Tool", val: "Gas Chromatography (GC)" }
      ]
    },
    {
      id: "ultra-plus-lubes",
      company: "Ultra Plus Lubes Pvt. Ltd.",
      location: "Panvel, Maharashtra",
      role: "Production & Process Engineering Intern",
      period: "Apr 2025 – Jun 2025",
      category: "Plant Operations",
      badge: "Operations & PLC",
      icon: "cog",
      projectTitle: "Plant-Floor Production Supervision & Oil Loss Mitigation Across Blending Lines",
      highlights: [
        "Supervised a 12-member production operations team across lubricant blending, automated filling, packing, and dispatch units.",
        "Gained direct operational experience with both modern PLC-controlled automated blending manifolds and manual batch systems.",
        "Conducted systematic daily production audits, uptime documentation, and material balance data collection to isolate operational bottlenecks.",
        "Mapped and traced critical oil wastage points across pipeline transfers and filling nozzles, executing corrective actions that enhanced overall production efficiency."
      ],
      technologies: ["PLC Systems", "Lubricant Blending", "Production Audits", "Wastage Control", "Team Leadership", "Material Balance"],
      metrics: [
        { label: "Team Supervised", val: "12 Plant Operators" },
        { label: "Systems Handled", val: "PLC & Manual Blending" },
        { label: "Core Impact", val: "Daily Loss Tracing & Audit" }
      ]
    },
    {
      id: "indorama-synthetics",
      company: "Indorama Synthetics (IND) Ltd.",
      location: "Nagpur, Maharashtra",
      role: "Energy & Process Engineering Intern",
      period: "Aug 2024 – Oct 2024",
      category: "Energy & Sustainability",
      badge: "Energy Conservation",
      icon: "zap",
      projectTitle: "Enhancing Energy Efficiency in CF-HTM Systems Through Insulation Upgrades",
      highlights: [
        "Analysed thermodynamic heat transfer in Continuous Filament High Temperature Media (CF-HTM) transfer lines for insulation material retrofit.",
        "Evaluated thermal performance of switching from standard mineral wool to high-efficiency calcium silicate insulation.",
        "Calculated and validated outer surface temperature drop from 6°C above ambient to 3°C, achieving an outstanding ~50% reduction in surface heat loss.",
        "Quantified monetary fuel cost savings and metric tons of CO₂ equivalent emission reductions.",
        "Participated actively in cross-functional plant Kaizen workshops and completed certified Lean Six Sigma Green Belt training."
      ],
      technologies: ["Heat Transfer Analysis", "Calcium Silicate", "Energy Efficiency", "Lean Six Sigma", "Kaizen", "Emissions Reduction"],
      metrics: [
        { label: "Heat Loss Drop", val: "50% Reduction" },
        { label: "Surface Temp Delta", val: "6°C → 3°C Reduction" },
        { label: "Methodology", val: "Lean Six Sigma & Kaizen" }
      ]
    },
    {
      id: "sanjay-techno",
      company: "Sanjay Techno Products",
      location: "Aurangabad, Maharashtra",
      role: "Polymer Processing Intern",
      period: "Feb 2024 – Mar 2024",
      category: "Polymer Engineering",
      badge: "Defect Troubleshooting",
      icon: "layers",
      projectTitle: "Injection Moulding Operational Analysis & Defect Root-Cause Elimination",
      highlights: [
        "Studied high-throughput injection moulding machinery operations for technical engineering and commodity polymer grades.",
        "Investigated mould cavity thermodynamics, melt rheology, and cycle time parameters.",
        "Conducted root-cause quality inspections to analyze and mitigate defects including flash, sink marks, burn marks, vacuum voids, jetting, and structural warpage."
      ],
      technologies: ["Injection Moulding", "Polymer Rheology", "Quality Control", "Defect Diagnosis", "Mould Diagnostics"],
      metrics: [
        { label: "Defects Analyzed", val: "6 Critical Types" },
        { label: "Focus", val: "Engineering Polymers" },
        { label: "Tooling", val: "Mould Cycle Optimization" }
      ]
    },
    {
      id: "clarion-organics",
      company: "Clarion Organics Ltd.",
      location: "Tumsar, Maharashtra",
      role: "Chemical Process & QA Intern",
      period: "Aug 2023 – Sep 2023",
      category: "Pharma & Unit Operations",
      badge: "Pharma Intermediates",
      icon: "beaker",
      projectTitle: "Pharma Intermediate Synthesis, Reaction Engineering & Laboratory QA Workflow",
      highlights: [
        "Studied industrial synthesis routes for high-value pharmaceutical intermediates, focusing on exothermic nitration, chemical reduction, and catalytic hydrogenation.",
        "Monitored critical downstream solid-liquid separation units: filtration presses, high-speed centrifuges, sparkler filters, and vacuum tray dryers.",
        "Performed hands-on Karl Fischer (KF) volumetric titrations and factor standardization for precise ppm-level moisture quantification in intermediate batches.",
        "Analyzed operational safeguards and metallurgy of glass-lined (GLR) and SS316 agitated reactor vessels."
      ],
      technologies: ["Karl Fischer Titration", "Nitration & Hydrogenation", "Glass-Lined Reactors", "SS316 Vessels", "Centrifugation", "Sparkler Filters"],
      metrics: [
        { label: "Lab Technique", val: "Karl Fischer Moisture Analysis" },
        { label: "Reactors Studied", val: "Glass-Lined & SS316" },
        { label: "Core Reactions", val: "Nitration & Hydrogenation" }
      ]
    }
  ],

  skillsData: [
    {
      category: "Process Simulation & Modeling",
      icon: "cpu",
      skills: [
        { name: "Aspen Plus (RGibbs, RadFrac, RYield)", level: 90, desc: "Thermodynamic equilibrium, kinetic reactor modeling, sensitivity analysis, 27-reaction networks" },
        { name: "Aspen HYSYS", level: 85, desc: "Petroleum refining simulations, flash separators, distillation columns, compressor loops" },
        { name: "DWSIM", level: 82, desc: "Open-source chemical flowsheet development, CAPE-OPEN thermodynamics" },
        { name: "MATLAB & Symbolic Math", level: 85, desc: "Differential equations for heat/mass transfer, ODE solvers, symbolic reaction kinetics" },
        { name: "Python (NumPy, SciPy, Pandas, Matplotlib)", level: 80, desc: "Process data analytics, regression modeling, reactor optimization scripts" }
      ]
    },
    {
      category: "Core Chemical & Petrochemical Engineering",
      icon: "git-merge",
      skills: [
        { name: "Reaction Engineering & Kinetics", level: 92, desc: "Catalytic kinetics, PFR/CSTR design, equilibrium yield, selectivity optimization" },
        { name: "Heat Transfer & Insulation Design", level: 90, desc: "CF-HTM systems, heat exchangers, LMTD/NTU methods, refractory & insulation retrofits" },
        { name: "Mass Transfer & Separations", level: 88, desc: "Distillation, absorption, solvent extraction, membrane separation, filtration" },
        { name: "Process Safety & Hazard Analysis", level: 86, desc: "Exothermic reaction runaway prevention, pressure relief, HAZOP fundamentals" },
        { name: "Catalyst Synthesis & Calcination", level: 88, desc: "Co-precipitation, pH-controlled precipitation, CZZA quaternary catalysts, drying" },
        { name: "Material & Energy Balances", level: 95, desc: "Steady-state and unsteady-state industrial plant mass and energy balance reconciliation" }
      ]
    },
    {
      category: "Analytical & Laboratory Techniques",
      icon: "activity",
      skills: [
        { name: "Gas Chromatography (GC)", level: 88, desc: "TCD/FID detector calibration, hydrocarbon gas analysis, retention time profiling" },
        { name: "HPLC (High-Perf Liquid Chromatography)", level: 80, desc: "Liquid intermediate purity verification and concentration assays" },
        { name: "Karl Fischer (KF) Titration", level: 92, desc: "Volumetric moisture analysis, factor standardization, ppm-level water determination" },
        { name: "Viscosity Testing & Tribology", level: 86, desc: "Kinematic viscosity bath, capillary viscometers for lubricant formulations" },
        { name: "Flash Point & Pour Point Determination", level: 88, desc: "Pensky-Martens closed cup flash point, cold flow properties of petroleum fractions" }
      ]
    },
    {
      category: "Industrial Operations & Lean Systems",
      icon: "settings",
      skills: [
        { name: "Lean Six Sigma (Green Belt Trained, White Belt Certified)", level: 90, desc: "DMAIC framework, root-cause defect elimination, process capability analysis" },
        { name: "PLC-Controlled Blending Systems", level: 84, desc: "Automated manifold sequencing, valve interlocks, batch recipe management" },
        { name: "SAP ERP Systems", level: 78, desc: "Material management, production order tracking, plant inventory flows" },
        { name: "Kaizen & Continuous Improvement", level: 88, desc: "Shop-floor 5S, gemba walks, operational loss tracking, downtime reduction" },
        { name: "CATIA & P&ID Schematics", level: 75, desc: "Equipment layout visualization, piping and instrumentation diagram design" },
        { name: "Minitab & Statistical Quality Control", level: 82, desc: "ANOVA, control charts, process variation analysis, Pareto optimization" }
      ]
    }
  ],

  education: [
    {
      degree: "Integrated M.Tech in Chemical Engineering (Major)",
      minor: "Minor: Petroleum and Petrochemical Engineering",
      institution: "Institute of Chemical Technology (ICT Mumbai), Marathwada Campus Jalna",
      period: "2022 – Expected 2027",
      grade: "Overall CGPA: 8.73",
      rank: "Class Rank: 3 / 45 (Top 7%)",
      badge: "Premier Chemical Engineering Institution",
      details: [
        "Rigorous 5-year integrated postgraduate engineering program combining fundamental chemical engineering with advanced petroleum refining, petrochemical synthesis, and process optimization.",
        "Recipient of the prestigious Vedvalli Vaidyanathan Girl Student Award for academic distinction."
      ]
    },
    {
      degree: "Higher Secondary Certificate (H.S.C. – Science)",
      institution: "J M Patel Arts, Commerce and Science College, Bhandara",
      period: "2021 – 2022",
      grade: "Score: 88.17%",
      rank: "Distinction in Physical Sciences & Mathematics",
      details: [
        "Intensive focus on Advanced Chemistry, Physics, and Higher Mathematics."
      ]
    },
    {
      degree: "Secondary School Certificate (S.S.C.)",
      institution: "Nutan Kanya High School, Bhandara",
      period: "2019 – 2020",
      grade: "Score: 100% (Flawless 100% Score)",
      rank: "Rank 1 / Institutional Gold Standard",
      details: [
        "Achieved a flawless 100% aggregate score with maximum marks in Science and Mathematics."
      ]
    }
  ],

  certificationsAndAwards: [
    {
      title: "Six Sigma White Belt",
      issuer: "Council for Six Sigma Certification",
      date: "Jul 2026",
      type: "Certification",
      icon: "shield-check",
      desc: "Fundamental mastery of DMAIC methodology, defect reduction, and process variation control."
    },
    {
      title: "Aspen Plus – Getting Started",
      issuer: "ChemEngGuy Training Suite",
      date: "Aug 2025",
      type: "Certification",
      icon: "award",
      desc: "Flowsheet setup, physical property methods (NRTL, Peng-Robinson), convergence, and sensitivity analysis."
    },
    {
      title: "Introduction to Symbolic Math with MATLAB",
      issuer: "MathWorks",
      date: "Aug 2025",
      type: "Certification",
      icon: "code",
      desc: "Analytical equation solving, differential equations, calculus, and mathematical modeling."
    },
    {
      title: "Vedvalli Vaidyanathan Girl Student Award",
      issuer: "Institute of Chemical Technology (ICT Mumbai)",
      date: "2022 – 2023",
      type: "Award",
      icon: "star",
      desc: "Conferred for outstanding academic merit and leadership among female engineering scholars at ICT."
    },
    {
      title: "Lean Six Sigma Green Belt Training",
      issuer: "Indorama Synthetics Plant Program",
      date: "Oct 2024",
      type: "Training",
      icon: "check-circle",
      desc: "Applied industrial training covering Kaizen, statistical process control, and plant-floor energy audit."
    },
    {
      title: "2nd Place, State Level Rugby Championship",
      issuer: "Government of Maharashtra",
      date: "2019 – 2020",
      type: "Sports / Athletic",
      icon: "trophy",
      desc: "Silver medalist representing the regional division at the state-level rugby tournament."
    }
  ],

  leadership: [
    {
      role: "Off-Campus Representative",
      org: "The Bombay Technologist, ICT MARJ",
      period: "2025 – Present",
      icon: "globe",
      description: "Represent the prestigious research publication and institute externally by coordinating national outreach initiatives, scholarly discourse, and technical student engagement."
    },
    {
      role: "Deputy Head",
      org: "Literature Club, ICT MARJ",
      period: "2024 – 2025",
      icon: "book-open",
      description: "Lead the strategic planning and execution of technical debates, literary conclaves, and creative workshops while mentoring junior club cohorts."
    },
    {
      role: "Member – Editorial Board",
      org: "Margjal (Official ICT MARJ Magazine)",
      period: "2022 – 2024",
      icon: "edit-3",
      description: "Authored technical articles, curated peer-reviewed student submissions, and spearheaded editorial proofing to maintain high journalistic and technical standards."
    },
    {
      role: "Event & Competition Team Member",
      org: "Aakriti (Annual Technical Fest), ICT MARJ",
      period: "2023 – 2024",
      icon: "cpu",
      description: "Assisted in orchestrating major chemical engineering design competitions, logistical scheduling, and interactive problem-solving hackathons."
    },
    {
      role: "Science Outreach Volunteer",
      org: "Rainbow EduFest, Rotary Club of Jalna",
      period: "Feb 2023",
      icon: "heart",
      description: "Led interactive live science experiments and STEM demonstrations across 15 schools, inspiring 1,200+ rural students in basic chemistry and engineering principles."
    }
  ],

  languages: [
    { name: "English", level: "Professional Working Proficiency / Fluent" },
    { name: "Marathi", level: "Native / Mother Tongue" },
    { name: "Hindi", level: "Fluent / Full Working Proficiency" }
  ],

  interests: [
    { name: "Journaling", icon: "book", desc: "Reflective technical writing and personal daily logs" },
    { name: "Sketching", icon: "pen-tool", desc: "Architectural line art and process schematics" },
    { name: "Travelling", icon: "compass", desc: "Exploring industrial sites, cultural geography, and heritage" },
    { name: "Learning New Languages", icon: "message-square", desc: "Linguistic study and cross-cultural communication" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
