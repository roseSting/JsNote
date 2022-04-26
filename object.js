const key1 = { id: 1 },
    key2 = { id: 2 },
    key3 = { id: 3 };

    const wm = new WeakMap().set(key1, "val1");

wm.set(key2, "val2")
    .set(key3, "val3");

wm.get(key1);
wm.get(key2);
wm.get(key3);


const wm = new WeakMap();
wm.set({}, "val");

const wm = new WeakMap();
const container = {
    key: {}
}

wm.set(container.key, "val1");
function removeReference(){
    container.key = null;   //摧毁对象的最后一个引用
}