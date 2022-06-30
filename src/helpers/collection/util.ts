



// 方法二
export function arrToTree(arr, pid = 0) {
  const newArr = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      newArr.push({
        ...item,
        children: arrToTree(arr, item.id),
      },);
    }
  },);
  return newArr;
}
