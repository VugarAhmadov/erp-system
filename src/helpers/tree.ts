export const createTree = (datas: any[]) => {
  let hashTable = Object.create(null);

  datas.forEach((data) => (hashTable[data.id] = { ...data, children: [] }));

  let dataTree: any[] = [];

  datas.forEach((data) => {
    if (data.parentId) {
      hashTable[data.parentId].children.push(hashTable[data.id]);
    } else {
      dataTree.push(hashTable[data.id]);
    }
  });

  return dataTree;
};

export const deleteTreeNode = (datas: any[], nodeId: number) => {
  //first time it's called id is put into an array
  let del = Array.isArray(nodeId) ? nodeId : [nodeId];

  let newArr: any[] = [];

  datas.forEach((obj) => {
    switch (true) {
      // removes topmost parent
      case del.includes(obj.id):
        break;
      // removes subsequent children
      case del.includes(obj.parentId):
        del.push(obj.id);
        break;
      // retains the rest
      default:
        newArr.push(obj);
    }
  });

  // if this pass did remove something, we call function again
  // since original array may not be sorted and deep grandchildren
  // are found in the beginning of the array
  if (datas.length !== newArr.length) {
    newArr = deleteTreeNode(newArr, del as number);
  }

  // when no further changes are made, we return the result
  return newArr;
};

// function removeDataWithRelationships(id) {
//   // find root parent to remove
//   var itemToRemoveIndex = dataStore.findIndex(ds => ds.id === id);

//   // grab reference to remove
//   var currentReference = dataStore[itemToRemoveIndex]

//   // remove current item
//   dataStore.splice(itemToRemoveIndex,1);

//   // look for children on currentReference
//   var childrenToRemove = dataStore.find(ds => ds.parentid === currentReference.id);

//   // if there are children, look for parents and run recursive operation
//   if (childrenToRemove) {
//         //recursively call this function to remove all children
//        childrenToRemove.forEach(id =>  {
//             removeDataWithRelationship(id);
//        });
//   }
// }
