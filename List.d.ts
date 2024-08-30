import 'reflect-metadata';
/**
 * Decorate a field as a list of primitive values
 *
 * @param prototype {Function}
 * @constructor
 */
export declare const List: (prototype: (...params: any[]) => any) => PropertyDecorator;
