import gravatar from '../../utils/gravatar';

test('Gravatar Function test', () => {
  const email = 'test_email@gmail.com';
  const gravatarUrl = 'https://gravatar.com/avatar/e78931f87a8840efbad464db95e4d40b';
  expect(gravatarUrl).toEqual(gravatar(email));
});
