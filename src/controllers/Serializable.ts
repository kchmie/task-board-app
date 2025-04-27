
export default class Serializable {
    toJSON(): Partial<this> {
        const obj: Partial<this> = {};
        Object.keys(this).forEach((key) => {
            obj[key as keyof this] = this[key as keyof this]
        });
        return obj;
    }

    static fromJSON<T>(this: new (...args: any[]) => Object, obj: any, fixSubClassArrays: [string, object][] | null = null) {
        const instance = new this(...Object.values(obj))
        Object.assign(instance, obj);
        
        if(fixSubClassArrays) {
            for(let fix of fixSubClassArrays) {
                for(let el of obj[fix[0]]) {
                    Object.setPrototypeOf(el, fix[1])
                }
            }
        }

        return instance as T;
    }
}
