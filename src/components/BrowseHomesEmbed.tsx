"use client";

import { useEffect, useMemo, useState } from "react";

const BROWSE_HOMES_ASSET_ORIGIN =
    process.env.NEXT_PUBLIC_BROWSE_HOMES_ASSET_ORIGIN || "https://main.d4rwkr9dnusc5.amplifyapp.com";
const BROWSE_HOMES_SCOPE_CLASS = "pathway-browse-homes-scope";
const BROWSE_HOMES_ACTIVE_CLASS = "pathway-browse-homes-active";
const BROWSE_HOMES_ASSET_ATTR = "data-pathway-browse-homes";
const BROWSE_HOMES_SCOPED_ATTR = "data-pathway-browse-homes-scoped";
const BROWSE_HOMES_SCOPE_SELECTOR = `.${BROWSE_HOMES_SCOPE_CLASS}`;

function splitSelectors(selectorText: string) {
    const selectors: string[] = [];
    let current = "";
    let depth = 0;
    let quote: string | null = null;

    for (let index = 0; index < selectorText.length; index += 1) {
        const char = selectorText[index];
        const previous = selectorText[index - 1];

        if (quote) {
            current += char;
            if (char === quote && previous !== "\\") quote = null;
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            current += char;
            continue;
        }

        if (char === "(" || char === "[") depth += 1;
        if (char === ")" || char === "]") depth -= 1;

        if (char === "," && depth === 0) {
            selectors.push(current.trim());
            current = "";
            continue;
        }

        current += char;
    }

    if (current.trim()) selectors.push(current.trim());
    return selectors;
}

function scopeSingleSelector(selector: string) {
    if (!selector) return selector;
    if (selector.startsWith(BROWSE_HOMES_SCOPE_SELECTOR)) return selector;
    if (selector === "body" || selector === "html" || selector === ":root") {
        return BROWSE_HOMES_SCOPE_SELECTOR;
    }
    if (selector.startsWith("body ") || selector.startsWith("html ")) {
        return `${BROWSE_HOMES_SCOPE_SELECTOR} ${selector.replace(/^(body|html)\s+/, "")}`;
    }
    if (selector.startsWith(":root ")) {
        return `${BROWSE_HOMES_SCOPE_SELECTOR} ${selector.replace(/^:root\s+/, "")}`;
    }
    if (selector === "*") return `${BROWSE_HOMES_SCOPE_SELECTOR} *`;
    return `${BROWSE_HOMES_SCOPE_SELECTOR} ${selector}`;
}

function scopeSelectors(selectorText: string) {
    return splitSelectors(selectorText).map(scopeSingleSelector).join(",");
}

function removeStarResetDeclarations(prelude: string, body: string) {
    const selectors = splitSelectors(prelude);
    const isGlobalStarRule =
        selectors.length > 0 &&
        selectors.every((selector) => {
            const normalized = selector.replace(/\s+/g, "").toLowerCase();
            return (
                normalized === "*" ||
                normalized === ":before" ||
                normalized === ":after" ||
                normalized === "::before" ||
                normalized === "::after" ||
                normalized === "*:before" ||
                normalized === "*:after" ||
                normalized === "*::before" ||
                normalized === "*::after"
            );
        });
    if (!isGlobalStarRule) return body;

    return body
        .replace(/(^|;)\s*box-sizing\s*:[^;]*;?/gi, "$1")
        .replace(/(^|;)\s*margin\s*:[^;]*;?/gi, "$1")
        .replace(/(^|;)\s*padding\s*:[^;]*;?/gi, "$1")
        .trim();
}

function findMatchingBrace(css: string, openBraceIndex: number) {
    let depth = 0;
    let quote: string | null = null;

    for (let index = openBraceIndex; index < css.length; index += 1) {
        const char = css[index];
        const previous = css[index - 1];

        if (quote) {
            if (char === quote && previous !== "\\") quote = null;
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }

        if (char === "{") depth += 1;
        if (char === "}") {
            depth -= 1;
            if (depth === 0) return index;
        }
    }

    return -1;
}

function scopeCssRules(css: string) {
    let output = "";
    let index = 0;
    const source = css.replace(/@charset\s+["'][^"']+["'];/gi, "");

    while (index < source.length) {
        const openBraceIndex = source.indexOf("{", index);
        if (openBraceIndex === -1) {
            output += source.slice(index);
            break;
        }

        const prelude = source.slice(index, openBraceIndex).trim();
        const closeBraceIndex = findMatchingBrace(source, openBraceIndex);
        if (closeBraceIndex === -1) {
            output += source.slice(index);
            break;
        }

        const body = source.slice(openBraceIndex + 1, closeBraceIndex);
        const sanitizedBody = removeStarResetDeclarations(prelude, body);
        const lowerPrelude = prelude.toLowerCase();

        if (lowerPrelude.startsWith("@media") || lowerPrelude.startsWith("@supports")) {
            output += `${prelude}{${scopeCssRules(body)}}`;
        } else if (
            lowerPrelude.startsWith("@font-face") ||
            lowerPrelude.startsWith("@keyframes") ||
            lowerPrelude.startsWith("@-webkit-keyframes")
        ) {
            output += `${prelude}{${body}}`;
        } else if (!lowerPrelude.startsWith("@charset")) {
            output += `${scopeSelectors(prelude)}{${sanitizedBody}}`;
        }

        index = closeBraceIndex + 1;
    }

    return output;
}

