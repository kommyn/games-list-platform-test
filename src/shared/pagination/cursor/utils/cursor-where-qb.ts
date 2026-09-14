import type { ObjectLiteral } from 'typeorm';

import { OrderEnum } from '../../enums';
import type { CursorKeys, IErasedCursorKey } from '../interfaces';

export const cursorWhereQb = <TRow extends object>(
    cursor: CursorKeys<TRow>,
    order: OrderEnum,
    alias?: string,
): [string, ObjectLiteral] => {
    const keys = cursor as unknown as readonly IErasedCursorKey[];
    const params: ObjectLiteral = {};

    const columns = keys.map(
        (cursorKey) =>
            cursorKey.column ??
            (alias ? `${alias}."${cursorKey.key}"` : `"${cursorKey.key}"`),
    );

    const placeholders = keys.map((cursorKey, index) => {
        const name = `__cursor_${index}`;

        params[name] = cursorKey.value;

        return cursorKey.cast ? `:${name}::${cursorKey.cast}` : `:${name}`;
    });

    const comparator = order === OrderEnum.ASC ? '>' : '<';

    return [
        `(${columns.join(', ')}) ${comparator} (${placeholders.join(', ')})`,
        params,
    ];
};
