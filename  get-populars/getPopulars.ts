import { google } from "googleapis";

(async () => {
  //取得準備
  const client = await google.auth.getClient({
    keyFile: "./keys.json", // 同階層に秘密鍵(Json形式)を作成してください: https://console.cloud.google.com/
    scopes: "https://www.googleapis.com/auth/analytics.readonly",
  });
  const reporting = await google.analyticsreporting({
    version: "v4",
    auth: client,
  });

  //ランキング取得
  const response = await reporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: "201161107",
          dateRanges: [{ startDate: "8daysAgo", endDate: "1daysAgo" }],
          metrics: [{ expression: "ga:pageviews" }],
          dimensions: [{ name: "ga:pagePath" }],
          orderBys: [{ fieldName: "ga:pageviews", sortOrder: "DESCENDING" }],
          pageSize: 30,
        },
      ],
    },
  });
  console.log(JSON.stringify(response.data, null, 2));
})();