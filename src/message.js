import { createElement, isValidElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import BananaContext from './banana-context';

// @see https://github.com/yahoo/react-intl/blob/v2.4.0/src/components/message.js
function Message( { id, placeholders = [] } ) {
	return createElement(
		BananaContext.Consumer,
		null,
		( banana ) => {
			if ( !placeholders.length ) {
				return banana.i18n( id );
			}

			// If all of the placeholders are not react elements, return the string.
			if ( !placeholders.filter( p => isValidElement( p ) ).length ) {
				return banana.i18n( id, ...placeholders );
			}

			const uid = Math.floor( Math.random() * 0x10000000000 ).toString( 16 );
			const tokenDelimiter = `@__${uid}__@`;
			let elements = [];

			// Iterates over the `props` to keep track of any React Element
			// values so they can be represented by the `token` as a placeholder
			// when the `message` is formatted. This allows the formatted
			// message to then be broken-up into parts with references to the
			// React Elements inserted back in.
			const tokenizedPlaceholders = placeholders.map( ( placeholder, index ) => {
				if ( isValidElement( placeholder ) ) {
					const token = `ELEMENT-${uid}-${index}`;
					elements = {
						...elements,
						[ token ]: placeholder
					};
					return tokenDelimiter + token + tokenDelimiter;
				}

				return placeholder;
			} );

			const message = banana.i18n( id, ...tokenizedPlaceholders );

			// Split the message into parts so the React Element values captured
			// above can be inserted back into the rendered message. This
			// approach allows messages to render with React Elements while
			// keeping React's virtual diffing working properly.
			const nodes = message
				.split( tokenDelimiter )
				.filter( part => !!part )
				.map( part => elements[ part ] || part );

			// Needs to use `createElement()` instead of JSX, otherwise React will
			// warn about a missing `key` prop with rich-text message formatting.
			return createElement( Fragment, null, ...nodes );
		}
	);
}

Message.propTypes = {
	id: PropTypes.string.isRequired,
	placeholders: PropTypes.arrayOf(
		PropTypes.oneOfType( [
			PropTypes.bool,
			PropTypes.number,
			PropTypes.string,
			PropTypes.element
		] )
	)
};

Message.defaultProps = {
	placeholders: []
};

export default Message;
