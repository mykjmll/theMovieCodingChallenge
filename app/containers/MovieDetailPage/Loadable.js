/**
 *
 * Asynchronously loads the component for MovieDetailPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
