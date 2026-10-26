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
    email: "vaidarbhibuddhe@gmail.com",
    phone: "+91 8484968019",
    location: "Jalna, Maharashtra, India",
    address: "Jalna, Maharashtra, India",
    linkedin: "https://linkedin.com/in/vaidarbhi-buddhe",
    linkedinDisplay: "linkedin.com/in/vaidarbhi-buddhe",
    summary: "Final-year Integrated M.Tech Chemical Engineering student (CGPA: 8.73) with hands-on experience across refinery research, lubricant manufacturing, energy-efficiency projects, and process operations. Skilled in Aspen Plus, Aspen HYSYS, Python, and data analysis, with experience in catalyst development, process simulation, production supervision, and continuous improvement. Interested in Process Engineering, Process Optimisation, Manufacturing, and Energy & Petrochemical Operations.",
    objective: "Final-year Integrated M.Tech Chemical Engineering student (CGPA: 8.73) with hands-on experience across refinery research, lubricant manufacturing, energy-efficiency projects, and process operations. Skilled in Aspen Plus, Aspen HYSYS, Python, and data analysis, with experience in catalyst development, process simulation, production supervision, and continuous improvement. Interested in Process Engineering, Process Optimisation, Manufacturing, and Energy & Petrochemical Operations."
  },

  stats: [
    { value: "8.73", label: "CGPA (Rank 3/45)", icon: "award", highlight: "Academic Top 7%" },
    { value: "6", label: "Industrial & Research Stints", icon: "factory", highlight: "Dow, CSIR-IIP, Lubes, Synthetics" },
    { value: "27", label: "Reaction Network Modeled", icon: "atom", highlight: "Aspen Plus RGibbs" },
    { value: "527k", label: "Barrels Incremental Oil", icon: "droplet", highlight: "Dow EOR DCA Modeling" },
    { value: "500+", label: "Students Mentored", icon: "users", highlight: "STEM Science Outreach" }
  ],

  thesis: {
    id: "thesis",
    title: "Development of a Dynamic Model for Process Monitoring and Fault Detection",
    degree: "Master's Thesis – Integrated M.Tech Chemical Engineering",
    period: "Mar 2026 – Present",
    majorGuide: "Dr. Debashish Kundu",
    minorGuide: "Dr. Supriyo Kumar Mondal",
    institution: "Institute of Chemical Technology (ICT Mumbai)",
    badge: "Master's Thesis",
    teaser: "Developing a dynamic simulation framework integrated with AI/ML to detect plant operational anomalies, boosting process reliability and energy performance.",
    description: "Developing a process simulation framework integrated with AI/ML techniques to analyse dynamic plant behavior, identify operational anomalies, and support fault detection and diagnosis. The project aims to improve process reliability, operational efficiency, and energy performance through simulation-driven analysis and data-driven insights.",
    highlights: [
      "Formulated dynamic process simulation models in chemical simulation environments to capture transient operational behaviors.",
      "Integrated machine learning (AI/ML) algorithms for early anomaly detection and fault classification across process units.",
      "Investigated disturbance propagation and mitigation strategies to optimize energy utilization and operational reliability.",
      "Validated diagnostic frameworks against industrial chemical benchmark operations."
    ],
    technologies: ["Dynamic Simulation", "AI/ML in Chemical Engineering", "Fault Detection & Diagnosis (FDD)", "Plant Reliability", "Process Monitoring"],
    metrics: [
      { label: "Core Methodology", val: "Dynamic Simulation + AI/ML" },
      { label: "Key Objective", val: "Process Fault Diagnosis (FDD)" },
      { label: "Institution", val: "ICT Mumbai (MARJ)" }
    ]
  },

  experiences: [
    {
      id: "dow-ditc",
      company: "Dow India Technology Centre (DITC)",
      location: "Navi Mumbai, Maharashtra",
      role: "Project Intern – EOR & Data Analytics",
      period: "Jul 2026 – Oct 2026",
      category: "Data Science & EOR",
      badge: "Dow Tech Centre",
      icon: "trending-up",
      teaser: "Analyzed synthetic well histories and built Python DCA models, selecting harmonic modeling to estimate ~527,000 barrels of incremental oil.",
      projectTitle: "Data Interpretation for EOR Field Datasets: Decline Curve Fitting and Incremental Oil Determination",
      guide: "Dr. Neeraj Rohilla",
      highlights: [
        "Analyzed historical production histories of 5 synthetic oil wells at Dow India Technology Centre (DITC), selecting well DITC-5 for decline curve analysis based on engineering assessment and production trend interpretation.",
        "Developed and validated exponential, harmonic, and hyperbolic decline models using Python to evaluate Enhanced Oil Recovery (EOR) performance.",
        "Selected the harmonic decline model based on minimized blind-forecast error metrics (RMSE: 315.10, MAE: 292.06).",
        "Estimated ~527,000 barrels of apparent incremental oil recovery using rigorous decline curve fitting and reservoir engineering methods."
      ],
      technologies: ["Python", "Decline Curve Analysis (DCA)", "Harmonic Modeling", "Enhanced Oil Recovery (EOR)", "RMSE / MAE Analytics", "Reservoir Engineering"],
      metrics: [
        { label: "Incremental Oil", val: "~527,000 Barrels" },
        { label: "Optimal Model", val: "Harmonic DCA" },
        { label: "Blind-Forecast Error", val: "RMSE: 315.10 | MAE: 292.06" }
      ]
    },
    {
      id: "csir-iip",
      company: "CSIR – Indian Institute of Petroleum (IIP)",
      location: "Dehradun, Uttarakhand",
      role: "Research Intern – Syngas & Catalysis",
      period: "Nov 2025 – Feb 2026",
      category: "Research & Simulation",
      badge: "Flagship Research",
      icon: "flask",
      teaser: "Synthesized quaternary CZZA catalysts and modeled a 27-reaction Gibbs equilibrium network for Syngas-to-LPG in Aspen Plus.",
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
      teaser: "Supervised a 12-member plant production crew across PLC blending lines, conducting daily audits to eliminate oil transfer wastage.",
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
      teaser: "Evaluated CF-HTM line insulation upgrades to calcium silicate, achieving ~50% heat loss reduction and lower plant fuel emissions.",
      projectTitle: "Enhancing Energy Efficiency in CF-HTM Systems Through Insulation Upgrades",
      highlights: [
        "Analysed thermodynamic heat transfer in Continuous Filament High Temperature Media (CF-HTM) transfer lines for insulation material retrofit.",
        "Evaluated thermal performance of switching from standard mineral wool to high-efficiency calcium silicate insulation.",
        "Calculated and validated outer surface temperature drop from 6°C above ambient to 3°C, achieving an outstanding ~50% reduction in surface heat loss.",
        "Quantified monetary fuel cost savings and metric tons of CO₂ equivalent emission reductions.",
        "Participated actively in cross-functional plant Kaizen workshops and continuous process improvement initiatives."
      ],
      technologies: ["Heat Transfer Analysis", "Calcium Silicate", "Energy Efficiency", "Six Sigma", "Kaizen", "Emissions Reduction"],
      metrics: [
        { label: "Heat Loss Drop", val: "50% Reduction" },
        { label: "Surface Temp Delta", val: "6°C → 3°C Reduction" },
        { label: "Methodology", val: "Kaizen & Six Sigma" }
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
      teaser: "Conducted defect root-cause analysis on high-throughput injection moulding operations to eliminate 6 critical polymer quality defects.",
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
      teaser: "Monitored pharma intermediate synthesis, unit separation operations, and performed Karl Fischer titrations for moisture QA.",
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
        { 
          name: "Aspen Plus (RGibbs, RadFrac, RYield)", 
          tier: "Lead Specialist", 
          domain: "Thermodynamic Kinetics", 
          desc: "Thermodynamic equilibrium modeling, kinetic reactor design, and sensitivity analysis across 27-reaction networks.", 
          appliedAt: "CSIR-IIP RGibbs Synthesis", 
          simLink: "#simulators" 
        },
        { 
          name: "Aspen HYSYS", 
          tier: "Advanced Practitioner", 
          domain: "Refining & Separations", 
          desc: "Petroleum refining simulations, flash separators, multi-stage distillation columns, and compressor recycle loops.", 
          appliedAt: "Refinery Column Simulation", 
          simLink: "#simulators" 
        },
        { 
          name: "DWSIM Flowsheeting", 
          tier: "Advanced Practitioner", 
          domain: "Flowsheet Architecture", 
          desc: "Open-source chemical flowsheet synthesis, CAPE-OPEN thermodynamic packages, and property estimation.", 
          appliedAt: "CAPE-OPEN Process Flowsheets" 
        },
        { 
          name: "Python (NumPy, SciPy, Pandas)", 
          tier: "Lead Specialist", 
          domain: "Data & Decline Analytics", 
          desc: "Process data analytics, Python decline curve analysis (DCA), regression modeling, and reactor optimization scripts.", 
          appliedAt: "Dow India EOR Modeling (~527k BBL)" 
        },
        { 
          name: "MATLAB & Symbolic Math", 
          tier: "Advanced Practitioner", 
          domain: "Transport Phenomena", 
          desc: "Differential equations for heat/mass transfer, ODE numerical solvers, and symbolic reaction kinetics modeling.", 
          appliedAt: "Transport Phenomena Modeling" 
        }
      ]
    },
    {
      category: "Core Chemical & Petrochemical Engineering",
      icon: "git-merge",
      skills: [
        { 
          name: "Reaction Engineering & Catalysis", 
          tier: "Lead Specialist", 
          domain: "Catalytic Synthesis", 
          desc: "Quaternary CZZA catalyst synthesis, pH-controlled co-precipitation, calcination, and kinetic selectivity optimization.", 
          appliedAt: "CSIR-IIP Quaternary CZZA Catalyst" 
        },
        { 
          name: "Heat Transfer & Insulation Design", 
          tier: "Lead Specialist", 
          domain: "Thermal Efficiency", 
          desc: "CF-HTM systems, heat exchangers, LMTD/NTU methods, and calcium silicate refractory insulation retrofits.", 
          appliedAt: "Indorama HTM Line (50% Loss Cut)" 
        },
        { 
          name: "Mass Transfer & Separations", 
          tier: "Advanced Practitioner", 
          domain: "Separation Unit Ops", 
          desc: "Distillation, gas absorption, solvent extraction, high-speed centrifugation, and sparkler filter operations.", 
          appliedAt: "Downstream Solid-Liquid Unit Ops" 
        },
        { 
          name: "Material & Energy Balances", 
          tier: "Lead Specialist", 
          domain: "Plant Reconciliation", 
          desc: "Steady-state and unsteady-state industrial plant mass and energy balance reconciliation, yield auditing, and loss reduction.", 
          appliedAt: "Plant Production Audits & Balances" 
        },
        { 
          name: "Process Safety & Hazard (HAZOP)", 
          tier: "Advanced Practitioner", 
          domain: "Plant Safety & Metallurgy", 
          desc: "Exothermic reaction runaway prevention, pressure relief, HAZOP fundamentals, and SS316/glass-lined vessel safety.", 
          appliedAt: "Glass-Lined & SS316 Agitated Vessels" 
        },
        { 
          name: "Decline Curve Analysis (DCA)", 
          tier: "Lead Specialist", 
          domain: "Reservoir Forecasting", 
          desc: "Exponential, hyperbolic, and harmonic EOR models, RMSE/MAE blind-forecast optimization, and reserve estimation.", 
          appliedAt: "Dow India Tech Centre Well DITC-5" 
        }
      ]
    },
    {
      category: "Analytical & Laboratory Techniques",
      icon: "activity",
      skills: [
        { 
          name: "Gas Chromatography (GC)", 
          tier: "Lead Specialist", 
          domain: "Hydrocarbon Assays", 
          desc: "TCD/FID detector calibration, hydrocarbon gas composition analysis, and retention time profiling.", 
          appliedAt: "CSIR-IIP Hydrocarbon Product Assays" 
        },
        { 
          name: "Karl Fischer (KF) Titration", 
          tier: "Lead Specialist", 
          domain: "Moisture Quantification", 
          desc: "Volumetric moisture analysis, factor standardization, and ppm-level water determination in chemical intermediates.", 
          appliedAt: "Clarion Organics Intermediate Moisture QA" 
        },
        { 
          name: "HPLC Liquid Chromatography", 
          tier: "Advanced Practitioner", 
          domain: "Purity & Assay Verification", 
          desc: "Liquid intermediate purity verification, concentration assays, and column retention separation workflows.", 
          appliedAt: "Pharma Intermediate Purity Workflow" 
        },
        { 
          name: "Viscosity Testing & Tribology", 
          tier: "Advanced Practitioner", 
          domain: "Lubricant Rheology", 
          desc: "Kinematic viscosity bath calibration and capillary viscometer testing for industrial lubricant formulations.", 
          appliedAt: "Ultra Plus Lubes Formulation Testing" 
        },
        { 
          name: "Flash Point & Cold Flow Tests", 
          tier: "Advanced Practitioner", 
          domain: "Petroleum Standards", 
          desc: "Pensky-Martens closed cup flash point, cloud point, and pour point characterization of petroleum fractions.", 
          appliedAt: "Petroleum Product Specifications" 
        }
      ]
    },
    {
      category: "Industrial Operations & Lean Systems",
      icon: "settings",
      skills: [
        { 
          name: "Six Sigma White Belt Certified", 
          tier: "Certified Specialist", 
          domain: "DMAIC Quality Control", 
          desc: "DMAIC methodology, root-cause defect elimination, process variation control, and quality assurance.", 
          appliedAt: "Kaizen & Plant Loss Mitigation" 
        },
        { 
          name: "PLC-Controlled Blending Operations", 
          tier: "Advanced Practitioner", 
          domain: "Automated Plant Controls", 
          desc: "Automated manifold sequencing, valve interlocks, batch recipe management, and shop-floor team coordination.", 
          appliedAt: "Ultra Plus Lubes PLC Lines (12 Operators)" 
        },
        { 
          name: "Kaizen & 5S Loss Reduction", 
          tier: "Advanced Practitioner", 
          domain: "Lean Manufacturing", 
          desc: "Shop-floor 5S implementation, gemba walks, operational waste tracking, and filling nozzle loss mitigation.", 
          appliedAt: "Indorama Kaizen Workshops" 
        },
        { 
          name: "Injection Moulding Diagnostics", 
          tier: "Advanced Practitioner", 
          domain: "Polymer Processing", 
          desc: "Cavity thermodynamics, melt rheology, and systematic elimination of flash, sink marks, voids, and warpage.", 
          appliedAt: "Sanjay Techno Polymer Troubleshooting" 
        },
        { 
          name: "SAP ERP Systems & P&ID", 
          tier: "Industrial Specialist", 
          domain: "ERP & Instrumentation", 
          desc: "Production order flows, plant inventory tracking, piping & instrumentation diagram (P&ID) schematics.", 
          appliedAt: "Plant Dispatch & Material Flows" 
        }
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
      institution: "J M Patel Arts, Commerce and Science College",
      period: "2021 – 2022",
      grade: "Score: 88.17%",
      rank: "Science Stream (H.S.C.)",
      details: [
        "Intensive focus on Advanced Chemistry, Physics, and Higher Mathematics."
      ]
    },
    {
      degree: "Secondary School Certificate (S.S.C.)",
      institution: "Nutan Kanya High School",
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
      description: "Led interactive live science experiments and STEM demonstrations across 15 schools, inspiring 500+ students in basic chemistry and engineering principles."
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
