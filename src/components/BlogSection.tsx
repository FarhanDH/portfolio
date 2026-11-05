import { useState } from "react";
import { BookOpen, Clock, ChevronRight, X } from "lucide-react";
import { type BlogPost, FALLBACK_BLOG_POSTS } from "../data/blogData";

const blogPosts = FALLBACK_BLOG_POSTS;

export default function BlogSection() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <section
            id="blog"
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
        >
            <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Technical Writing
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Engineering Notes &amp; Case Studies
                </h2>
                <p className="text-sm text-muted-foreground">
                    Architectural decisions, trade-offs, and lessons learned
                    from building backend and cloud services.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-secondary hover:bg-accent/70 hover:border-foreground/30 hover:scale-[1.008] active:scale-[0.995] transition-all duration-200 cursor-pointer shadow-2xs"
                    >
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                                <span>{post.date}</span>
                                <span>·</span>
                                <span className="inline-flex items-center gap-1">
                                    <Clock size={12} />
                                    {post.readTime}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded bg-card border border-border text-[11px] text-foreground font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                                {post.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {post.summary}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPost(post);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-card group-hover:bg-primary group-hover:text-primary-foreground hover:scale-105 active:scale-95 text-foreground border border-border transition-all duration-200 cursor-pointer self-start sm:self-center flex-shrink-0 shadow-2xs"
                        >
                            <BookOpen size={13} />
                            <span>Read Case Study</span>
                            <ChevronRight size={13} />
                        </button>
                    </article>
                ))}
            </div>

            {/* Case Study Reader Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                        onClick={() => setSelectedPost(null)}
                    />
                    <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <span>{selectedPost.date}</span>
                                    <span>·</span>
                                    <span>{selectedPost.readTime}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                                    {selectedPost.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="p-2 rounded-lg border border-border bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-105 active:scale-95 text-foreground transition-all duration-200 cursor-pointer shadow-2xs"
                                aria-label="Close case study"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Pipeline Rail: Problem -> Decision -> Implementation -> Outcome */}
                        <div className="relative pl-7 mt-6 space-y-6">
                            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-border" />

                            {[
                                {
                                    stage: "01. Problem",
                                    content: selectedPost.caseStudy.problem,
                                },
                                {
                                    stage: "02. Architectural Decision",
                                    content: selectedPost.caseStudy.decision,
                                },
                                {
                                    stage: "03. Implementation",
                                    content:
                                        selectedPost.caseStudy.implementation,
                                },
                                {
                                    stage: "04. Outcome & Impact",
                                    content: selectedPost.caseStudy.outcome,
                                },
                            ].map((step) => (
                                <div key={step.stage} className="relative">
                                    <span className="absolute -left-7 top-1 w-4 h-4 rounded-full border-2 border-foreground bg-card flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                                            {step.stage}
                                        </span>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                                {selectedPost.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
