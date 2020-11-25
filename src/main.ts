import * as core from '@actions/core'
import {context} from '@actions/github'
import {getMostRecentVersionFromTags, increment} from './versionBuilder'

// debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
async function run(): Promise<void> {
  try {
    const versionIdentifier: string = core.getInput('identifier') || ''
    const defaultReleaseType: string = core.getInput('releaseType') || ''
    const commitMessages = context.payload.commits?.message || []

    core.debug(`Context payload => ${JSON.stringify(context.payload)}`)
    const latestVer = await getMostRecentVersionFromTags(context)
    const nextVersion = increment(
      latestVer.version,
      versionIdentifier,
      commitMessages,
      defaultReleaseType
    )

    core.exportVariable('version', nextVersion?.version)
    core.setOutput('version', nextVersion?.version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
