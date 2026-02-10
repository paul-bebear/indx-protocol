import type { TableOfContentsItem } from '../../types/blog';

export function parseCustomFormat(content: string): {
  markdown: string;
  toc: TableOfContentsItem[];
} {
  const lines = content.split('\n');
  const toc: TableOfContentsItem[] = [];
  let markdown = '';
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line === '(H2)') {
      i++;
      const headingText = lines[i]?.trim() || '';
      const id = slugify(headingText);
      markdown += `## ${headingText}\n\n`;
      toc.push({ id, text: headingText, level: 2 });
    } else if (line === '(H3)') {
      i++;
      const headingText = lines[i]?.trim() || '';
      const id = slugify(headingText);
      markdown += `### ${headingText}\n\n`;
      toc.push({ id, text: headingText, level: 3 });
    } else if (line === '(QUOTE)') {
      i++;
      let quoteContent = '';
      while (i < lines.length && lines[i].trim() !== '(END QUOTE)') {
        quoteContent += lines[i] + '\n';
        i++;
      }
      markdown += `> ${quoteContent.trim()}\n\n`;
    } else if (line === '(BOLD)') {
      i++;
      let boldContent = '';
      while (i < lines.length && lines[i].trim() !== '(END BOLD)') {
        boldContent += lines[i] + ' ';
        i++;
      }
      markdown += `**${boldContent.trim()}** `;
    } else if (line === '---') {
      markdown += '\n---\n\n';
    } else if (line.startsWith('•')) {
      markdown += line + '\n';
    } else if (line === '') {
      markdown += '\n';
    } else if (!line.startsWith('(') && !line.startsWith('(END')) {
      markdown += line + '\n';
    }
    
    i++;
  }
  
  // Convert bullet points to proper markdown list
  markdown = markdown.replace(/^[•]\s*/gm, '- ');
  
  return { markdown: markdown.trim(), toc };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

export function convertTxtToMd(txtContent: string, frontmatter: Record<string, string | string[]>): string {
  const { markdown } = parseCustomFormat(txtContent);
  
  const fmLines = Object.entries(frontmatter).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
    }
    return `${key}: "${value}"`;
  });
  
  return `---\n${fmLines.join('\n')}\n---\n\n${markdown}`;
}
