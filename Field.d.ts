import 'reflect-metadata';
/**
 * Decorate a field with primitive format: String, Number, Boolean
 *
 * @param prototype {Function}
 * @constructor
 */
export declare const Field: (prototype: (...params: any[]) => any) => PropertyDecorator;
