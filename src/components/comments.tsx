"use client";

import Giscus from "@giscus/react";
import { siteConfig } from "@/config/site";

export function Comments() {
    if (!siteConfig.giscus) return null;
    const g = siteConfig.giscus;

    return (
        <div className="mt-20 w-full">
            <Giscus
                id="comments"
                repo={g.repo}
                repoId={g.repoId}
                category={g.category}
                categoryId={g.categoryId}
                mapping="pathname"
                term=""
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="transparent_dark"
                lang={g.lang}
                loading="lazy"
            />
        </div>
    );
}
