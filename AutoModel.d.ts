import 'reflect-metadata';
export declare function AutoModel<T extends {
    new (...rest: any[]): any;
}>(): (constructor: T) => {
    new (...rest: any[]): {
        [x: string]: any;
    };
} & T;
