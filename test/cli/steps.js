const test = require('tape');
const cli = require('../../src/cli');
const stdout = require('./util/readConsole').stdout;
const stderr = require('./util/readConsole').stderr;

test('testing steps parsing', async function (t) {

  t.plan(2);

  let out = stdout.read();
  await cli([
    'node', 'test',
    '-i', 'examples/images/test.png',
    '-s', 'invert',
  ]);
  out.restore();
  t.false(out.output.includes('Added Step "invert"'), 'Steps parsed successfully');


  let err = stderr.read();
  await cli([
    'node', 'test',
    '-i', 'examples/images/test.png',
    '-s', 'invalidStep',
  ]);
  err.restore();
  t.equal(err.output, 'Please ensure all steps are valid.');
});
