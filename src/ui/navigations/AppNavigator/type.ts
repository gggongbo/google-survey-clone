export const enum routes {
  SURVEY = 'survey',
  PREVIEW = 'preview',
}

export type AppNavigatorParamList = {
  [routes.SURVEY]: undefined;
  [routes.PREVIEW]: undefined;
};
