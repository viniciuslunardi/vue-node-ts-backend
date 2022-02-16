import 'dotenv/config';
import './util/module-alias';

import Application from '@src/application/Application';

(async () => {
    console.log('test')
    const app = new Application();
    await app.init();
})();
