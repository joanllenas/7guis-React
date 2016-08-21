import expect from 'expect';
import {createUsersList} from './users.stub';
import {
  findUserById,
  generateUserId,
  filterUsersByPrefix,
  fullNameFromUser
} from '../src/utils';

describe('findUserById', ()=>{
  it('finds the user', ()=>{
    const users = createUsersList();
    const user = findUserById(users, 'u2');
    expect(user).toEqual({
      id:'u2',
      name:'Max',
      surname:'Mustermann'
    });
  });

  it('returns null when the user is not found', ()=>{
    const users = createUsersList();
    const user = findUserById(users, 'u99999');
    expect(user).toBe(null);
  });
});

describe('generateUserId', ()=>{
  it('generates a unique user id', ()=>{
    const ids = [0,1,2,3,4,5,6,7,8,9];
    ids.forEach( (n,index)=>{
      ids[index] = generateUserId();
    });
    let repeated = false;
    ids.forEach( (id, index) => {
      let indexof = ids.indexOf(id);
      repeated = index !== indexof && index > -1;
    });
    expect(repeated).toBe(false);
  });
});

describe('fullNameFromUser', ()=>{
  it('returns the correct full name given a valid user object is provided', ()=>{
    expect(fullNameFromUser({
      name: "Bob",
      surname: 'Sponge'
    })).toBe('Sponge, Bob');
  });
  it('returns null given any invalid user value', ()=>{
    expect(fullNameFromUser(null)).toBe(null);
    expect(fullNameFromUser(undefined)).toBe(null);
    expect(fullNameFromUser({})).toBe(null);
  });
});

describe('filterUserByPrefix', ()=>{
  it('returns the filtered array of users based on the given non-empty prefix', ()=>{
    let filteredList = filterUsersByPrefix(createUsersList(), 'M');
    expect(filteredList.length).toBe(2);
    filteredList = filterUsersByPrefix(createUsersList(), 'Maiden');
    expect(filteredList.length).toBe(1);
    expect(filteredList[0]).toEqual({id:'u4', name:'Iron',surname:'Maiden'});
  });
  it('returns the whole array of users based on the given empty prefix', ()=>{
    let filteredList = filterUsersByPrefix(createUsersList(), '');
    expect(filteredList.length).toBe(5);
    filteredList = filterUsersByPrefix(createUsersList(), undefined);
    expect(filteredList.length).toBe(5);
    filteredList = filterUsersByPrefix(createUsersList(), null);
    expect(filteredList.length).toBe(5);
  });
});
