type DurationProps = {
  totalSeconds: number;
};

export const Duration = ({ totalSeconds }: DurationProps) => {
  return <span>{formatDuration(totalSeconds)}</span>;
};

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
  );
  const seconds = totalSeconds % SECONDS_IN_MINUTE;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes}m`);
  }

  parts.push(`${seconds}s`);

  return parts.join(" ");
}
