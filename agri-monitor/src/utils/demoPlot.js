export const DEMO_POLYGON_ID = '69ea12dd646c6525ad9fd4ad';

const DEMO_PLOT_NAMES = [
  'Demo Field Alpha',
  'Demo Field Beta',
  'Demo Field Gamma',
  'Demo Field Delta',
];

export const getRandomDemoPlotName = () => {
  const randomIndex = Math.floor(Math.random() * DEMO_PLOT_NAMES.length);
  return DEMO_PLOT_NAMES[randomIndex];
};

export const createDemoPlot = () => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  polyId: DEMO_POLYGON_ID,
  nickname: getRandomDemoPlotName(),
  soilData: null,
});