function shouldScopeDynamicStyle(style: HTMLStyleElement) {
    const marker = style.getAttribute("data-emotion");
    if (marker) return true;
    const text = style.textContent || "";
    return text.includes(".Mui") || text.includes(".Search") || text.includes(".Property");
}

function extractCssText(styleTag: HTMLStyleElement) {
    const inlineCss = (styleTag.textContent || "").trim();
    if (inlineCss) return inlineCss;

    try {
        const rules = styleTag.sheet?.cssRules;
        if (!rules || rules.length === 0) return "";
        return Array.from(rules)
            .map((rule) => rule.cssText)
            .join("\n");
    } catch {
        return "";
    }
}

function isBrowseHomesCssLink(link: HTMLLinkElement) {
    const href = link.getAttribute("href") || "";
    if (!href) return false;
    return href.includes("/static/css/main.css") || href.includes(`${BROWSE_HOMES_ASSET_ORIGIN}/static/css/main.css`);
}

interface BrowseHomesEmbedProps {
    assetVersion: string;
    initialPath: string;
    initialSearch?: string;
}

function assetUrl(assetPath: string, assetVersion: string) {
    return `${BROWSE_HOMES_ASSET_ORIGIN}${assetPath}?v=${encodeURIComponent(assetVersion)}`;
}

export default function BrowseHomesEmbed({ assetVersion, initialPath, initialSearch }: BrowseHomesEmbedProps) {
    const [loadError, setLoadError] = useState(false);
    const initialUrl = useMemo(() => `${initialPath}${initialSearch || ""}`, [initialPath, initialSearch]);

    useEffect(() => {
        const application = document.getElementById("root");
        if (!application) return;

        setLoadError(false);
        document.body.classList.add(BROWSE_HOMES_ACTIVE_CLASS);
        document.querySelectorAll(`[${BROWSE_HOMES_ASSET_ATTR}="true"]`).forEach((element) => {
            element.remove();
        });

        application.innerHTML = '<div class="browse-homes-loading">Loading available homes...</div>';
        let isMounted = true;
        const processedStyles = new WeakMap<HTMLStyleElement, string>();

        const style = document.createElement("link");
        style.href = `/api/browse-homes-css?v=${encodeURIComponent(assetVersion)}`;
        style.rel = "stylesheet";
        style.setAttribute(BROWSE_HOMES_ASSET_ATTR, "true");
        style.onerror = () => setLoadError(true);

        const script = document.createElement("script");
        script.src = assetUrl("/static/js/main.js", assetVersion);
        script.defer = true;
        script.setAttribute(BROWSE_HOMES_ASSET_ATTR, "true");
        script.onerror = () => setLoadError(true);

        const scopeStyleTag = (styleTag: HTMLStyleElement) => {
            if (!shouldScopeDynamicStyle(styleTag)) return;
            const originalCss = extractCssText(styleTag);
            if (!originalCss) return;
            if (processedStyles.get(styleTag) === originalCss) return;

            styleTag.textContent = scopeCssRules(originalCss);
            styleTag.setAttribute(BROWSE_HOMES_SCOPED_ATTR, "true");
            styleTag.setAttribute(BROWSE_HOMES_ASSET_ATTR, "true");
            processedStyles.set(styleTag, originalCss);
        };

        const styleObserver = new MutationObserver((mutations) => {
            if (!isMounted) return;
            for (const mutation of mutations) {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLStyleElement) {
                        scopeStyleTag(node);
                    }
                    if (node instanceof HTMLLinkElement && isBrowseHomesCssLink(node)) {
                        node.remove();
                    }
                });
                if (mutation.target instanceof HTMLStyleElement) {
                    scopeStyleTag(mutation.target);
                }
            }
        });

        style.onload = () => {
            if (!isMounted) return;
            const currentUrl = `${window.location.pathname}${window.location.search}`;
            if (initialUrl !== currentUrl) {
                window.history.replaceState(window.history.state, "", initialUrl);
            }
            document.head.querySelectorAll("style").forEach((node) => {
                if (node instanceof HTMLStyleElement) scopeStyleTag(node);
            });
            document.head.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
                if (node instanceof HTMLLinkElement && isBrowseHomesCssLink(node)) {
                    node.remove();
                }
            });
            styleObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
            document.body.appendChild(script);
        };

        document.head.appendChild(style);

        return () => {
            isMounted = false;
            document.body.classList.remove(BROWSE_HOMES_ACTIVE_CLASS);
            styleObserver.disconnect();
            style.remove();
            script.remove();
        };
    }, [assetVersion, initialUrl]);

    return (
        <section className="bg-light-beige px-4 pt-24 md:px-6 md:pt-28">
            <div className="w-full pb-10 md:pb-12">
                <div
                    style={{ minHeight: "85vh" }}
                    className={`${BROWSE_HOMES_SCOPE_CLASS} overflow-x-hidden overflow-y-auto rounded-xl border border-medium-teal/12 bg-white text-left shadow-[0_10px_30px_rgba(0,57,74,0.08)]`}>
                    <div id="root" />
                    {loadError && (
                        <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center text-sm font-semibold text-medium-teal">
                            Available homes could not be loaded. Please refresh the page.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
