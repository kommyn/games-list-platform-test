import { Equal, LessThan, MoreThan } from 'typeorm';
import type { FindOptionsWhere } from 'typeorm';

import { OrderEnum } from '../../enums';
import type { CursorKeys, IErasedCursorKey } from '../interfaces';

/**
 * Cursor condition for `find` / `findOne`.
 *
 * Find options cannot express a row-value comparison, so the tuple is spelled
 * out as the equivalent OR chain — an array of `where` objects is an OR in the
 * find API:
 *
 *     (a > x) OR (a = x AND b > y) OR (a = x AND b = y AND c > z)
 *
 * Merge your own filter into every branch, since the branches are ORed:
 * `where.map((branch) => ({ ...branch, ...myFilter }))`. Don't filter on a key
 * that is part of the cursor — the two conditions on one property cannot both
 * survive in a find object.
 *
 * @example
 * const where = cursorWhereFind<Game>(
 *     [
 *         { key: 'createdAt', value: createdAt },
 *         { key: 'id', value: id },
 *     ],
 *     order,
 * );
 *
 * const games = await this.gamesRepository.find({
 *     where,
 *     order: { createdAt: order, id: order },
 *     take,
 * });
 */
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
