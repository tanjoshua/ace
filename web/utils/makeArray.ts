const makeArray = (obj) => {
  if (!obj) {
    return obj;
  }

  if (obj instanceof Array) {
    return obj;
  } else {
    return [obj];
  }
};

export default makeArray;
