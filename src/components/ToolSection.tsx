import { useState, useEffect } from "react";
import { Code, Database, Globe, Smartphone } from "lucide-react";

export default function ToolsSection() {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    const newIsDark = document.documentElement.classList.contains('dark');
                    setIsDark(newIsDark);
                }
            });
        });
            
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const professionalSkills = [
        {
        category: "Frontend Development",
        icon: Code,
        skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
        color: "blue",
        description: "Modern web interfaces with responsive design and optimal UX"
        },
        {
        category: "Backend Development", 
        icon: Database,
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
        color: "green",
        description: "Scalable server architectures and robust database solutions"
        },
        {
        category: "Mobile Development",
        icon: Smartphone,
        skills: ["React Native", "Flutter", "iOS", "Android", "Expo"],
        color: "purple",
        description: "Cross-platform mobile applications with native performance"
        },
        {
        category: "DevOps & Cloud",
        icon: Globe,
        skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Linux"],
        color: "orange",
        description: "Infrastructure automation and cloud deployment strategies"
        }
    ];

    return (
        <div>

        </div>
    );
}
