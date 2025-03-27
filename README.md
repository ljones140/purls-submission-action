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
          manifest-name: Helm
          manifest-path: Chart.lock
          purls: |-
            pkg:helm/zookeeper@13.7.3
            pkg:helm/common@2.30.0
```
