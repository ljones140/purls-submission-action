Usage:

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
        uses: elrayle/purls-submission-action@main
        with:
          # A name for the manifest 
          manifest-name: Helm
          # The filepath to the manifest including filename
          manifest-path: Chart.lock
          # The purls being submitted as part of this manifest
          purls: |-
            pkg:helm/zookeeper@13.7.3
            pkg:helm/common@2.30.0
```
