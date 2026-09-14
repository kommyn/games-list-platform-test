import { Equal, LessThan, MoreThan } from 'typeorm';
import type { FindOptionsWhere } from 'typeorm';

import { OrderEnum } from '../../enums';
import type { CursorKeys, IErasedCursorKey } from '../interfaces';

export const cursorWhereFind = <TRow extends object>(
    cursor: CursorKeys<TRow>,
    order: OrderEnum,
): FindOptionsWhere<TRow>[] => {
    const keys = cursor as unknown as readonly IErasedCursorKey[];
    const compare = order === OrderEnum.ASC ? MoreThan : LessThan;

    return keys.map((cursorKey, index) => {
        const clause: Record<string, unknown> = {};

        keys.slice(0, index).forEach((previous) => {
            clause[previous.key] = Equal(previous.value);
        });

        clause[cursorKey.key] = compare(cursorKey.value);

        return clause as FindOptionsWhere<TRow>;
    });
};
