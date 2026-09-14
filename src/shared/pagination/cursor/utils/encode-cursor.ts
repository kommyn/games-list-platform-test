export const encodeCursor = (data: Record<string, string>): string =>
    Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
