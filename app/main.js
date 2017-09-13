import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import UsersStore from './store/UsersStore';
import App from './containers/app';
import './styles/styles.scss';

render(
    <Provider UsersStore={UsersStore}>
        <App />
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./containers/app', () => {
        const NewApp = require('./containers/app').default;
        render(
            <Provider UsersStore={UsersStore}>
                <NewApp />
            </Provider>,
            document.getElementById('app')
        );
    });
}
