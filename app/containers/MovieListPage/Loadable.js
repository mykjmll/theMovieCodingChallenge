/**
 *
 * Asynchronously loads the component for MovieListPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
