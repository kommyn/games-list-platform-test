import { BadRequestException } from '@nestjs/common';

export const decodeCursor = <K extends string>(
    token: string,
    keys: readonly K[],
): Record<K, string> => {
    let parsed: unknown;

    try {
        parsed = JSON.parse(
            Buffer.from(token, 'base64url').toString('utf8'),
        ) as unknown;
    } catch {
        throw new BadRequestException('Malformed cursor');
    }

    if (typeof parsed !== 'object' || parsed === null) {
        throw new BadRequestException('Malformed cursor');
    }

    const data = parsed as Record<string, unknown>;

    if (keys.some((key) => typeof data[key] !== 'string')) {
        throw new BadRequestException('Malformed cursor');
    }

    return data as Record<K, string>;
};
