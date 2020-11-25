import * as core from '@actions/core'
import * as github from '@actions/github'
import {Context} from '@actions/github/lib/context'
import {getMostRecentVersionFromTags, increment} from './versionBuilder'

// debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
async function run(context: Context = github.context): Promise<void> {
  try {
    const versionIdentifier: string = core.getInput('identifier') || ''
    const payloadLabels = context.payload.pull_request?.labels || []
    const latestVer = await getMostRecentVersionFromTags(context)
    const nextVersion = increment(
      latestVer.version,
      versionIdentifier,
      payloadLabels
    )

    core.exportVariable('VERSION', nextVersion?.version)
    core.setOutput('version', nextVersion?.version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
