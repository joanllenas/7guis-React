export function findUserById(users, id) {
  const filteredUser = users.filter(user => user.id === id);
  return filteredUser.length > 0 ? filteredUser[0] : null;
}

export function findUserIndexById(users, id) {
  let userIndex = -1;
  users
    .forEach((user, index) => {
      if (user.id === id) {
        userIndex = index;
      }
    });
  return userIndex;
}

const d = new Date();
let count = 0;
export function generateUserId() {
  return 'u' + d.setTime(Date.now()).toString() + "." + count++; // eslint-disable-line
}

export function filterUsersByPrefix(users, prefix) {
  return users.filter(
      (user) => user.surname.startsWith(prefix || '')
    );
}

export function fullNameFromUser(user) {
  let fullName = null;
  if (!!user &&
    user.hasOwnProperty('name') &&
    user.hasOwnProperty('surname')) {
    fullName = `${user.surname}, ${user.name}`;
  }
  return fullName;
}
