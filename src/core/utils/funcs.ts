
export function getEnvString(key: string, required = false): string {
  const val = process.env[key];
  if (required && !val) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val ?? '';
}

export const popLast = (str: string, separator: string) => (str ? str.split(separator).pop() : '');
