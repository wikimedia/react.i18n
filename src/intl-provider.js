import { createElement } from 'react';
import PropTypes from 'prop-types';
import Banana from 'banana-i18n';
import BananaContext from './banana-context';

const IntlProvider = ( { locale, messages, children } ) => {
	// Convert to lowercase.
	// @see https://github.com/wikimedia/jquery.i18n/issues/120
	const banana = new Banana( locale.toLowerCase(), {
		messages
	} );

	return createElement(
		BananaContext.Provider,
		{
			value: banana
		},
		children
	);
};

IntlProvider.propTypes = {
	children: PropTypes.node.isRequired,
	locale: PropTypes.string.isRequired,
	messages: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default IntlProvider;
