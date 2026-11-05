import { Cpu, Server, Database, Globe, Shield } from "lucide-react";
import {
    INFRA_NODES,
    GO_API_ENDPOINTS,
    type InfraNodeItem,
} from "../data/infrastructureData";

export default function InfrastructureSection() {
    const renderIcon = (key: InfraNodeItem["iconKey"]) => {
        switch (key) {
            case "globe":
                return <Globe size={16} />;
            case "server":
                return <Server size={16} />;
            case "database":
                return <Database size={16} />;
            case "shield":
                return <Shield size={16} />;
        }
    };

    return (
        <section
            id="infrastructure"
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
        >
            <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Under the Hood
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    System Architecture &amp; DevOps
                </h2>
                <p className="text-sm text-muted-foreground">
                    Rather than a static template, this portfolio is backed by a
                    custom Golang REST API, containerized workflows, and
                    resilient client architecture.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INFRA_NODES.map((node) => (
                    <div
                        key={node.layer}
                        className="flex flex-col gap-2.5 p-5 rounded-xl bg-secondary border border-border"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-card text-foreground border border-border">
                                {renderIcon(node.iconKey)}
                            </div>
                            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {node.layer}
                            </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                            {node.tech}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {node.detail}
                        </p>
                    </div>
                ))}
            </div>

            {/* API Endpoints Strip */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-foreground">
                    <Cpu size={15} />
                    <span className="font-semibold">Go API Endpoints:</span>
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    {GO_API_ENDPOINTS.map((ep) => (
                        <span
                            key={ep.label}
                            className={`px-2.5 py-1 rounded-md bg-card border border-border ${
                                ep.active
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {ep.label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
