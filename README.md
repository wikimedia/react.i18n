react.i18n
===========

React i18n provides [React](https://reactjs.org) bindings for [jQuery.i18n](https://github.com/wikimedia/jquery.i18n).

Setup
-----
`jQuery` needs to be in the global scope attached to the `window`. This can be done with something like [expose-loader](https://github.com/webpack-contrib/expose-loader) which a config like this:
```javascript
{
	test: require.resolve( 'jquery' ),
	use: [
		{
			loader: 'expose-loader',
			options: 'jQuery'
		}
	]
}
```

Usage
-----
```javascript
import { IntlProvider, Message } from '@wikimedia/react.i18n';

const locale = 'en-US';

const messages = {
	en: {
		'hello-world': 'Hello $1!',
		'world': 'World',
	}
};

const App = () => (
	<IntlProvider locale={locale} messages={messages}>
		<Message id="hello-world" placeholders={[
			'David'
		]} />
	</IntlProvider>
);

export default App;

// Rendered Output:
// Hello David!
```

The `Message` component can also be used as a standard function that will return a string (if possible) or a React component (if any of the placeholders are React components):
```javascript
const helloWorld = Message({
	id: 'hello-world',
	placeholders: [
		'David',
	]
});

console.log(helloWorld);  // Hello David!
```

The placeholders can also be React components:
```javascript
<Message id="hello-world" placeholders={[
	<strong><Message id="world" /></strong>,
]} />

// Rendered Output:
// Hello <strong>World</strong>!
```
