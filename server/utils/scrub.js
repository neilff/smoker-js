import sanitizer from 'sanitizer';

/**
 * Scrubs the provided text by clipping length and sanitizing it
 *
 * @param {string} text Input text
 * @return {string} Returned string
 */
export default function scrub(text = '') {
  // clip the string if it is too long
  if (text.length > 65535) {
    text = text.substr(0,65535);
  }

  return text === false || text === true ?
    text :
    sanitizer.sanitize(text);
}
