import { generate } from "short-uuid";

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

export const deleteTreeNode = (datas: any[], nodeId: string) => {
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
    newArr = deleteTreeNode(newArr, del as string);
  }

  // when no further changes are made, we return the result
  return newArr;
};

export const copyTreeNode = (datas: any[], copiedNodeId: string, appliedNodeId: string) => {
  let copiedNode = datas.find((data) => data.id === copiedNodeId);

  let copy = { ...copiedNode };

  copy.id = generate();
  copy.parentId = appliedNodeId;

  datas.push(copy);

  return datas;
};
