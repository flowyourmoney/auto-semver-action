# auto-semver-action
Creates a new version using commit messages and existing Release Tags.

When commit message has one `#major`, `#premajor`, `#minor`, `#preminor`, `#patch`, `#prepatch`, or `#prerelease` keyword then increments a version by using latest release tag. 

## Inputs

### `identifier`

**Optional** Semver identifier for version (beta,alpha..).

### `releaseType`

**Required** Default type of semantic version increment to make when cannot found on commit messages. One of `major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, or `prerelease`.

### `github_token`

**Required**. Used to make API requests for looking existing tags. Pass in using `secrets.GITHUB_TOKEN`.

## Example usage

```yaml
  steps:
  - name: Auto Increment Semver Action
    uses: MCKanpolat/auto-semver-action@1.0.5
    id: vers
    with:
      releaseType: patch
      github_token: ${{ secrets.GITHUB_TOKEN }}
```
