'use strict';

const tags = [
  { pattern: /(?:^|\n\n)(.*?)(?=\n\n|$)/gs, replacement: '\n<p>\n$1\n</p>\n' },
  { pattern: /\n```(?:\n)?(.*?)(?:\n)?```\n/gs,
    replacement: '\n<pre>$1</pre>\n' },
  { pattern: /(?<![a-zA-Z0-9])\*\*(.*?)\*\*(?![a-zA-Z0-9])/g,
    replacement: '<b>$1</b>' },
  { pattern: /(?<![a-zA-Z0-9])_(.*?)_(?![a-zA-Z0-9])/g,
    replacement: '<i>$1</i>' },
  { pattern: /(?<![a-zA-Z0-9{`])[`](.*?)[`](?![a-zA-Z0-9}`])/g,
    replacement: '<tt>$1</tt>' },
];

const parseMarkdown = (text) => {
  let newText = text;
  for (const tag of tags) {
    newText = newText.replaceAll(tag.pattern, tag.replacement);
  }
  console.log(newText);
};

const exampleText = `This is some text with **bo**ld**, _ita_lic_, and \`code\`
formatting. \`\`\`formatting\`\`\` 
\`\`\`
This is a block of code
\`\`\`

This is a new paragraph.`;
