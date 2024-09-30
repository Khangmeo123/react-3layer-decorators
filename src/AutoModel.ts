// import 'reflect-metadata';
// import { BasePrototype } from './BasePrototype';

// export function AutoModel<T extends { new (...rest: any[])  }>() {
//   return (constructor: T) => {
//     return class extends constructor {
//       constructor(...rest: any[]) {
//         super(...rest);

//         const basePrototype = BasePrototype.getOrCreate(constructor);

//         Object.entries(basePrototype.propertyDescriptors).forEach(
//           ([prop, desc]) => {
//             Object.defineProperty(this, prop, desc);
//           },
//         );
//       }
//     };
//   };
// }
