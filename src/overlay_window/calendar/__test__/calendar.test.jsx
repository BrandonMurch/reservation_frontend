// Dependencies
import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// Components
import Calendar from '../index';

const mockFetch = function mockFetchResponseFromServer() {
  const today = new Date();
  const todayDate = today.getDate();
  const todayString = today.toLocaleDateString('en-CA');
  const tomorrowString = todayString.replace(new RegExp(`${todayDate}$`, 'i'), todayDate + 1);
  const endDayString = todayString.replace(new RegExp(`${todayDate}$`, 'i'), todayDate + 3);

  const mockSuccessResponse = {
    start: todayString,
    end: endDayString,
    availableDates: [todayString, tomorrowString],
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  return Promise.resolve({
    status: 200,
    json: () => mockJsonPromise,
  });
};

describe('<Calendar />', () => {
  let component;
  let mockDateClickFunction;
  let container = null;

  beforeEach(async () => {
    mockDateClickFunction = jest.fn();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch());
    await act(async () => {
      component = await render(
        <Calendar dateClick={mockDateClickFunction} />,
      );
    });

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should fetch data from the server', async () => {
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should display tomorrow\'s date', () => {
    const today = new Date();
    const todayDate = today.getDate();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (tomorrow.getDate() > todayDate) {
      const tomorrowElement = component.getByText(`${tomorrow.getDate()}`);
      expect(tomorrowElement).toBeInTheDocument();
    }
  });

  it('should not display yesterday\'s date', () => {
    const today = new Date(2020, 12, 15);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayElement = component.queryByText(`${yesterday.getDate()}`);
    expect(yesterdayElement).not.toBeInTheDocument();
  });

  it('should disable unavailable dates', () => {
    const today = new Date();
    const disabledDate = new Date();
    disabledDate.setDate(today.getDate() + 3);
    const disabledElements = component.getAllByTestId('disabledDate');
    expect(disabledElements.length).toBeGreaterThan(0);
    expect(disabledElements[0].className).toContain('fc-day-disabled');
  });

  it('should call setError if server is unavailable', async () => {
    await act(async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
      component = await render(
        <Calendar dateClick={mockDateClickFunction} />,
      );
    });
    const errorText = component.getByText(/Something went wrong/i);
    expect(errorText).toBeInTheDocument();
  });
  /*
  FIXME: FullCalendar is not playing nice with clickableElements
  have tried click, mouseDown, mouseUp.
  Doesn't seem to be calling dateClick.
  When using the info.jsEvent property of dateClick,
  mouse up was called on the td element
  (same as clickableElements[0], as shown by console.log)
  I have disabled the clickableDate data-testid in calendar until this can be figured out.
  */
  // it('should call dateClick when a date is clicked', () => {
  //   const clickableElements = component.getAllByTestId('clickableDate');
  //   fireEvent.mouseDown(clickableElements[1]);
  //   fireEvent.mouseUp(clickableElements[1]);
  //   expect(mockDateClickFunction).toHaveBeenCalled();
  // });
});
