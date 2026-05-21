const REMOTE_ASSET_ORIGIN =
    process.env.NEXT_PUBLIC_BROWSE_HOMES_ASSET_ORIGIN || "https://new-pathway-dev.d36b42kego3ml9.amplifyapp.com";
const SCOPE_SELECTOR = ".pathway-browse-homes-scope";
const ACTIVE_BODY_SELECTOR = "body.pathway-browse-homes-active";

const GLOBAL_PORTAL_SELECTORS = [".MuiPopover-root", ".MuiBackdrop-invisible", ".MuiMenu-paper", ".MuiDialog-root"];

export const dynamic = "force-dynamic";

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
    if (selector.startsWith(SCOPE_SELECTOR)) return selector;
    if (GLOBAL_PORTAL_SELECTORS.some((portalSelector) => selector.startsWith(portalSelector))) {
        return `${ACTIVE_BODY_SELECTOR} ${selector}`;
    }
    if (selector === "body" || selector === "html" || selector === ":root") {
        return SCOPE_SELECTOR;
    }
    if (selector.startsWith("body ") || selector.startsWith("html ")) {
        return `${SCOPE_SELECTOR} ${selector.replace(/^(body|html)\s+/, "")}`;
    }
    if (selector.startsWith(":root ")) {
        return `${SCOPE_SELECTOR} ${selector.replace(/^:root\s+/, "")}`;
    }
    if (selector === "*") return `${SCOPE_SELECTOR} *`;
    return `${SCOPE_SELECTOR} ${selector}`;
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

function rewriteAssetUrls(css: string) {
    return css.replace(/url\((['"]?)\/static\//g, `url($1${REMOTE_ASSET_ORIGIN}/static/`);
}

function embedOverrides() {
    return `
${SCOPE_SELECTOR} {
  height: calc(100vh - 180px);
  min-height: 620px;
}

@media (min-width: 768px) {
  ${SCOPE_SELECTOR} {
    height: calc(100vh - 190px);
    min-height: 680px;
  }
}

${SCOPE_SELECTOR} #application,
${SCOPE_SELECTOR} #application > div,
${SCOPE_SELECTOR} .Search,
${SCOPE_SELECTOR} .Property {
  height: 100% !important;
  min-height: 100% !important;
}

${SCOPE_SELECTOR} .Search .app-bar,
${SCOPE_SELECTOR} .Property .app-bar {
  display: none !important;
}



${SCOPE_SELECTOR} .Search .MuiGrid-container {
  height: 100% !important;
  min-height: 100% !important;
  overflow: hidden !important;
}

@media (min-width: 1024px) {


  ${SCOPE_SELECTOR} .Search .location-container .MuiGrid-container > .MuiGrid-item:first-child,
  ${SCOPE_SELECTOR} .Search .location-container .MuiGrid-container > div:first-child {
    align-self: flex-start;
    height: 100% !important;
    min-height: 100% !important;
    overflow: hidden !important;
    position: sticky;
    top: 0;
  }

  ${SCOPE_SELECTOR} .Search .location-container .MuiGrid-container > .MuiGrid-item:last-child,
  ${SCOPE_SELECTOR} .Search .location-container .MuiGrid-container > div:last-child {
    height: 100% !important;
    min-height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  ${SCOPE_SELECTOR} .Search .location-container .list-container,
  ${SCOPE_SELECTOR} .Search .location-container [class*="list-container"],
  ${SCOPE_SELECTOR} .Search .location-container [class*="property-list"],
  ${SCOPE_SELECTOR} .Search .location-container [class*="listing"] {
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }
}

@media (max-width: 767px) {
    ${SCOPE_SELECTOR} .css-1ttcz3u {
        margin-top: 8px !important;
    }
}

@media (max-width: 767px) {
    ${SCOPE_SELECTOR} .css-5v2h63 {
        margin-top: 0px !important;
    }
}

${SCOPE_SELECTOR} .Property .css-1dwj6g9 {
    top: 113px;
    width: calc(100% - 52px);
    border-radius: 12px;
    border-top: none;
    margin-left: 0px;
}

@media (max-width: 767px) {
    ${SCOPE_SELECTOR} .Property .css-1dwj6g9 {
        margin-left: 8px;
    }
}





${SCOPE_SELECTOR} .browse-homes-loading {
  align-items: center;
  color: #004f68;
  display: flex;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  height: 100%;
  justify-content: center;
  min-height: 420px;
}
`;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const version = searchParams.get("v") || "0.1.0";
    const response = await fetch(`${REMOTE_ASSET_ORIGIN}/static/css/main.css?v=${encodeURIComponent(version)}`, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        return new Response("Unable to load Browse Homes styles.", { status: response.status });
    }

    const css = await response.text();
    const scopedCss = `${scopeCssRules(rewriteAssetUrls(css))}${embedOverrides()}`;

    return new Response(scopedCss, {
        headers: {
            "Cache-Control": "public, max-age=300",
            "Content-Type": "text/css; charset=utf-8",
        },
    });
}
