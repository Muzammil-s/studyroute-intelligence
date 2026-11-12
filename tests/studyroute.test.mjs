import test from 'node:test';
import assert from 'node:assert/strict';
import { PROGRAMS, convertCurrency, filterPrograms, formatCurrency, getProgramAnnualCostUSD } from '../src/studyLogic.js';

test('dataset includes explicit dataStatus provenance and official verification URLs', () => {
  assert.equal(PROGRAMS.length, 10);
  for (const p of PROGRAMS) {
    assert.match(p.dataStatus, /Illustrative/i);
    assert.ok(p.officialUrl.startsWith('https://'));
  }
});

test('scholarship offset reduces net tuition without ever going below zero', () => {
  const rwth = PROGRAMS.find((p) => p.id === 'de-rwth-msc');
  const base = getProgramAnnualCostUSD(rwth, false);
  const withSchol = getProgramAnnualCostUSD(rwth, true);
  assert.equal(withSchol.netTuitionUsd, 0);
  assert.ok(withSchol.totalAnnualUsd < base.totalAnnualUsd);
});

test('filterPrograms respects country, degree, maxBudgetUsd, and sorting', () => {
  const deMasters = filterPrograms(PROGRAMS, { country: 'Germany', degree: "Master's", maxBudgetUsd: 30000 });
  assert.equal(deMasters.length, 2);
  assert.ok(getProgramAnnualCostUSD(deMasters[0]).totalAnnualUsd <= getProgramAnnualCostUSD(deMasters[1]).totalAnnualUsd);
  assert.equal(formatCurrency(convertCurrency(1000, 'USD', 'USD'), 'USD'), '$1,000');
});
