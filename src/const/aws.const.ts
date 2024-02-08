export const cognitoUserPoolData = {
  UserPoolId: "us-east-1_5bChEWTQz",
  ClientId: "66tp9nem5fu6fegchql6m6ag37",
};

const cloudFrontCDN = "https://ddbb9d1l0v5b.cloudfront.net";
export const cloudFrontCDNRoute = (url: string) => {
  return `${cloudFrontCDN}${url}`;
};
