function generateStatsFromUrl(url) {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        hash = (hash << 5) - hash + url.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    const cleanHash = Math.abs(hash);

    // Score: 10 to 80
    let score = 10 + (cleanHash % 71);

    // Latency: 80ms to 950ms
    const latency = 80 + (cleanHash % 871);

    // Big Tech Bonus
    const lower = url.toLowerCase();
    if (lower.includes('google') || lower.includes('apple') || lower.includes('openai')) {
        score += 30;
    }

    // Cap at 90
    if (score > 90) score = 90;

    return { score, latency };
}

console.log('Testing Deterministic Logic:');
const url1 = 'test.com';
const run1 = generateStatsFromUrl(url1);
const run2 = generateStatsFromUrl(url1);
console.log(`Run 1 (${url1}): Score ${run1.score}, Latency ${run1.latency}`);
console.log(`Run 2 (${url1}): Score ${run2.score}, Latency ${run2.latency}`);
console.log('MATCH?', run1.score === run2.score && run1.latency === run2.latency ? 'YES' : 'NO');

const urlTech = 'openai.com';
const runTech = generateStatsFromUrl(urlTech);
console.log(`Tech Run (${urlTech}): Score ${runTech.score} (Should include bonus)`);
