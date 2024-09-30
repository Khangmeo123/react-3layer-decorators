require('reflect-metadata');
var dayjs = require('dayjs');
var moment = require('moment');

var DecoratorSymbol;
(function (DecoratorSymbol) {
    DecoratorSymbol["RAW_VALUE"] = "__RAW_VALUE__";
    DecoratorSymbol["PROTOTYPE"] = "__PROTOTYPE__";
})(DecoratorSymbol || (DecoratorSymbol = {}));

/**
 * Decorate a field as enum value
 *
 * @param enumObject
 * @constructor
 */
const Enum = (enumObject) => {
    return (Target, property) => {
        Object.defineProperty(Target, property, {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        if (value === null || value === undefined) {
                            Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                            return;
                        }
                        const values = Object.values(enumObject);
                        if (!values.includes(value)) {
                            throw new Error(`Value ${value} is not a member of enum { ${values.join(', ')} }`);
                        }
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                    },
                });
                this[property] = value;
            },
        });
    };
};

class BasePrototype {
    constructor(name) {
        this.descriptors = {};
        this.setPropertyDescriptor = (property, descriptor) => {
            if (!Object.prototype.hasOwnProperty.call(this.descriptors, property)) {
                Object.defineProperty(this.descriptors, property, {
                    get: () => descriptor,
                    enumerable: true,
                    configurable: false,
                });
            }
        };
        this.name = name;
    }
    get propertyDescriptors() {
        return this.descriptors;
    }
    static getOrCreate(Target) {
        if (!Reflect.hasMetadata(DecoratorSymbol.PROTOTYPE, Target)) {
            const basePrototype = new BasePrototype(Target.name);
            Reflect.defineMetadata(DecoratorSymbol.PROTOTYPE, basePrototype, Target);
        }
        return Reflect.getMetadata(DecoratorSymbol.PROTOTYPE, Target);
    }
}

/**
 * Decorate a field with primitive format: String, Number, Boolean
 *
 * @param prototype {Function}
 * @constructor
 */
const Field = (prototype) => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        if (value === null || value === undefined) {
                            Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                            return;
                        }
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, prototype(value), this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

/**
 * Decorate a field as a list of primitive values
 *
 * @param prototype {Function}
 * @constructor
 */
const List = (prototype) => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        const instances = value === null || value === void 0 ? void 0 : value.map((element) => {
                            if (element === null || element === undefined) {
                                return element;
                            }
                            return prototype(element);
                        });
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, instances, this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

/**
 * Decorate a field with moment format
 *
 * @constructor
 */
const DayjsField = () => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        if (value === null || value === undefined) {
                            Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                            return;
                        }
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, dayjs(value), this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

/**
 * Decorate a field with moment format
 *
 * @constructor
 */
const MomentField = () => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        if (value === null || value === undefined) {
                            Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                            return;
                        }
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, moment(value).format(), this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

/**
 * Decorate a field as a model relation
 *
 * @param constructor
 * @constructor
 */
const ObjectField = (constructor) => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        if (value === null ||
                            value === undefined ||
                            value instanceof Target.constructor) {
                            Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, value, this, property);
                            return;
                        }
                        let instance;
                        const InstanceConstructor = constructor !== null && constructor !== void 0 ? constructor : Target.constructor;
                        if (typeof InstanceConstructor.create === 'function') {
                            instance = InstanceConstructor.create();
                        }
                        else {
                            instance = new InstanceConstructor();
                        }
                        Object.assign(instance, value);
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, instance, this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

/**
 * Decorate a field as a list of model relation
 *
 * @param constructor
 * @constructor
 */
const ObjectList = (constructor) => {
    return (Target, property) => {
        const basePrototype = BasePrototype.getOrCreate(Target.constructor);
        const descriptor = {
            enumerable: true,
            configurable: true,
            get() {
                return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
            },
            set(value) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return Reflect.getMetadata(DecoratorSymbol.RAW_VALUE, this, property);
                    },
                    set(value) {
                        const InstanceConstructor = constructor !== null && constructor !== void 0 ? constructor : Target.constructor;
                        const instances = value === null || value === void 0 ? void 0 : value.map((element) => {
                            let instance;
                            if (typeof InstanceConstructor.create === 'function') {
                                instance = InstanceConstructor.create();
                            }
                            else {
                                instance = new InstanceConstructor();
                            }
                            if (typeof element === 'object' && element !== null) {
                                Object.assign(instance, element);
                            }
                            return instance;
                        });
                        Reflect.defineMetadata(DecoratorSymbol.RAW_VALUE, instances, this, property);
                    },
                });
                this[property] = value;
            },
        };
        Object.defineProperty(Target, property, descriptor);
        basePrototype.setPropertyDescriptor(property, descriptor);
    };
};

exports.DayjsField = DayjsField;
exports.Enum = Enum;
exports.Field = Field;
exports.List = List;
exports.MomentField = MomentField;
exports.ObjectField = ObjectField;
exports.ObjectList = ObjectList;
//# sourceMappingURL=index.js.map
