import React from 'react';
import PropTypes from 'prop-types';
// Load jQuery for jQuery.i18n
import jQuery from 'jquery';
// @see https://github.com/wikimedia/jquery.i18n/issues/159
import 'cldrpluralruleparser/src/CLDRPluralRuleParser';
import '@wikimedia/jquery.i18n/src/jquery.i18n';
import '@wikimedia/jquery.i18n/src/jquery.i18n.messagestore';
import '@wikimedia/jquery.i18n/src/jquery.i18n.fallbacks';
import '@wikimedia/jquery.i18n/src/jquery.i18n.parser';
import '@wikimedia/jquery.i18n/src/jquery.i18n.emitter';
import '@wikimedia/jquery.i18n/src/jquery.i18n.language';
import '@wikimedia/jquery.i18n/src/languages/bs';
import '@wikimedia/jquery.i18n/src/languages/dsb';
import '@wikimedia/jquery.i18n/src/languages/fi';
import '@wikimedia/jquery.i18n/src/languages/ga';
import '@wikimedia/jquery.i18n/src/languages/he';
import '@wikimedia/jquery.i18n/src/languages/hsb';
import '@wikimedia/jquery.i18n/src/languages/hu';
import '@wikimedia/jquery.i18n/src/languages/hy';
import '@wikimedia/jquery.i18n/src/languages/la';
import '@wikimedia/jquery.i18n/src/languages/ml';
import '@wikimedia/jquery.i18n/src/languages/os';
import '@wikimedia/jquery.i18n/src/languages/ru';
import '@wikimedia/jquery.i18n/src/languages/sl';
import '@wikimedia/jquery.i18n/src/languages/uk';

class IntlProvider extends React.Component {
	constructor( props ) {
		super( props );

		jQuery.i18n( {
			// Convert to lowercase.
			// @see https://github.com/wikimedia/jquery.i18n/issues/120
			locale: props.locale.toLowerCase()
		} ).load( props.messages );
	}

	render() {
		const { children } = this.props;
		return children;
	}
}

IntlProvider.propTypes = {
	children: PropTypes.node.isRequired,
	locale: PropTypes.string.isRequired,
	messages: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default IntlProvider;
