export  const updateObjectInArray = (items, itemID, objPropName, newObjectProps) => {
   return items.map(i => {
            if (i[objPropName] === itemID ) {
                return {...i, ...newObjectProps}
            }
            return i
        })
};

