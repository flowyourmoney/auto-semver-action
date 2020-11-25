import * as core from '@actions/core'
import semver from 'semver'
import matcher from 'matcher'
import * as github from '@actions/github'
import {Context} from '@actions/github/lib/context'

const defaultConfig = {
  major: ['major'],
  premajor: ['premajor'],
  minor: ['minor'],
  preminor: ['preminor'],
  patch: ['patch'],
  prepatch: ['prepatch'],
  prerelease: ['prerelease']
}

export function increment(
  versionNumber: string,
  versionIdentifier: string,
  commitMessages: string[],
  defaultReleaseType: string
): semver.SemVer {
  const version = semver.parse(versionNumber) || new semver.SemVer('0.0.0')
  core.debug(`Config used => ${JSON.stringify(defaultConfig)}`)
  const matchedLabels = new Set<string>()

  for (const message of commitMessages) {
    for (const [key, value] of Object.entries(defaultConfig)) {
      if (matcher.isMatch(message, `*#${value}*`)) {
        matchedLabels.add(key)
      }
    }
  }

  core.debug(
    `Parsed labels from commit messages => ${JSON.stringify(matchedLabels)}`
  )

  if (matchedLabels.size === 0) {
    matchedLabels.add(defaultReleaseType)
  }

  for (const label of matchedLabels) {
    version?.inc(label as semver.ReleaseType, versionIdentifier)
    core.debug(`Increment version for label => ${label} - ${version.version}`)
  }

  return version
}

export async function getMostRecentVersionFromTags(
  context: Context
): Promise<semver.SemVer> {
  const token = core.getInput('github_token', {required: true})
  const octokit = github.getOctokit(token)

  const {data: refs} = await octokit.git.listMatchingRefs({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: 'tags/'
  })

  const versions = refs
    .map(ref =>
      semver.parse(ref.ref.replace(/^refs\/tags\//g, ''), {loose: true})
    )
    .filter(version => version !== null)
    .sort((a, b) =>
      semver.rcompare(a?.version || '0.0.0', b?.version || '0.0.0')
    )

  if (versions[0] != null) {
    return versions[0]
  } else {
    return new semver.SemVer('0.0.0')
  }
}
