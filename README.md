# PURLs Submission Action

Submit dependency snapshots to GitHub's Dependency Submission API using Package URLs (PURLs).

## Usage

### Single Snapshot

```yaml
name: Dependency Submission with PURLs

on:
  push:

permissions:
  contents: write

jobs:
  submit-purls:
    runs-on: ubuntu-latest
    steps:
      - name: Submit Helm PURLs
        uses: ljones140/purls-submission-action@main
        with:
          snapshot1-manifest-name: Helm
          snapshot1-manifest-path: Chart.lock
          snapshot1-purls: |-
            pkg:helm/zookeeper@13.7.3
            pkg:helm/common@2.30.0
```

### Two Snapshots

Submit two separate snapshots to test how the dependency graph merges them:

```yaml
name: Dependency Submission with Multiple Snapshots

on:
  push:

permissions:
  contents: write

jobs:
  submit-purls:
    runs-on: ubuntu-latest
    steps:
      - name: Submit Multiple Snapshots
        uses: ljones140/purls-submission-action@main
        with:
          # Snapshot 1
          snapshot1-correlator: helm-dependencies
          snapshot1-manifest-name: Helm
          snapshot1-manifest-path: Chart.lock
          snapshot1-purls: |-
            pkg:helm/zookeeper@13.7.3
            pkg:helm/common@2.30.0
          
          # Snapshot 2
          snapshot2-correlator: npm-dependencies
          snapshot2-manifest-name: NPM
          snapshot2-manifest-path: package.json
          snapshot2-purls: |-
            pkg:npm/lodash@4.17.21
            pkg:npm/@types/node@18.0.0
```

### Two Snapshots - Same Manifest, Different Correlators

Test how the dependency graph merges two snapshots with the same manifest but different correlators:

```yaml
name: Test Dependency Graph Merging

on:
  push:

permissions:
  contents: write

jobs:
  submit-purls:
    runs-on: ubuntu-latest
    steps:
      - name: Submit Two NPM Snapshots
        uses: ljones140/purls-submission-action@main
        with:
          detector-name: npm-detector
          
          # Snapshot 1
          snapshot1-correlator: npm-correlator-1
          snapshot1-manifest-name: package.json
          snapshot1-manifest-path: /package.json
          snapshot1-purls: |-
            pkg:npm/lodash@4.17.21
            pkg:npm/express@4.18.2
          
          # Snapshot 2
          snapshot2-correlator: npm-correlator-2
          snapshot2-manifest-name: package.json
          snapshot2-manifest-path: /package.json
          snapshot2-purls: |-
            pkg:npm/react@18.2.0
            pkg:npm/axios@1.6.0
```

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `detector-name` | No | `purls-submission-action` | Name of the detector |
| `snapshot1-correlator` | No | `purls-submission-correlator` | Correlator for snapshot 1 |
| `snapshot1-manifest-name` | Yes | - | Name of the manifest for snapshot 1 |
| `snapshot1-manifest-path` | Yes | - | Filepath to the manifest file for snapshot 1 |
| `snapshot1-purls` | Yes | - | PURLs to submit for snapshot 1 (one per line) |
| `snapshot2-correlator` | No | `purls-submission-correlator` | Correlator for snapshot 2 |
| `snapshot2-manifest-name` | No | - | Name of the manifest for snapshot 2 |
| `snapshot2-manifest-path` | No | - | Filepath to the manifest file for snapshot 2 |
| `snapshot2-purls` | No | - | PURLs to submit for snapshot 2 (one per line) |
