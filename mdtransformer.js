'use strict';

const { program } = require('commander');
const validator = require('./mdvalidator');

const exampleText = `This is some text with **bold**, _ita_lic_, and \`code\`
formatting. \`formatting\` 
\`\`\`
This is a block of code **He He**
\`\`\`
This is a new paragraph.`;

const preformatted = [];
const tags = [
  { pattern: /(?<![a-zA-Z0-9])\*\*(?! )(.*?)(?<! )\*\*(?![a-zA-Z0-9])/g,
    replacement: '<b>$1</b>',
  },
  {
    pattern: /(?<![a-zA-Z0-9])_(?! )(.*?)(?<! )_(?![a-zA-Z0-9])/g,
    replacement: '<i>$1</i>',
  },
  {
    pattern: /(?<![a-zA-Z0-9{`])[`](?! )(.*?)(?<! )[`](?![a-zA-Z0-9}`])/g,
    replacement: '<tt>$1</tt>',
  },
];

const getParagraphs = (text) => text.split('\n\n').reduce((acc, cur) =>
  `${acc}\n<p>${cur}</p>`, ''
);

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
  validator.validateNesting(text, tags);
  let newText = getParagraphs(text);
  for (const tag of tags) {
    newText = newText.replace(tag.pattern, tag.replacement);
  }
  validator.validateUnclosed(newText);
  newText = setPreformatted(newText);
  console.log(newText);
};

program.command('parse')
  .description('parse markdown file')
  .action(() => {
    parseMarkdown(separatePreformatted(exampleText));
  });
program.parse();
