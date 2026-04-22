(() => {
    try {
        // Extract Title
        const titleEl = document.querySelector('span[itemprop="title"]');
        const title = titleEl ? titleEl.textContent.trim() : "Unknown Title";

        // Extract Patent Number
        const docNumberEl = document.querySelector('dd[itemprop="publicationNumber"], span[itemprop="publicationNumber"]');
        let num = "Unknown Number";
        if (docNumberEl) {
             num = docNumberEl.textContent.trim();
        } else if (document.title.includes('-')) {
             num = document.title.split('-')[0].trim();
        }

        // Extract Claims
        let claims = [];
        const claimElements = document.querySelectorAll('.claim-text');
        if (claimElements.length > 0) {
            claimElements.forEach(el => {
                claims.push(el.textContent.trim().replace(/\s+/g, ' '));
            });
        }

        // Consolidate full text for parsing (backend is used to full PDF strings)
        // Alternatively, the frontend can just keep what we need. 
        let raw_text = `Title: ${title}\nNumber: ${num}\n\nClaims:\n` + claims.join('\n\n');

        // Extract Figure URLs
        let figures = [];
        const imgElements = document.querySelectorAll('meta[itemprop="image"]');
        if (imgElements.length > 0) {
            imgElements.forEach(meta => {
                if (meta.content) {
                    figures.push(meta.content);
                }
            });
        }

        // Ensure absolute URLs if relative
        figures = figures.map(url => {
            if (url.startsWith('/')) {
                return window.location.origin + url;
            }
            return url;
        });

        // Get abstract
        const abstractEl = document.querySelector('.abstract');
        const abstract = abstractEl ? abstractEl.textContent.trim() : "";

        return {
            title: title,
            patent_number: num,
            abstract: abstract,
            claims: claims,
            raw_text: raw_text,
            figures: figures,
            source_url: window.location.href,
            source_mode: 'url_import'
        };
    } catch (e) {
        console.error("Antigravity Extension Extraction Error: ", e);
        return null;
    }
})();
