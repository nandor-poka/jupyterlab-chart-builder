import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './jupyterlab-chart-builder';

/**
 * Initialization data for the jupyterlab-chart-builder extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-chart-builder',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-chart-builder is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyterlab_chart_builder server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
