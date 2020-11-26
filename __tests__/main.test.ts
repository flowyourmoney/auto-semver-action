import {increment} from '../src/versionBuilder'

test('increment minor version', () => {
  const nextVersion = increment('1.0.0', '', ['#minor'], 'patch', false)
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.1.0')
})

test('increment major version', () => {
  const nextVersion = increment('1.0.0', '', ['#major'], 'patch', false)
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('2.0.0')
})

test('increment patch version', () => {
  const nextVersion = increment('1.0.0', '', ['#patch'], 'patch', false)
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.0.1')
})

test('increment pre patch version', () => {
  const nextVersion = increment(
    '1.0.0',
    'beta',
    ['this is test #prepatch version'],
    'patch',
    false
  )
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('1.0.1-beta.0')
})

test('increment multiple version', () => {
  const nextVersion = increment(
    '1.0.0',
    '',
    ['test #minor', 'test #major', 'test #patch'],
    'patch',
    true
  )
  console.log(nextVersion.version)
  expect(nextVersion.version).toEqual('2.1.1')
})
