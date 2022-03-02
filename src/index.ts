import './util/module-alias';
import 'dotenv/config';
import './util/module-alias';

import Application from '@src/application/Application';

(async () => {
    const app = new Application();
    await app.init();
})();
