import 'reflect-metadata';
/**
 * Decorate a field as enum value
 *
 * @param enumObject
 * @constructor
 */
export declare const Enum: (enumObject: Record<string, string | number | boolean>) => PropertyDecorator;
