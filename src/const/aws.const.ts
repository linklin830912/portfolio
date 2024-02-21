const AWS_CLOUDFRONT_URL =
  "https://cdn-postcard-dev.s3.ap-northeast-1.amazonaws.com/";
export function getCloudFrontCDNRoute(route: string): string {
  return `${AWS_CLOUDFRONT_URL}${route}`;
}
