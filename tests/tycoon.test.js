import test from 'node:test';
import assert from 'node:assert/strict';
import { ITEMS, BUILD_ITEMS } from '../src/domain/catalog.js';

test('catalog items have valid prices and attributes', () => {
  assert.ok(ITEMS.tomato);
  assert.ok(ITEMS.paste);
  assert.equal(ITEMS.tomato.sellPrice, 6);
  assert.equal(ITEMS.paste.sellPrice, 28);
  assert.equal(typeof ITEMS.tomato.color, 'number');
});

test('build items have valid categories and costs', () => {
  const categories = new Set(BUILD_ITEMS.map((b) => b.category));
  assert.ok(categories.has('shelves'));
  assert.ok(categories.has('machines'));
  assert.ok(categories.has('parcels'));

  const parcelA1 = BUILD_ITEMS.find((b) => b.id === 'parcel_a1');
  assert.ok(parcelA1);
  assert.equal(parcelA1.price, 350);
  assert.equal(parcelA1.targetParcel, 'A1');
});

test('production recipes have positive durations and valid input counts', () => {
  const machines = BUILD_ITEMS.filter((b) => b.category === 'machines');
  assert.ok(machines.length >= 4);

  machines.forEach((m) => {
    assert.ok(m.duration > 0);
    assert.ok(m.inputCount >= 1);
    assert.ok(ITEMS[m.input], `Missing input item for ${m.id}`);
    assert.ok(ITEMS[m.output], `Missing output item for ${m.id}`);
  });
});
