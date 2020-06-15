import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './jupyterlab-chart-builder';
import { ILauncher } from '@jupyterlab/launcher';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { ICommandPalette } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';

//Importing icons
//import barChartIcon from '../style/bar_chart.svg';
//import lineChartIcon from '../style/line_chart.svg';
import pieChartSvg from '../style/pie_chart.svg';

const version = '0.1.0';
const CATEGORY = 'Chart Builder - ' + version;

/**
 * Initialization data for the jupyterlab-chart-builder extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-chart-builder',
  autoStart: true,
  requires: [ILauncher, ISettingRegistry, IMainMenu, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    launcher: ILauncher,
    settingsRegistry: ISettingRegistry,
    mainMenu: IMainMenu,
    commandPalette: ICommandPalette
    ) => {
      const { commands } = app;
      const commandPrefix = 'jupyterlab-chart-builder:';
      const pieChartIcon = new LabIcon({
        name: 'launcher:bar-chart-icon',
        svgstr: pieChartSvg
      });
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

      commands.addCommand(
        commandPrefix + 'pie chart',
        {
          label: 'pie chart',
          caption: 'piechart',
          icon: pieChartIcon,
          execute: async => {
            return "";
          }
        }
      );

      // Add the current tool to the launcher
      launcher.add({
        command: commandPrefix + 'pie chart',
        category: CATEGORY,
        rank: 1
      });
  }
};

export default extension;
