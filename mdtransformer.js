'use strict';

const { program } = require('commander');


const exampleText = `This is some text with **bo**ld**, _ita_lic_, and \`code\`
formatting. \`\`\`formatting\`\`\` 
\`\`\`
This is a block of code **He He**
\`\`\`

This is a new paragraph.`;

const preformatted = [];
const tags = [
  {
    pattern: /(?:^|\n\n)(.*?)(?=\n\n|$)/gs,
    replacement: '<p>\n$1\n</p>\n',
  },
  { pattern: /(?<![a-zA-Z0-9])\*\*(.*?)\*\*(?![a-zA-Z0-9])/g,
    replacement: '<b>$1</b>',
  },
  {
    pattern: /(?<![a-zA-Z0-9])_(.*?)_(?![a-zA-Z0-9])/g,
    replacement: '<i>$1</i>',
  },
  {
    pattern: /(?<![a-zA-Z0-9{`])[`](.*?)[`](?![a-zA-Z0-9}`])/g,
    replacement: '<tt>$1</tt>',
  },
  {
    pattern: /\n```(?:\n)?(.*?)(?:\n)?```\n/gs,
    replacement: '\n<pre>$1</pre>\n',
  },
];

const separatePreformatted = (text) => {
  const preformattedText = text.match(
    /(?:^|\n)```(?:\n)?(.*?)(?:\n)?```(?:\n|$)/gs
  );
  if (!preformattedText) return text;

  preformatted.push(...preformattedText);
  return preformatted.reduce(
    (acc, cur, index) => acc.replace(cur, `\nPRE{{${index}}}PRE\n`),
    text
  );
};

const setPreformatted = (text) => {
  for (const pre of preformatted) {
    const newPre = `<pre>${pre.replace(/(?:\n)```/g, '')}</pre>`;
    text = text.replace(`PRE{{${preformatted.indexOf(pre)}}}PRE`, newPre);
  }
  return text;
};

const parseMarkdown = (text) => {
  let newText = text;
  for (const tag of tags) {
    newText = newText.replace(tag.pattern, tag.replacement);
  }
  newText = setPreformatted(newText);
  console.log(newText);
};

program.command('parse')
  .description('parse markdown file')
  .action(() => {
    parseMarkdown(separatePreformatted(exampleText));
  });
program.parse();
