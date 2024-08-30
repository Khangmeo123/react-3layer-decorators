import 'reflect-metadata';
export declare class BasePrototype {
    readonly name: string;
    private readonly descriptors;
    constructor(name: string);
    get propertyDescriptors(): Record<string, PropertyDescriptor>;
    static getOrCreate(Target: new (...args: any[]) => any): BasePrototype;
    setPropertyDescriptor: (property: string | symbol, descriptor: PropertyDescriptor) => void;
}
