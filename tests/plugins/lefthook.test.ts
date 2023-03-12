import assert from 'node:assert/strict';
import test from 'node:test';
import * as lefthook from '../../src/plugins/lefthook/index.js';
import { resolve, join } from '../../src/util/path.js';
import { getManifest } from '../helpers/index.js';

const cwd = resolve('tests/fixtures/plugins/lefthook');
const manifest = getManifest(cwd);

test('Find dependencies in lefthook configuration (json)', async () => {
  const configFilePath = join(cwd, 'lefthook.yml');
  const dependencies = await lefthook.findDependencies(configFilePath, {
    manifest,
    cwd,
    workspaceConfig: { ignoreBinaries: [] },
  });
  assert.deepEqual(dependencies, ['eslint', join(cwd, 'example.mjs')]);
});