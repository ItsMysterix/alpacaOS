export const PORTFOLIO_DATA = {
    personal: {
        name: "Arkaparna Gantait",
        role: "Software Engineer",
        tagline: "Building scalable, user-centric web applications and AI solutions.",
        about: "I'm a Software Engineer and BS CS graduate from Georgia State University with a passion for building full-stack applications and AI-driven tools. I thrive at the intersection of product logic and engineering reliability.",
        location: "Atlanta, GA",
        email: "arkaparnagantait@gmail.com", // Placeholder based on context, will use mailto
        image: "/placeholder-user.jpg" // Using placeholder for now
    },
    socials: {
        github: "https://github.com/ItsMysterix",
        linkedin: "https://linkedin.com/in/arka-gantait",
        twitter: "https://twitter.com",
        email: "mailto:your.email@example.com"
    },
    projects: [
        {
            id: "slurpy",
            name: "Slurpy AI",
            description: "A multi-persona AI chatbot designed to provide mental health support using RAG and fine-tuned models.",
            tech: ["FastAPI", "Supabase", "DistilBERT", "Qdrant", "Next.js"],
            link: "https://slurpy.life",
            github: null,
            features: [
                "Utilizes Retrieval-Augmented Generation (RAG) for accurate, context-aware responses.",
                "Features fine-tuned DistilBERT models for sentiment analysis and empathy.",
                "Supports multiple distinct AI personas tailored to different user needs.",
                "Built with FastAPI for high-performance concurrent request handling.",
                "Integrates Qdrant vector database for semantic search capabilities."
            ]
        },
        {
            id: "sarge",
            name: "Sarge Ops",
            description: "Self-service infrastructure management platform with real-time CI/CD monitoring.",
            tech: ["Docker", "Prometheus", "Grafana", "AWS", "Nginx"],
            link: "https://v0-sarge.vercel.app",
            github: null,
            features: [
                "Provides a self-service dashboard for managing infrastructure resources.",
                "Real-time monitoring and alerting via Prometheus and Grafana integration.",
                "Automated CI/CD pipelines for seamless deployment workflows.",
                "Containerized microservices architecture using Docker.",
                "Secure reverse proxy configuration with Nginx and SSL termination."
            ]
        },
        {
            id: "notoria",
            name: "Notoria",
            description: "Mobile application for academic collaboration featuring real-time notes and RBAC.",
            tech: ["Flutter", "Firebase", "Dart", "Mobile"],
            link: null,
            github: "https://github.com/ItsMysterix/notoria",
            features: [
                "Real-time collaborative note-taking with smooth synchronization.",
                "Role-Based Access Control (RBAC) for secure group management.",
                "Cross-platform mobile performance using Flutter framework.",
                "Firebase backend for authentication and real-time database updates.",
                "Offline-first architecture ensuring data availability without internet."
            ]
        }
    ],
    experience: [
        {
            company: "Georgia State University",
            role: "CS Tutor",
            period: "Aug 2023 - Present",
            description: "Mentored 50+ students in Data Structures and Algorithms."
        },
        {
            company: "Georgia State University",
            role: "Student Assistant",
            period: "Jan 2023 - May 2023",
            description: "Assisted in grading and curriculum development for CS courses."
        }
    ],
    skills: [
        "JavaScript/TypeScript", "React", "Next.js", "Python", "FastAPI",
        "Node.js", "Docker", "AWS", "SQL", "Git", "Tailwind CSS"
    ]
}
