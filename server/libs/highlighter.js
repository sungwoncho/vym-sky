import hljs from 'highlight.js';

/**
 *
 * @params parsedDiff {Object[]} - diff parsed by parseDiff library
 * e.g.
 *  [
 *    { type: 'del', del: true, base: 17, position: 6,
 *      content: '-    var stream = new Readable();' },
 *    { type: 'del', del: true, base: 18, position: 7,\
 *      content: '-    stream._read = function() {};' },
 *  ]
 */
export function highlightSyntax(parsedDiff) {
  let original = '';
  let patch = '';

  parsedDiff.forEach(chunk => {
    let line = chunk.content + '\n';

    if (chunk.type === 'normal') {
      original = original.concat(escapeSpaces(line));
      patch = patch.concat(line);
    } else if (chunk.type === 'del') {
      original = original.concat(escapeSpaces(line.replace(/^[\-]/g, ' ')));
    } else if (chunk.type === 'add') {
      patch = patch.concat(escapeSpaces(line.replace(/^[\+]/g, ' ')));
    }
  });

  original = unescapeCode(original);
  patch = unescapeCode(patch);

  let originalLines = hljs.highlightAuto(original).value.split('\n');
  let patchLines = hljs.highlightAuto(patch).value.split('\n');

  let delCount = 0;
  let addCount = 0;
  let normalCount = 0;
  parsedDiff.forEach(chunk => {
    if (chunk.type === 'normal') {
      chunk.content = originalLines[normalCount + delCount];
      normalCount++;
    } else if (chunk.type === 'del') {
      chunk.content = originalLines[normalCount + delCount];
      delCount++;
    } else if (chunk.type === 'add') {
      chunk.content = patchLines[normalCount + addCount];
      addCount++;
    }
  });

  return parsedDiff;
}

function unescapeCode(string) {
  let unescaped = string.replace(/&gt;/g, '>')
                        .replace(/&lt;/g, '<');

  return unescaped;
}

/**
 * Replaces all leading spaces into unicode for space so that the browsers
 * can display spaces without ignoring
 * @param Str {String} - the input from which the leading spaces should be escaped
 */
function escapeSpaces(str) {
  const nonBreakingSpace = '\u00a0';

  return str.replace(/^ +/g, function (match) {
    return match.replace(/ /g, nonBreakingSpace);
  });
}
