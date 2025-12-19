import * as core from "@actions/core";
import * as github from "@actions/github";
import {
  Package,
  Snapshot,
  Manifest,
  submitSnapshot,
} from "@github/dependency-submission-toolkit";

async function run() {
  const detector = {
    name: core.getInput("detector-name"),
    version: "0.0.1",
    url: "https://github.com/ljones140/purls-submission-action",
  };

  const snapshot1 = new Snapshot(
    detector,
    github.context,
    {
      correlator: core.getInput("snapshot1-correlator"),
      id: `${github.context.runId}-1`,
    }
  );

  const manifest1Name = core.getInput("snapshot1-manifest-name");
  const manifest1Path = core.getInput("snapshot1-manifest-path");
  const purls1 = core.getInput("snapshot1-purls").split("\n");
  const manifest1 = new Manifest(manifest1Name, manifest1Path);
  purls1.forEach((purl) => manifest1.addDirectDependency(new Package(purl)));
  snapshot1.addManifest(manifest1);
  
  await submitSnapshot(snapshot1);
  core.info("Snapshot 1 submitted successfully");

  const snapshot2ManifestName = core.getInput("snapshot2-manifest-name");
  if (snapshot2ManifestName) {
    const snapshot2 = new Snapshot(
      detector,
      github.context,
      {
        correlator: core.getInput("snapshot2-correlator"),
        id: `${github.context.runId}-2`,
      }
    );

    const manifest2Path = core.getInput("snapshot2-manifest-path");
    const purls2 = core.getInput("snapshot2-purls").split("\n");
    const manifest2 = new Manifest(snapshot2ManifestName, manifest2Path);
    purls2.forEach((purl) => manifest2.addDirectDependency(new Package(purl)));
    snapshot2.addManifest(manifest2);
    
    await submitSnapshot(snapshot2);
    core.info("Snapshot 2 submitted successfully");
  }
}

run();
