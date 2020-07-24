import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import Banner, { bannerTypes } from '../index';

describe('<Banner />', () => {
  let component;
  let container = null;
  beforeEach(() => {
    component = render(<Banner
      type={bannerTypes.SUCCESS}
      message="banner message"
    />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<Banner
      type={bannerTypes.SUCCESS}
      message="banner message"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display a message', () => {
    const element = component.getByText(/banner message/i);
    expect(element).toBeInTheDocument();
  });
  it('should be have success classname', () => {
    const banner = component.getByRole('banner');
    expect(banner.className).toEqual('success');
  });
});
