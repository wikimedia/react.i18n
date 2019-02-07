react.i18n
===========

React i18n provides [React](https://reactjs.org) bindings for [banana-i18n](https://github.com/wikimedia/banana-i18n).

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

The placeholders can also be React components:
```javascript
<Message id="hello-world" placeholders={[
  <strong><Message id="world" /></strong>,
]} />

// Rendered Output:
// Hello <strong>World</strong>!
```

The `BananaContext` can also be used directly to return a string as described in
React's [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer)
documentation.
```javascript
import { IntlProvider, BananaContext } from '@wikimedia/react.i18n';

const locale = 'en-US';

const messages = {
  en: {
    'hello-world': 'Hello $1!',
    'world': 'World',
  }
};

const App = () => (
  <IntlProvider locale={locale} messages={messages}>
    <BananaContext.Consumer>
      {banana =>
        banana.i18n( 'hello-world', 'David' )
      }
    </BananaContext.Consumer>
  </IntlProvider>
);

export default App;

// Rendered Output:
// Hello David!
```

or with React's [Context Hook](https://reactjs.org/docs/hooks-reference.html#usecontext):
```javascript
import { useContext } from 'react';
import { IntlProvider, BananaContext } from '@wikimedia/react.i18n';

const locale = 'en-US';

const messages = {
  en: {
    'hello-world': 'Hello $1!',
    'world': 'World',
  }
};

const App = () => {
  const banana = useContext(BananaContext);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {banana.i18n( 'hello-world', 'David' )}
    </IntlProvider>
  );
};

export default App;

// Rendered Output:
// Hello David!
```

Migrating from 1.x
------------------
*   `Message` can no longer be used as a function. To use the Banana object
    directly, get the context consumer as described above.
