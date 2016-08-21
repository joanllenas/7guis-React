export function findUserById(users, id) {
  const filteredUser = users.filter( user => user.id === id );
  return filteredUser.length > 0 ? filteredUser[0] : null;
}

const d = new Date();
let count = 0;
export function generateUserId() {
  return 'u' + d.getTime().toString() + "." + count++;
}

export function filterUsersByPrefix(users, prefix) {
  prefix = prefix || '';
  return users.filter(
      (user)=>{return user.surname.startsWith(prefix)}
    );
}

export function fullNameFromUser(user) {
  let fullName = null;
  if(!!user &&
    user.hasOwnProperty('name') &&
    user.hasOwnProperty('surname')) {
    fullName = `${user.surname}, ${user.name}`;
  }
  return fullName;
}
