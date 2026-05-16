import semver from "semver";

type WordfenceAffectedVersionRange = {
  from_version: string | null;
  from_inclusive: boolean;
  to_version: string | null;
  to_inclusive: boolean;
};

type WordfenceAffectedVersions = Record<string, WordfenceAffectedVersionRange>;

const parseVersion = (version: string) => semver.coerce(version);

export const isInstalledVersionAffected = (
  installedVersion: string | null,
  affectedVersionRanges: WordfenceAffectedVersions,
) => {
  const parsedInstalledVersion = installedVersion
    ? parseVersion(installedVersion)
    : null;

  if (!parsedInstalledVersion) return false;

  for (const affectedRange of Object.values(affectedVersionRanges ?? {})) {
    const minimumAffectedVersion = affectedRange.from_version;
    const maximumAffectedVersion = affectedRange.to_version;

    const parsedMinimumVersion =
      minimumAffectedVersion && minimumAffectedVersion !== "*"
        ? parseVersion(minimumAffectedVersion)
        : null;

    const parsedMaximumVersion = maximumAffectedVersion
      ? parseVersion(maximumAffectedVersion)
      : null;

    const isAboveMinimum =
      !parsedMinimumVersion ||
      (affectedRange.from_inclusive
        ? semver.gte(parsedInstalledVersion, parsedMinimumVersion)
        : semver.gt(parsedInstalledVersion, parsedMinimumVersion));

    const isBelowMaximum =
      !parsedMaximumVersion ||
      (affectedRange.to_inclusive
        ? semver.lte(parsedInstalledVersion, parsedMaximumVersion)
        : semver.lt(parsedInstalledVersion, parsedMaximumVersion));

    if (isAboveMinimum && isBelowMaximum) return true;
  }

  return false;
};
