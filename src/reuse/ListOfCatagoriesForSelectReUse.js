export const catagoryParentIdForSelect = (catagories, store = []) => {
    for (let cat of catagories) {
        store.push({
            name: cat.name,
            value: cat._id,
            type: cat.type,
            parentId: cat.parentId,
        })
        if (cat.children.length > 0) {
            catagoryParentIdForSelect(cat.children, store)
        }
    }
    return store;
}
