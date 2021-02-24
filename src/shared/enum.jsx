// Thanks Andrew Nater for this trick on deep-freezing enumeration members.
const freeze = (obj) => Object.freeze(obj);

const singleValue = function deepFreezeEnumerationSingleValueMembers(...members) {
  const memberValues = {};
  members.forEach((member) => {
    memberValues[member] = freeze({ value: member.toLowerCase() });
  });

  return freeze(memberValues);
};

const keyValue = function deepFreezeEnumerationSingleValueMembers(...members) {
  const memberValues = {};
  members.forEach((member) => {
    memberValues[member.key] = freeze(member.value);
  });

  return freeze(memberValues);
};

const enumeration = {
  singleValue,
  keyValue,
};
// eslint-disable-next-line import/prefer-default-export
export { enumeration };
