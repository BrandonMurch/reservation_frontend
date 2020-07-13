// Thanks Andrew Nater for this trick on deep-freezing enumeration members.
const freeze = (obj) => Object.freeze(obj);

const enumeration = function deepFreezeEnumerationMembers(...members) {
  const memberValues = {};
  members.forEach((member) => {
    memberValues[member] = freeze({ value: member });
  });

  return freeze(memberValues);
};

// eslint-disable-next-line import/prefer-default-export
export { enumeration };
