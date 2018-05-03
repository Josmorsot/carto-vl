import { number } from '../functions';
import { implicitCast } from './utils';
import BaseExpression from './base';

// Each binary expression can have a set of the following signatures (OR'ed flags)
const UNSUPPORTED_SIGNATURE = 0;
const NUMBERS_TO_NUMBER = 1;
const NUMBER_AND_COLOR_TO_COLOR = 2;
const COLORS_TO_COLOR = 4;
const CATEGORIES_TO_NUMBER = 8;

/**
 * Multiply two numeric expressions.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Simple multiplication.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.mul(5, 5);  // Upon rendering, width will be evaluated internally to 25
 * });
 *
 * @memberof carto.expressions
 * @name mul
 * @function
 * @api
 */
export const Mul = genBinaryOp('mul',
    NUMBERS_TO_NUMBER | NUMBER_AND_COLOR_TO_COLOR | COLORS_TO_COLOR,
    (x, y) => x * y,
    (x, y) => `(${x} * ${y})`
);

/**
 * Divide two numeric expressions.
 *
 * @param {carto.expressions.Base|number} numerator - Numerator of the division
 * @param {carto.expressions.Base|number} denominator - Denominator of the division
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Number division.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.div(10, 2);   // Upon rendering, width will be evaluated internally to 5
 * });
 *
 * @memberof carto.expressions
 * @name div
 * @function
 * @api
 */
export const Div = genBinaryOp('div',
    NUMBERS_TO_NUMBER | NUMBER_AND_COLOR_TO_COLOR | COLORS_TO_COLOR,
    (x, y) => x / y,
    (x, y) => `(${x} / ${y})`
);

/**
 * Add two numeric expressions.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Number addition.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.add(10, 2);  // Upon rendering, width will be evaluated internally to 12
 * });
 *
 * @memberof carto.expressions
 * @name add
 * @function
 * @api
 */
export const Add = genBinaryOp('add',
    NUMBERS_TO_NUMBER | COLORS_TO_COLOR,
    (x, y) => x + y,
    (x, y) => `(${x} + ${y})`
);

/**
 * Substract two numeric expressions.
 *
 * @param {carto.expressions.Base|number} minuend - The minuend of the subtraction
 * @param {carto.expressions.Base|number} subtrahend - The subtrahend of the subtraction
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Number subtraction.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.sub(10, 2);  // Upon rendering, width will be evaluated internally to 8
 * });
 *
 * @memberof carto.expressions
 * @name sub
 * @function
 * @api
 */
export const Sub = genBinaryOp('sub',
    NUMBERS_TO_NUMBER | COLORS_TO_COLOR,
    (x, y) => x - y,
    (x, y) => `(${x} - ${y})`
);

/**
 * Modulus of two numeric expressions, mod returns a numeric expression with the value of x modulo y. This is computed as x - y * floor(x/y).
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Number modulus.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.mod(10, 6);  // 4
 * });
 *
 * @memberof carto.expressions
 * @name mod
 * @function
 * @api
 */
export const Mod = genBinaryOp('mod',
    NUMBERS_TO_NUMBER,
    (x, y) => x % y,
    (x, y) => `mod(${x}, ${y})`
);

/**
 * Compute the base to the exponent power, return a numeric expression with the value of the first parameter raised to the power of the second.
 * The result is undefined if x<0 or if x=0 and y≤0.
 *
 * @param {carto.expressions.Base|number} base - Numeric expression
 * @param {carto.expressions.Base|number} exponent - Numeric expression
 * @return {carto.expressions.Base} Numeric expression with base ^ exponent
 *
 * @example <caption>Power of two numbers.</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   width: s.pow(2, 3);  // 8
 * });
 *
 * @memberof carto.expressions
 * @name pow
 * @function
 * @api
 */
export const Pow = genBinaryOp('pow',
    NUMBERS_TO_NUMBER,
    (x, y) => Math.pow(x, y),
    (x, y) => `pow(${x}, ${y})`
);

/**
 * Compare if x is greater than y.
 *
 * This returns a numeric expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price > 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.gt(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name gt
 * @function
 * @api
 */
export const GreaterThan = genBinaryOp('greaterThan',
    NUMBERS_TO_NUMBER,
    (x, y) => x > y ? 1 : 0,
    (x, y) => `(${x}>${y}? 1.:0.)`
);

/**
 * Compare if x is greater than or equal to y.
 *
 * This returns a numeric expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price >= 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.gte(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name gte
 * @function
 * @api
 */
export const GreaterThanOrEqualTo = genBinaryOp('greaterThanOrEqualTo',
    NUMBERS_TO_NUMBER,
    (x, y) => x >= y ? 1 : 0,
    (x, y) => `(${x}>=${y}? 1.:0.)`
);

/**
 * Compare if x is lower than y.
 *
 * This returns a numeric expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price < 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.lt(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name lt
 * @function
 * @api
 */
export const LessThan = genBinaryOp('lessThan',
    NUMBERS_TO_NUMBER,
    (x, y) => x < y ? 1 : 0,
    (x, y) => `(${x}<${y}? 1.:0.)`
);

/**
 * Compare if x is lower than or equal to y.
 *
 * This returns a numeric expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price <= 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.lte(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name lte
 * @function
 * @api
 */
export const LessThanOrEqualTo = genBinaryOp('lessThanOrEqualTo',
    NUMBERS_TO_NUMBER,
    (x, y) => x <= y ? 1 : 0,
    (x, y) => `(${x}<=${y}? 1.:0.)`
);

