import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../../components/Header';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('<Header />', () => {
  const header = mount(
    <ProviderMock>
      <Header />
    </ProviderMock>,
  );

  test('Header has 2 images (logo and user icon)', () => {
    expect(header.find('img')).toHaveLength(2);
  });

  test('Header has only one image loge', () => {
    expect(header.find('.header__img')).toHaveLength(1);
  });

  test('Header Snapshot', () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );
    expect(header.toJSON()).toMatchSnapshot();
  });

});
