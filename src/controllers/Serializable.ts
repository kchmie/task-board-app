
export default class Serializable {
    toJSON(): Partial<this> {
        const obj: Partial<this> = {};
        Object.keys(this).forEach((key) => {
            obj[key as keyof this] = this[key as keyof this]
        });
        return obj;
    }

    static fromJSON(this: new (...args: any[]) => Object, obj: any) {
        const instance = new this(...Object.values(obj))
        Object.assign(instance, obj);
        return instance;
    }
}
