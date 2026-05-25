import {
  Building2,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Landmark,
  Calculator,
  Award,
  FileText,
  Globe2,
  Plane,
  ArrowRight,
  Code2
} from "lucide-react";

export interface ServiceSection {
  title?: string;
  text?: string;
  points?: string[];
}

export interface ServiceData {
  title: string;
  id: string;
  description: string;
  icon: any;
  color: string;
  lightColor: string;
  textColor: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: ServiceSection[];
  schemaMarkup: any;
}

export const servicesData: Record<string, ServiceData> = {
  "company-formation-business-setup": {
    title: "Company Formation & Business Setup",
    id: "company-formation-business-setup",
    description: "Establish your business in Qatar successfully. We handle your Commercial Registration (CR), licensing, and legal structuring.",
    icon: Building2,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    metaTitle: "Company Formation in Qatar | Business Setup in Doha",
    metaDescription: "Establish your business in Qatar successfully with Trek Group. End-to-end solutions for LLC formation, QFC registration, Free Zone setup, and MOCI licensing.",
    keywords: ["Company Formation in Qatar", "Business Setup in Qatar", "Start business in Qatar", "Qatar company registration", "CR registration Qatar"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Company Formation & Business Setup in Qatar",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar",
        "image": "https://trek-group.com/treklogo.png",
        "telephone": "+974 3005 6030"
      },
      "areaServed": "QA",
      "description": "End-to-end solutions for LLC formation, QFC registration, Free Zone setup, and MOCI licensing in Qatar."
    },
    sections: [
      {
        title: "Build Your Business in Qatar with TREK Group Business Services",
        text: "TREK Group Business Services specializes in complete company formation and business setup solutions in Qatar. Our mission is not only to process your documentation but also to provide end-to-end business support that helps entrepreneurs, investors, startups, and corporations establish and grow successfully in Qatar.\n\nQatar continues to attract international investors and entrepreneurs through its strong economy, strategic location, business-friendly environment, and investment opportunities. Whether you are a startup owner, foreign investor, SME, or large corporation, our expert team helps simplify the process and ensures smooth business establishment.\n\nWith extensive experience in Qatar’s business sector, our team has successfully supported the formation of 1,500+ companies across different industries and business activities."
      },
      {
        title: "Our Company Formation Services Include:",
        points: [
          "Local Company Formation in Qatar",
          "100% Foreign Ownership Company Setup",
          "QFC (Qatar Financial Centre) Company Registration",
          "Qatar Free Zone Company Formation",
          "MOCI Company Registration",
          "Single Window Registration Services",
          "Factory and Industrial License Setup",
          "Commercial Registration (CR) Services",
          "Trade License Processing",
          "Share Transfer & Ownership Amendments",
          "Special Government Approval Activities",
          "Business Consultation & Legal Documentation Support"
        ]
      },
      {
        title: "Complete Business Setup Support Beyond Documentation",
        text: "At TREK Group Business Services, we believe company formation is only the first step. Our dedicated team supports clients throughout their business journey.\n\nOur additional support includes:",
        points: [
          "Corporate Bank Account Assistance",
          "Office Setup & Workspace Support",
          "Interior Design & Office Fit-Out Solutions",
          "Website Development & Business Software Solutions",
          "Company Profile & Branding Design",
          "PRO Outsourcing Services",
          "Government Liaison Support",
          "Corporate Documentation Assistance"
        ]
      },
      {
        title: "PRO Outsourcing Services – Long-Term Business Support",
        text: "Our relationship with clients does not end after company registration. Through our PRO outsourcing services, we continue supporting businesses with government procedures and compliance requirements in Qatar.\n\nOur PRO team assists with:",
        points: [
          "Ministry approvals",
          "License renewals",
          "Immigration procedures",
          "Labour-related services",
          "Corporate document management",
          "Government follow-ups",
          "Business compliance support"
        ]
      },
      {
        title: "MOCI & Single Window Support",
        text: "Company registration in Qatar is processed through government systems including the Ministry of Commerce and Industry (MOCI) and Single Window platform, which facilitate legal company registration and licensing procedures.\n\nOur experienced team guides clients through the complete process while ensuring all documentation and approvals are handled efficiently."
      },
      {
        title: "Why Choose TREK Group Business Services?",
        points: [
          "Expert business consultants",
          "Complete end-to-end business solutions",
          "Fast and transparent process",
          "Dedicated customer support",
          "Experience across multiple business sectors",
          "Long-term business partnership approach"
        ]
      }
    ]
  },
  "one-hundred-percent-foreign-ownership": {
    title: "100% Foreign Ownership Setup",
    id: "one-hundred-percent-foreign-ownership",
    description: "Retain 100% ownership and operational control of your business in Qatar under the latest MOCI foreign investment framework.",
    icon: ShieldCheck,
    color: "bg-blue-600",
    lightColor: "bg-blue-600/10",
    textColor: "text-blue-600",
    metaTitle: "100% Foreign Ownership in Qatar | Business Setup Experts",
    metaDescription: "Establish your company with 100% foreign ownership in Qatar. Learn about eligible sectors, MOCI approvals, Single Window registration, and regulatory pathways.",
    keywords: ["100% Foreign Ownership Qatar", "Foreign investment Qatar", "Own business in Qatar", "Qatar business setup"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "100% Foreign Ownership Company Setup in Qatar",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA",
      "description": "Guiding international investors through 100% foreign ownership registration and MOCI regulations in Doha, Qatar."
    },
    sections: [
      {
        title: "Own Your Business with Full Control in Qatar",
        text: "Qatar has become one of the Middle East’s most attractive destinations for international investors and entrepreneurs. Previously, foreign investors commonly required a Qatari partner for company ownership structures. Today, under Qatar’s updated foreign investment framework, foreign investors can establish businesses with up to 100% foreign ownership in many approved sectors and business activities, subject to applicable regulations and approvals.\n\nThis major development has created new opportunities for entrepreneurs worldwide to establish and expand businesses in Qatar while maintaining full ownership and operational control of their companies."
      },
      {
        title: "What Does 100% Foreign Ownership Mean?",
        text: "100% foreign ownership allows non-Qatari investors to legally own all shares of a company without requiring a local Qatari shareholder for eligible business activities. This gives investors complete authority over:",
        points: [
          "Business ownership",
          "Company management",
          "Decision-making authority",
          "Profit distribution",
          "Business expansion strategies",
          "Operational control"
        ]
      },
      {
        title: "Business Activities Commonly Eligible for Foreign Ownership",
        text: "Many sectors may qualify for full ownership, depending on approvals and regulations, including:",
        points: [
          "Trading Activities",
          "E-commerce Businesses",
          "Contracting Companies",
          "Delivery & Logistics Services",
          "IT & Technology Companies",
          "Consulting Services",
          "Hospitality Businesses",
          "Educational & Training Services",
          "Manufacturing & Industrial Activities",
          "Healthcare Services",
          "Professional Service Businesses"
        ]
      },
      {
        title: "MOCI & Single Window Registration Support",
        text: "The Ministry of Commerce and Industry (MOCI) and Qatar’s Single Window system facilitate company registration and licensing procedures for investors.\n\nOur experienced team assists clients throughout the process, including:\n\n✔ Business activity selection\n✔ Ownership structure guidance\n✔ Commercial Registration (CR) processing\n✔ Trade License support\n✔ Government approvals\n✔ Legal documentation preparation\n✔ Company establishment support\n\nMOCI provides foreign ownership pathways depending on the selected activity and legal structure."
      },
      {
        title: "Benefits of 100% Foreign Ownership in Qatar",
        points: [
          "Full ownership and investment control",
          "Complete access to company profits",
          "Strong legal framework for investors",
          "Stable economic environment",
          "Strategic location connecting global markets",
          "Modern infrastructure and business facilities",
          "Opportunity for long-term business growth"
        ]
      }
    ]
  },
  "qatari-sponsor-services": {
    title: "Qatari Sponsor Services",
    id: "qatari-sponsor-services",
    description: "Trusted local partnership and Qatari sponsor arrangements structured to legally protect your investments.",
    icon: UserCheck,
    color: "bg-purple-500",
    lightColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    metaTitle: "Qatari Sponsor Services | Local Partner Setup Doha",
    metaDescription: "Find a reliable Qatari sponsor or local partner with Trek Group. Professional agreements protecting your business operations and capital in Qatar.",
    keywords: ["Qatari Sponsor Services", "Local Partner Qatar", "Doha business structure", "Sponsorship agreement Qatar"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Qatari Sponsor & Local Partnership Support",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Reliable Qatari Sponsor & Local Partnership Support in Qatar",
        text: "TREK Group Business Services provides professional assistance for investors and entrepreneurs who require or prefer a Qatari partner structure for their business activities in Qatar.\n\nAlthough many business activities in Qatar can now be established under foreign ownership structures, certain activities, regulatory requirements, or business preferences may still require or benefit from a Qatari partner arrangement. Our team helps clients identify the most suitable business structure based on legal requirements and long-term business goals."
      },
      {
        title: "What is a Qatari Sponsor / Local Partner?",
        text: "A Qatari sponsor or local partner arrangement is a business structure where a Qatari national participates according to the legal requirements and company structure applicable to the selected activity.\n\nDepending on the business model and agreement structure, a local partner relationship can provide advantages such as:",
        points: [
          "Local market understanding",
          "Business network opportunities",
          "Support with local business procedures",
          "Guidance on regulatory requirements",
          "Long-term business cooperation opportunities",
          "Stronger local business relationships"
        ]
      },
      {
        title: "Our Qatari Sponsor Services Include:",
        points: [
          "Assistance in identifying suitable local partnership structures",
          "Company structure consultation",
          "Sponsor and shareholder documentation support",
          "Commercial Registration (CR) support",
          "Trade License assistance",
          "Legal documentation preparation",
          "Shareholder agreement guidance",
          "Government approval coordination"
        ]
      }
    ]
  },
  "share-transfer-cr-amendments": {
    title: "Share Transfer & CR Amendments",
    id: "share-transfer-cr-amendments",
    description: "Manage company ownership modifications, shareholder changes, and Commercial Registration updates smoothly.",
    icon: FileText,
    color: "bg-rose-500",
    lightColor: "bg-rose-500/10",
    textColor: "text-rose-500",
    metaTitle: "Share Transfer & CR Amendments Qatar | Business Restructuring",
    metaDescription: "Professional support for share transfers, partner additions or removals, company name changes, and Commercial Registration (CR) amendments in Qatar.",
    keywords: ["Share Transfer Qatar", "CR Amendments Doha", "Company restructure Qatar", "Articles of Association amendments"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Share Transfer & CR Amendments",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Share Transfer & Company Amendment Services in Qatar",
        text: "TREK Group Business Services provides complete support for share transfer procedures and Commercial Registration (CR) amendments in Qatar, helping business owners make ownership and company structure changes smoothly and legally.\n\nAs businesses grow and change, owners may decide to sell their company, transfer ownership, add new shareholders, remove existing partners, or amend company information. These processes require proper documentation, legal procedures, and government approvals to ensure a smooth transition.\n\nOur experienced team manages the complete process from beginning to completion while reducing delays and administrative complexity."
      },
      {
        title: "What is Share Transfer?",
        text: "Share transfer is the legal process of transferring company ownership or shares from an existing shareholder to another individual or company. This process may include:",
        points: [
          "Full company ownership transfer",
          "Partial share transfer",
          "Addition of new shareholders",
          "Removal of existing shareholders",
          "Ownership restructuring",
          "Sponsor or partner changes (where applicable)"
        ]
      },
      {
        title: "What Are CR Amendments?",
        text: "Commercial Registration (CR) amendments involve updating company information in official records. Common CR amendment services include:",
        points: [
          "Shareholder information changes",
          "Company name amendments",
          "Business activity additions or modifications",
          "Capital amendments",
          "Partner additions or removals",
          "Address changes",
          "Management and authorized signatory updates",
          "Ownership structure changes"
        ]
      },
      {
        title: "Our Share Transfer & Amendment Services Include:",
        points: [
          "Document review and consultation",
          "Share transfer documentation preparation",
          "Sale and purchase agreement support",
          "Shareholder amendment support",
          "Commercial Registration (CR) modifications",
          "Articles of Association (AOA) amendments",
          "Government approval coordination (where applicable)",
          "Ministry documentation procedures",
          "Ministry of Justice sale deed assistance",
          "Corporate document updates"
        ]
      },
      {
        title: "Benefits of Professional Share Transfer Support",
        points: [
          "Saves time and administrative effort",
          "Reduces document-related errors",
          "Supports legal compliance",
          "Smooth ownership transition",
          "Proper documentation handling",
          "Faster processing procedures"
        ]
      }
    ]
  },
  "pro-services": {
    title: "PRO Services & Outsourcing",
    id: "pro-services",
    description: "Corporate government clearing, visa processing, document clearance, and automated compliance tracking.",
    icon: Award,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    metaTitle: "Corporate PRO Services Qatar | PRO Outsourcing Doha",
    metaDescription: "Save operational costs with Trek Group's Corporate PRO services. Monthly PRO outsourcing, ministry approvals, labor registrations, and ERP reminder systems.",
    keywords: ["PRO Services Qatar", "Corporate PRO Doha", "Document clearance Qatar", "PRO outsourcing solutions"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate PRO Services & PRO Outsourcing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Corporate PRO Services for Complete Business Support in Qatar",
        text: "TREK Group Business Services provides comprehensive Corporate PRO Services and PRO Outsourcing solutions in Qatar, supporting entrepreneurs, startups, SMEs, and corporate organizations with complete government documentation, ministry procedures, compliance management, and business support services.\n\nManaging a company in Qatar involves regular interactions with different government departments, documentation renewals, legal procedures, and regulatory requirements. Our experienced legal documentation and PRO team helps businesses simplify these processes by acting as a professional support partner for all company-related documentation and government coordination requirements."
      },
      {
        title: "What is PRO Outsourcing?",
        text: "Many businesses prefer outsourcing PRO services rather than maintaining a permanent in-house PRO employee or department. Keeping a permanent PRO can involve additional operational expenses including salaries, transportation, administration, and management costs.\n\nOur PRO outsourcing services help companies:",
        points: [
          "Reduce operational costs",
          "Reduce administrative workload",
          "Save time and resources",
          "Improve process efficiency",
          "Receive dedicated documentation support",
          "Focus on business growth and operations"
        ]
      },
      {
        title: "Our Corporate PRO Services Include:",
        points: [
          "Family visa and company-related visa assistance",
          "QID issuance and renewal support",
          "Commercial Registration (CR) services and renewals",
          "Trade License renewals and processing",
          "Company documentation renewals",
          "Company document modifications and amendments",
          "Shareholder and company structure updates",
          "Labour and immigration support services",
          "Corporate legal documentation assistance",
          "Government application procedures",
          "Ministry coordination and liaison services",
          "Company compliance support",
          "Corporate administration support",
          "Government documentation submissions",
          "Industry-specific documentation support"
        ]
      },
      {
        title: "Special Government Approval Services",
        text: "Depending on company activities and legal requirements, our team also assists with specialized government approvals and activity-related documentation procedures.\n\nSupport includes:",
        points: [
          "Traffic and transportation-related approvals (where applicable)",
          "Energy-sector approval support (where applicable)",
          "Sports activity licensing support (where applicable)",
          "Ministry-related activity approvals",
          "Specialized business activity documentation support"
        ]
      },
      {
        title: "Smart ERP-Based Document Management & Reminder System",
        text: "At TREK Group Business Services, our PRO outsourcing services are supported through an advanced ERP management system, helping entrepreneurs and companies stay organized and updated regarding important documentation and compliance requirements.\n\nThrough our ERP system, businesses receive timely notifications and status updates regarding important company documentation and renewal schedules.\n\nERP features include:",
        points: [
          "Document expiry notifications",
          "Commercial Registration (CR) renewal reminders",
          "Trade License renewal alerts",
          "Company document tracking",
          "Compliance reminders",
          "Centralized document monitoring",
          "Status updates and follow-up notifications"
        ]
      }
    ]
  },
  "legal-translation": {
    title: "Legal Translation Services",
    id: "legal-translation",
    description: "Certified legal and corporate translations recognized by government ministries in Qatar.",
    icon: Globe2,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    metaTitle: "Legal Translation Services in Qatar | Certified Translators",
    metaDescription: "Get fast and accurate certified legal translation in Doha. Arabic, English, French, Hindi, and Urdu translation for ministries, courts, and visas.",
    keywords: ["Legal Translation Qatar", "Certified translation Doha", "Arabic translation Qatar", "Ministry translation services"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Legal Translation Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Legal Translation Services in Qatar",
        text: "TREK Group Business Services provides reliable and professional Legal Translation Services in Qatar, supporting individuals, entrepreneurs, businesses, and organizations with accurate document translation solutions for official and professional use.\n\nLegal translation requires precision, confidentiality, and a clear understanding of legal terminology. Our experienced translation team works carefully to ensure documents are translated accurately while maintaining the original meaning and legal context.\n\nWe assist clients with both personal and corporate documentation requirements and provide fast, professional support for various translation needs."
      },
      {
        title: "Our Legal Translation Services Include:",
        points: [
          "Legal document translation",
          "Educational certificate translation",
          "Commercial document translation",
          "Court-related document translation",
          "Corporate document translation",
          "Medical document translation",
          "Visa and immigration document translation",
          "Business agreement translation",
          "Power of Attorney translation",
          "Memorandum and Articles translation",
          "Personal document translation",
          "Contracts and legal correspondence translation"
        ]
      },
      {
        title: "Language Translation Support",
        text: "We provide translation services across multiple languages based on client requirements, including:",
        points: [
          "Arabic ↔️ English",
          "Arabic ↔️ French",
          "Arabic ↔️ Hindi",
          "Arabic ↔️ Malayalam",
          "Arabic ↔️ Urdu",
          "Arabic ↔️ Various international languages"
        ]
      },
      {
        title: "Industries & Sectors We Support Include:",
        points: [
          "Business and corporate sector",
          "Legal sector",
          "Healthcare and medical sector",
          "Educational institutions",
          "Immigration and visa procedures",
          "Government-related documentation",
          "Commercial and industrial sectors"
        ]
      }
    ]
  },
  "certificate-attestation": {
    title: "Certificate Attestation Services",
    id: "certificate-attestation",
    description: "Complete authentication and attestation of educational, personal, and commercial documents from MOFA.",
    icon: FileCheck,
    color: "bg-amber-500",
    lightColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    metaTitle: "Certificate Attestation Qatar | MOFA Document Legalization",
    metaDescription: "Fast educational, marriage, and commercial certificate attestation in Qatar. Complete MOFA, Embassy, and foreign ministry legalization support.",
    keywords: ["Certificate Attestation Qatar", "MOFA attestation Doha", "Degree attestation Qatar", "Embassy attestation"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Certificate Attestation Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Certificate Attestation Services in Qatar",
        text: "TREK Group Business Services provides reliable and professional Certificate Attestation Services in Qatar, supporting individuals, professionals, students, entrepreneurs, and businesses with complete document authentication and attestation procedures.\n\nCertificate attestation is an important process for validating the authenticity of documents for official use in Qatar. Many government departments, employers, educational institutions, immigration authorities, and other organizations require properly attested documents for legal acceptance and processing.\n\nOur experienced documentation team manages the complete process and helps clients avoid delays and complicated procedures by providing smooth end-to-end support."
      },
      {
        title: "Our Certificate Attestation Services Include:",
        points: [
          "Educational certificate attestation",
          "Degree certificate attestation",
          "Diploma certificate attestation",
          "Marriage certificate attestation",
          "Birth certificate attestation",
          "Experience certificate attestation",
          "Commercial document attestation",
          "Business and corporate document attestation",
          "Medical certificate attestation",
          "Personal document attestation",
          "Legal document attestation"
        ]
      },
      {
        title: "Complete Attestation Process Support",
        text: "Our team assists with complete document processing requirements, which may include:",
        points: [
          "Home country authentication procedures",
          "Ministry-related document verification procedures",
          "Embassy attestation support",
          "Qatar Embassy attestation assistance",
          "Ministry of Foreign Affairs (MOFA) attestation support in Qatar",
          "Final documentation support for Qatar requirements"
        ]
      },
      {
        title: "International Document Support",
        text: "TREK Group Business Services supports document attestation procedures for clients from multiple countries and regions, including: India, Pakistan, Nepal, Bangladesh, Sri Lanka, Philippines, European countries, USA, GCC countries, and various international locations."
      }
    ]
  },
  "visa-services": {
    title: "Visa Services & Immigration Support",
    id: "visa-services",
    description: "Qatar family visit, residence, and work visas along with international Schengen, UK, and US visa application support.",
    icon: Plane,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-600/10",
    textColor: "text-emerald-600",
    metaTitle: "Visa Services Qatar | Residence & Work Visa Doha",
    metaDescription: "Immigration and visa services in Qatar. Assistance with family visit, residence, work visas, QID processing, and international visa applications.",
    keywords: ["Visa Services Qatar", "Immigration support Doha", "Work visa Qatar", "Family residence visa"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Visa Services & Immigration Support",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Visa Services and Documentation Support in Qatar",
        text: "TREK Group Business Services provides comprehensive Visa Services in Qatar and International Visa Documentation Support, helping individuals, families, professionals, entrepreneurs, and companies manage their visa requirements efficiently and professionally.\n\nOur experienced visa documentation team assists clients throughout the complete process — from document preparation and application support to appointment coordination and procedural guidance. We simplify the process and reduce the complexity involved in visa applications."
      },
      {
        title: "Qatar Visa Services Support Includes:",
        points: [
          "Family Visit Visa assistance",
          "Family Residence Visa support",
          "Work Visa documentation support",
          "Business Visa assistance",
          "Visit Visa support",
          "Entry Permit assistance",
          "Hayya Visa documentation support",
          "Company-related visa services",
          "Visa status and documentation assistance",
          "Medical and documentation coordination support",
          "QID issuance process support",
          "Post-arrival documentation assistance"
        ]
      },
      {
        title: "International Visa Documentation Services",
        text: "TREK Group Business Services also provides professional documentation support for international visa applications. Support includes:",
        points: [
          "Schengen Visa documentation assistance",
          "USA Visa documentation support",
          "Canada Visa documentation support",
          "UK Visa documentation support",
          "France Visa documentation support",
          "Europe travel visa support",
          "Tourist Visa documentation support",
          "Business Visa documentation support",
          "Family and visit visa documentation assistance"
        ]
      },
      {
        title: "Complete Documentation & Appointment Assistance",
        text: "Our visa support process may include: Document review and preparation, Application form assistance, Appointment booking support, Required document guidance, Application coordination support, Travel-related documentation assistance, and Follow-up support."
      }
    ]
  },
  "corporate-bank-account-assistance": {
    title: "Corporate Bank Account Assistance",
    id: "corporate-bank-account-assistance",
    description: "Guidance on opening business bank accounts, salary coordination, WPS, and POS merchant solutions.",
    icon: Landmark,
    color: "bg-purple-600",
    lightColor: "bg-purple-600/10",
    textColor: "text-purple-600",
    metaTitle: "Corporate Bank Account Qatar | Business Banking Doha",
    metaDescription: "Open a corporate bank account in Qatar easily. Trek Group helps prepare financial profiles, coordinates bank applications, WPS payroll, and POS systems.",
    keywords: ["Corporate Bank Account Qatar", "Open business bank account Doha", "Wage Protection System Qatar", "Business banking support"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate Bank Account Assistance",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Corporate & Personal Bank Account Assistance in Qatar",
        text: "TREK Group Business Services provides professional Corporate Bank Account Assistance and Banking Support Services in Qatar, helping entrepreneurs, startups, SMEs, investors, and companies simplify the banking process and complete documentation requirements efficiently.\n\nOpening a corporate bank account can require proper company documentation, compliance procedures, appointments, and banking requirements. Our experienced team assists clients throughout the process by coordinating documentation requirements and supporting communication procedures."
      },
      {
        title: "Corporate Banking Assistance Services",
        points: [
          "Corporate bank account assistance",
          "SME bank account assistance",
          "Startup business banking support",
          "Business account documentation support",
          "Banking application coordination",
          "Appointment scheduling support",
          "Corporate compliance document assistance",
          "Business profile and supporting document preparation"
        ]
      },
      {
        title: "Personal Banking Assistance Services",
        points: [
          "Personal bank account support",
          "Salary account assistance",
          "Resident banking support",
          "Banking documentation assistance"
        ]
      },
      {
        title: "Banking Support for Leading Financial Institutions",
        text: "Our team can assist clients with documentation and banking procedures for various financial institutions in Qatar based on eligibility and requirements, including: Qatar National Bank, Commercial Bank of Qatar, Qatar Islamic Bank, Qatar International Islamic Bank, Doha Bank, and other banking institutions."
      },
      {
        title: "WPS & Corporate Payment Support Services",
        points: [
          "WPS (Wage Protection System) assistance",
          "Salary transfer coordination support",
          "Corporate payroll support",
          "Pay card support services",
          "POS machine assistance",
          "Merchant service support",
          "Corporate payment solution guidance"
        ]
      },
      {
        title: "Additional Business Support Services",
        points: [
          "Corporate telecom coordination support",
          "Business connectivity service assistance",
          "Business utility coordination support",
          "Corporate operational support services"
        ]
      }
    ]
  },
  "tax-documentation-support": {
    title: "Tax & Audit Documentation Support",
    id: "tax-documentation-support",
    description: "Audit preparation support, financial document organization, and licensed auditor coordination.",
    icon: Calculator,
    color: "bg-amber-600",
    lightColor: "bg-amber-600/10",
    textColor: "text-amber-600",
    metaTitle: "Tax & Audit Documentation Qatar | Bookkeeping Support",
    metaDescription: "Prepare for audit compliance in Qatar. Organize financial records, audit documentation, and connect with licensed audit professionals in Doha.",
    keywords: ["Tax Documentation Qatar", "Audit support Doha", "Bookkeeping compliance Qatar", "Licensed auditor coordination"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Tax & Audit Documentation Support",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Professional Tax & Audit Documentation Support in Qatar",
        text: "TREK Group Business Services provides reliable Tax and Audit Documentation Support Services in Qatar, helping entrepreneurs, startups, SMEs, and companies organize and prepare the required documents for audit and compliance procedures.\n\nMaintaining proper financial records and documentation is an important part of business operations and regulatory compliance. Our team supports businesses by simplifying document collection, organization, and coordination requirements while assisting clients throughout the process.\n\nFor audit-related requirements, we also help connect clients with qualified and authorized audit professionals and firms according to business requirements."
      },
      {
        title: "Our Tax & Audit Documentation Support Services Include:",
        points: [
          "Audit document preparation support",
          "Financial document organization assistance",
          "Corporate documentation coordination",
          "Company record preparation support",
          "Documentation review assistance",
          "Compliance document support",
          "Business document collection and arrangement",
          "Audit coordination support",
          "Corporate record management assistance",
          "Government-related documentation support"
        ]
      },
      {
        title: "Professional Audit Coordination Support",
        text: "TREK Group Business Services assists clients by coordinating and facilitating communication with professional audit and accounting specialists where required. Support includes:\n\n✔ Coordination with licensed audit professionals\n✔ Assistance with audit documentation requirements\n✔ Business information and document collection support\n✔ Follow-up coordination assistance\n✔ Guidance regarding documentation procedures"
      },
      {
        title: "Why Businesses Need Proper Audit Documentation Support",
        points: [
          "Helps maintain organized business records",
          "Reduces documentation delays",
          "Supports regulatory compliance requirements",
          "Simplifies audit preparation procedures",
          "Saves time and administrative effort",
          "Improves business process management"
        ]
      }
    ]
  },
  "software-services": {
    title: "Software Services & Web Development",
    id: "software-services",
    description: "Custom software development, website design, ERP implementation, and digital growth systems.",
    icon: Code2,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    metaTitle: "Software Services & Web Development Qatar | Custom Systems",
    metaDescription: "Grow your business online. Custom software development, mobile apps, ERP implementation, digital marketing, and web design in Doha.",
    keywords: ["Software Services Qatar", "Web Development Doha", "ERP implementation Qatar", "Mobile app development"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Software Services & Web Development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Empower Your Qatar Business with Advanced Software & Digital Systems",
        text: "In the modern business landscape of Doha and the wider GCC region, digital infrastructure is just as important as legal registration. At TREK Group, we provide comprehensive, premium software engineering, custom web development, and digital integration services to help newly formed companies and established corporations launch, optimize, and scale their business operations successfully.\n\nOur professional tech team designs custom digital systems that improve operational efficiency, automate repetitive administration tasks, secure company records, and drive online lead generation."
      },
      {
        title: "AI Services & Process Automations",
        text: "Leverage the power of Artificial Intelligence to optimize your workflows and lower operational expenses. We configure custom automated setups including:",
        points: [
          "Custom AI Chatbots & Customer Care Automations",
          "Robotic Process Automation (RPA) for corporate administration",
          "Automated Document Processing & Classification systems",
          "AI-driven lead qualification and CRM routing",
          "Business Intelligence dashboards and reporting"
        ]
      },
      {
        title: "Custom Web & Mobile App Development",
        text: "Your website is your digital corporate storefront. We build modern, highly secure, fast-loading websites and applications designed for maximum conversion rates:",
        points: [
          "Enterprise React, Next.js, and Node.js Web Applications",
          "Mobile Apps for iOS & Android (React Native & Flutter)",
          "B2B and B2C E-commerce platform development",
          "Custom Client Portals and Database management systems",
          "Corporate Branding & Company Profile design"
        ]
      },
      {
        title: "ERP Implementations & CRM Integrations",
        text: "Ensure your team is aligned and compliant with Qatari corporate regulations. We setup and custom-configure enterprise software platforms:",
        points: [
          "Odoo ERP, SAP, and custom cloud ERP setups",
          "Salesforce and HubSpot CRM onboarding & pipelines",
          "Wage Protection System (WPS) compliant payroll integrations",
          "Custom Inventory, HR, and Accounting system modules",
          "Client onboarding portals for service-oriented firms"
        ]
      },
      {
        title: "Digital Marketing, SEO & Local Search Growth",
        text: "Get visible on Google when prospective clients search for your services in Doha, KSA, UAE, and other GCC countries. Our digital growth strategies include:",
        points: [
          "Localized Doha & Qatar Search Engine Optimization (SEO)",
          "Google Ads (PPC) and lead-generation campaign setups",
          "Social media strategy for B2B and B2C markets",
          "Performance content copywriting and brand building",
          "Analytics tracking, conversions tracking & GTM setup"
        ]
      },
      {
        title: "IT Support, Cloud & Corporate Cyber Security",
        text: "We protect your digital enterprise assets and establish secure channels of communication:",
        points: [
          "Google Workspace (G Suite) & Microsoft 365 migrations",
          "AWS, Google Cloud (GCP), and Microsoft Azure deployment",
          "Secure VPNs, Firewalls, and IT Network consultations",
          "Regular IT maintenance contracts and Helpdesk support",
          "Data privacy compliance under Qatar's protection frameworks"
        ]
      }
    ]
  },
  "additional-business-services": {
    title: "Additional Business Services",
    id: "additional-business-services",
    description: "Office setup coordination, interior fit-outs, typing, and company cancellation/closure procedures.",
    icon: ArrowRight,
    color: "bg-secondary",
    lightColor: "bg-secondary/10",
    textColor: "text-secondary",
    metaTitle: "Other Business Support Services Qatar | Office Fit-outs Doha",
    metaDescription: "Comprehensive administrative solutions in Doha. Office setup coordination, interior fit-outs, professional typing, and company closure services.",
    keywords: ["Business Support Qatar", "Office fit-outs Doha", "Typing services Qatar", "Company closure Doha"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Additional Business Support Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Trek Group Qatar"
      },
      "areaServed": "QA"
    },
    sections: [
      {
        title: "Complete Business Support Solutions Beyond Core Services",
        text: "TREK Group Business Services provides additional business support solutions designed to help entrepreneurs, individuals, startups, SMEs, and corporate organizations manage their business operations smoothly in Qatar.\n\nBeyond company formation, PRO services, visas, legal translation, documentation support, and business consultancy, our experienced team provides various additional services to simplify day-to-day business requirements and support long-term growth."
      },
      {
        title: "Our Additional Services Include:",
        points: [
          "Professional typing and documentation services",
          "Government application preparation support",
          "Official form preparation and submission assistance",
          "Business consultancy and advisory services",
          "Company profile design and preparation",
          "Website development coordination support",
          "Business branding support",
          "Corporate profile and presentation support",
          "Office setup coordination assistance",
          "Interior design and office fit-out support",
          "Corporate administration assistance",
          "Business process guidance",
          "Company cancellation and closure support",
          "Trade License amendment support",
          "Business activity addition and modification support",
          "Shareholder documentation support",
          "Corporate compliance coordination",
          "Government correspondence preparation",
          "Letter drafting and business document preparation",
          "Power of Attorney documentation support",
          "Agreement and contract preparation assistance",
          "Corporate document organization services"
        ]
      },
      {
        title: "Personal Documentation Support Services",
        text: "We also support individuals with documentation requirements including:",
        points: [
          "Personal document typing support",
          "Application preparation assistance",
          "Educational documentation support",
          "Immigration documentation support",
          "Certificate processing support",
          "Translation-related documentation coordination"
        ]
      },
      {
        title: "Business Consultancy & Entrepreneur Support",
        text: "Our team assists entrepreneurs throughout different stages of their business journey, including:",
        points: [
          "Business setup consultation",
          "Investment guidance support",
          "Company structure consultation",
          "Business process support",
          "Startup guidance assistance",
          "Corporate operational consultation"
        ]
      }
    ]
  }
};