/**
 * Compare if x is equal to a y.
 *
 * This returns a numeric expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price === 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.eq(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name eq
 * @function
 * @api
 */
export const Equals = genBinaryOp('equals',
    NUMBERS_TO_NUMBER | CATEGORIES_TO_NUMBER,
    (x, y) => x == y ? 1 : 0,
    (x, y) => `(${x}==${y}? 1.:0.)`
);

/**
 * Compare if x is different than y.
 *
 * This returns a number expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Compare two numbers to show only elements with price !== 30</caption>
 * const s = carto.expressions;
 * const viz = new carto.Viz({
 *   filter: s.neq(s.prop('price'), 30);
 * });
 *
 * @memberof carto.expressions
 * @name neq
 * @function
 * @api
 */
export const NotEquals = genBinaryOp('notEquals',
    NUMBERS_TO_NUMBER | CATEGORIES_TO_NUMBER,
    (x, y) => x != y ? 1 : 0,
    (x, y) => `(${x}!=${y}? 1.:0.)`
);

/**
 * Perform a binary OR between two numeric expressions.
 * If the numbers are different from 0 or 1 this performs a [fuzzy or operation](https://en.wikipedia.org/wiki/Fuzzy_logic#Fuzzification).
 * This fuzzy behavior will allow transitions to work in a continuos, non-discrete, fashion.
 *
 * This returns a number expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Show only elements with price < 30 or price > 1000</caption>
 * const s = carto.expressions;
 * const $price = s.prop('price');
 * const viz = new carto.Viz({
 *   filter: s.or(
 *     s.lt($price, 30),
 *     s.gt($price, 1000)
 *   )
 * });
 *
 * @memberof carto.expressions
 * @name or
 * @function
 * @api
 */
export const Or = genBinaryOp('or',
    NUMBERS_TO_NUMBER,
    (x, y) => Math.min(x + y, 1),
    (x, y) => `min(${x} + ${y}, 1.)`
);

/**
 * Perform a binary AND between two numeric expressions.
 * If the numbers are different from 0 or 1 this performs a [fuzzy or operation](https://en.wikipedia.org/wiki/Fuzzy_logic#Fuzzification).
 * This fuzzy behavior will allow transitions to work in a continuos, non-discrete, fashion.
 *
 * This returns a number expression where 0 means `false` and 1 means `true`.
 *
 * @param {carto.expressions.Base|number} x - Numeric expression
 * @param {carto.expressions.Base|number} y - Numeric expression
 * @return {carto.expressions.Base} Numeric expression
 *
 * @example <caption>Show only elements with price < 30 AND category === 'fruit'</caption>
 * const s = carto.expressions;
 * const $price = s.prop('price');
 * const $category = s.prop('category');
 *
 * const viz = new carto.Viz({
 *   filter: s.and(
 *     s.lt($price, 30),
 *     s.eq($category, 'fruit')
 *   )
 * });
 *
 * @memberof carto.expressions
 * @name and
 * @function
 * @api
 */
export const And = genBinaryOp('and',
    NUMBERS_TO_NUMBER,
    (x, y) => Math.min(x * y, 1),
    (x, y) => `min(${x} * ${y}, 1.)`
);

function genBinaryOp(name, allowedSignature, jsFn, glsl) {
    return class BinaryOperation extends BaseExpression {
        constructor(a, b) {
            if (Number.isFinite(a) && Number.isFinite(b)) {
                return number(jsFn(a, b));
            }
            a = implicitCast(a);
            b = implicitCast(b);

            const signature = getSignature(a, b);
            if (signature !== undefined) {
                if (signature == UNSUPPORTED_SIGNATURE || !(signature & allowedSignature)) {
                    throw new Error(`${name}(): invalid parameter types\n'x' type was ${a.type}, 'y' type was ${b.type}`);
                }
            }

            super({ a, b });
            this.type = getReturnTypeFromSignature(signature);
        }
        eval(feature) {
            return jsFn(this.a.eval(feature), this.b.eval(feature));
        }
        _compile(meta) {
            super._compile(meta);
            const [a, b] = [this.a, this.b];

            const signature = getSignature(a, b);
            if (signature == UNSUPPORTED_SIGNATURE || !(signature & allowedSignature)) {
                throw new Error(`${name}(): invalid parameter types\n'x' type was ${a.type}, 'y' type was ${b.type}`);
            }
            this.type = getReturnTypeFromSignature(signature);

            this.inlineMaker = inline => glsl(inline.a, inline.b);
        }
    };
}

function getSignature(a, b) {
    if (!a.type || !b.type) {
        return undefined;
    } else if (a.type == 'number' && b.type == 'number') {
        return NUMBERS_TO_NUMBER;
    } else if (a.type == 'number' && b.type == 'color') {
        return NUMBER_AND_COLOR_TO_COLOR;
    } else if (a.type == 'color' && b.type == 'number') {
        return NUMBER_AND_COLOR_TO_COLOR;
    } else if (a.type == 'color' && b.type == 'color') {
        return COLORS_TO_COLOR;
    } else if (a.type == 'category' && b.type == 'category') {
        return CATEGORIES_TO_NUMBER;
    } else {
        return UNSUPPORTED_SIGNATURE;
    }
}

function getReturnTypeFromSignature(signature) {
    switch (signature) {
        case NUMBERS_TO_NUMBER:
            return 'number';
        case NUMBER_AND_COLOR_TO_COLOR:
            return 'color';
        case COLORS_TO_COLOR:
            return 'color';
        case CATEGORIES_TO_NUMBER:
            return 'number';
        default:
            return undefined;
    }
}