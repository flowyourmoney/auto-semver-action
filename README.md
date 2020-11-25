
# auto-semver-action
auto-semver-action allows you to easily determine the next version number.

## How does it work?
Automatically determines the next semantic version number by using repository tags. Uses the commit messages to determine the type of changes in the repository. 

### Commit message format
Example of the release types that will be done based on a commit messages:

*If commit messages didn't match below types specified default release type will be use.*

`#major`, `#premajor`, `#minor`, `#preminor`, `#patch`, `#prepatch`, `#prerelease`

## Inputs

### `identifier`

**Optional** Semver identifier for version (beta,alpha..).

### `releaseType`

**Required** Default semantic version release type.
`major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, or `prerelease`.

### `github_token`

**Required**. Used to make API requests for looking existing tags. Pass in using `secrets.GITHUB_TOKEN`.

## Example usage

```yaml
   steps:
    - name: Auto Increment Semver Action
      uses: MCKanpolat/auto-semver-action@1.0.5
      id: versioning
      with:
        releaseType: patch 
        github_token: ${{ secrets.GITHUB_TOKEN }}

    - name: Next Release Number
      run: echo ${{ steps.versioning.outputs.version }}
```

## Debugging
To see debug output from this action, you must set the secret ACTIONS_STEP_DEBUG to true in your repository. 
