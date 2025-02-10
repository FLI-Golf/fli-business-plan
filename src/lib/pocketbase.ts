import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://few-likely.pockethost.io');

export async function createUser(data: {
    email: string;
    password: string;
    passwordConfirm: string;
}) {
    return await pb.collection('users').create({
      ...data,
      emailVisibility: true
    });
}
