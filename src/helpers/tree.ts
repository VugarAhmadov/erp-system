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
