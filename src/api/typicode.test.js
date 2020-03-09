import {
    fetchPost,
    fetchUser,
    fetchCommentsForPost,
    fetchURL
} from './typicode';

test('fetchPost calls fetchURL with the correct value ', () => {
    expect(fetchPost('1', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(fetchPost(1, i => i)).toBe(
        'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(fetchPost('test', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/posts/test'
    );
    expect(fetchPost('01', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/posts/01'
    );
    expect(fetchPost(undefined, i => i)).toBe(
        'https://jsonplaceholder.typicode.com/posts/'
    );
});

test('fetchUser calls fetchURL with the correct value ', () => {
    expect(fetchUser('1', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/users/1'
    );
    expect(fetchUser(1, i => i)).toBe(
        'https://jsonplaceholder.typicode.com/users/1'
    );
    expect(fetchUser('test', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/users/test'
    );
    expect(fetchUser('01', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/users/01'
    );
});

test('fetchCommentsForPost calls fetchURL with the correct value ', () => {
    expect(fetchCommentsForPost('1', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/comments?postId=1'
    );
    expect(fetchCommentsForPost(1, i => i)).toBe(
        'https://jsonplaceholder.typicode.com/comments?postId=1'
    );
    expect(fetchCommentsForPost('test', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/comments?postId=test'
    );
    expect(fetchCommentsForPost('01', i => i)).toBe(
        'https://jsonplaceholder.typicode.com/comments?postId=01'
    );
});

test('fetchURL parses the responce correctly ', () => {
    const someData = {
        id: '123141',
        name: 'UserName'
    };
    const someJSON = {
        ok: true,
        json: () => someData,
        status: '200',
        name: 'UserName'
    };
    const mockFetch = () => {
        return jest.fn().mockImplementation(() => Promise.resolve(someJSON));
    };

    fetch = mockFetch();

    expect.assertions(3);

    fetchURL('whatevaaa').then(data => {
        expect(data).toEqual({
            id: someData.id,
            name: someJSON.name
        });
        expect(data).not.toEqual({
            id: someData.id,
            name: someJSON.name + 1
        });
    });

    expect(fetch).toHaveBeenCalledTimes(1);
});

test('fetchURL handles error correctly ', () => {
    const someRES = {
        status: '234',
        name: 'UserName'
    };
    const mockFetch = testData =>
        jest.fn().mockImplementation(() => Promise.resolve(testData));
    const url = '23';

    fetch = mockFetch(someRES);

    expect.assertions(3);

    fetchURL(url).catch(err => {
        const expectedError = new Error(
            'Status: ' + someRES.status + ', on fetching from ' + url
        );
        expect(err).toEqual(expectedError);

        const unexpectedError = new Error(
            'Status: ' + someRES.status + ', on fasfasfsadasd from ' + url
        );
        try {
            expect(err).not.toEqual(unexpectedError);
        } catch (err) {
            expect(1).toBe(2);
        }
    });

    expect(fetch).toHaveBeenCalledTimes(1);
});
