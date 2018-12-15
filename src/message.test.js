import { createElement } from 'react';
import { shallow } from 'enzyme';
import IntlProvider from './intl-provider';
import Message from './message';

test( 'will get a basic message string', () => {
	const result = shallow(
		createElement(
			IntlProvider,
			{
				locale: 'en',
				messages: {
					en: {
						test: 'TEST'
					}
				}
			},
			createElement(
				Message,
				{
					id: 'test'
				}
			)
		)
	);

	expect( result.html() ).toStrictEqual( 'TEST' );
} );

test( 'will get a basic message string with a placeholder', () => {
	const result = shallow(
		createElement(
			IntlProvider,
			{
				locale: 'en',
				messages: {
					en: {
						test: 'TEST $1'
					}
				}
			},
			createElement(
				Message,
				{
					id: 'test',
					placeholders: [
						'RIGHT'
					]
				}
			)
		)
	);

	expect( result.html() ).toStrictEqual( 'TEST RIGHT' );
} );

test( 'will get a basic message string with multiple placeholders', () => {
	const result = shallow(
		createElement(
			IntlProvider,
			{
				locale: 'en',
				messages: {
					en: {
						test: '$2 TEST $1'
					}
				}
			},
			createElement(
				Message,
				{
					id: 'test',
					placeholders: [
						'RIGHT',
						'LEFT'
					]
				}
			)
		)
	);

	expect( result.html() ).toStrictEqual( 'LEFT TEST RIGHT' );
} );
