import authHelper from '../auth';
// Created by thanhpd on 6/11/2019
const users ='users';
const products = `products`;
const update = 'update';
const add = 'add';
const ppm = 'ppm';

const addUser = `${ppm}:${users}:${add}`;
const allActionUser = `${ppm}:${users}:*`;
const allResource = `${ppm}:*:*`;
const updateUser = `${ppm}:${users}:${update}`;
const addProduct = `${ppm}:${products}:${add}`;

const addUserPermission = {app: ppm, resource: users, action: add};
const updateUserPermission = {app: ppm, resource: users, action: update};
const addProductPermission = {app: ppm, resource: products, action: add};

describe('test filterHasPermissions', () => {
  it('when has permission required', () => {
    const item1 = { permissions: [addUserPermission, updateUserPermission] };
    const item2 = { permissions: [addProductPermission] };
    const result = authHelper.filterHasPermissions([item1, item2], [addUser]);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(item1);
  });

  it('when has permission required and relative', () => {
    const item1 = { permissions: [{app: ppm, resource: users}, updateUserPermission], relative: true };
    const item2 = { permissions: [addProductPermission] };
    const result = authHelper.filterHasPermissions([item1, item2], [addUser]);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(item1);
  });

  it('when has permission required and relative with * permission action', () => {
    const item1 = { permissions: [{app: ppm, resource: users}, updateUserPermission] };
    const item2 = { permissions: [addProductPermission] };
    const result = authHelper.filterHasPermissions([item1, item2], [allActionUser]);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(item1);
  });

  it('when has permission required and relative with * permission resource', () => {
    const item1 = { permissions: [{app: ppm, resource: users}, updateUserPermission] };
    const item2 = { permissions: [addProductPermission] };
    const result = authHelper.filterHasPermissions([item1, item2], [allResource]);
    expect(result.length).toBe(2);
    expect(result[0]).toBe(item1);
    expect(result[1]).toBe(item2);
  });

  it('when has permission not required', () => {
    const item1 = { permissions: [addUserPermission, updateUserPermission] };
    const item2 = {};
    const result = authHelper.filterHasPermissions([item1, item2], [addProduct]);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(item2);
  });
});


describe('test checkPermission', () => {
  it('when has permission', () => {
    const result = authHelper.checkPermission([addUser, updateUser], ppm, users, add);
    expect(result).toBe(true)
  });

  it('when has permission with * action', () => {
    const result = authHelper.checkPermission([allActionUser, updateUser], ppm, users, add);
    expect(result).toBe(true)
  });

  it('when has permission with * resource', () => {
    const result = authHelper.checkPermission([allResource, updateUser], ppm, users, add);
    expect(result).toBe(true)
  });

  it('when has no permission', () => {
    const result = authHelper.checkPermission([addProduct, updateUser], ppm, users, add);
    expect(result).toBe(false)
  })
});

describe('test permission', () => {
  it('when normal case', () => {
    const result = authHelper.permission('seller','price', 'update');
    expect(result).toBe('seller:price:update')
  });

  it('when action not provided', () => {
    const result = authHelper.permission('seller', 'price');
    expect(result).toBe('seller:price')
  })
});
