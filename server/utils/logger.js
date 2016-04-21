import chalk from 'chalk';
import winston from 'winston';

/**
 * Accepts a map, logging the keys as titles, and properties as descriptions
 *
 * @param {object} config An object to map over
 * @return {undefined} undefined
 */
export default function logmap(config) {
  const keys = Object.keys(config);
  const log = keys.map(i => {
    const val = config[i] !== null ? `\n${ chalk.green.bold(config[i]) }` : '';

    return `${ chalk.blue.bold(i) } ${ val }\n`;
  }).join('\n');

winston.info(`

${ chalk.gray(`===========================================================`) }

${ log }
${ chalk.gray(`===========================================================`) }

`);
}
