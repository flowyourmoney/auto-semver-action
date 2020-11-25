import {increment} from '../src/versionBuilder'

test('increment minor version', () => {
  const nextVersion = increment('1.0.0', '', ['minor'])
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.1.0')
})

test('increment major version', () => {
  const nextVersion = increment('1.0.0', '', ['major'])
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('2.0.0')
})

test('increment patch version', () => {
  const nextVersion = increment('1.0.0', '', ['patch'])
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.0.1')
})

test('increment pre patch version', () => {
  const nextVersion = increment('1.0.0', 'beta', ['prepatch'])
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.0.1-beta.0')
})
