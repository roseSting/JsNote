const wm = new WeakMap();

class User {
    constructor(id){
        this.idProperty = Symbol('id');
        this.setId(id);
    }

    setPrivate(property,value){
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this,privateMembers);
    }

    getPrivate(property){
        return wm.get(this)[property];
    }

    setId(id){
        this.setPrivate(this.idProperty,id);
    }

    getId(){
        return this.getPrivate(this.idProperty);
    }
}

const user = new User(123);
user.getId();   //123
user.setId(456);
user.getId();   //456

// 并不是真正私有的
console.log(wm.get(user)[user.idProperty]);   //456