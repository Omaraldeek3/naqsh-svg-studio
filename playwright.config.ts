import {defineConfig} from "@playwright/test";
const baseURL=process.env.SVG_STUDIO_TEST_URL||"http://127.0.0.1:3015";
export default defineConfig({
  testDir:"./tests/browser",fullyParallel:false,workers:1,
  use:{baseURL,browserName:"chromium",channel:"msedge",screenshot:"only-on-failure",trace:"retain-on-failure"},
  ...(process.env.SVG_STUDIO_TEST_URL?{}:{webServer:{command:"npm run dev",url:baseURL,reuseExistingServer:true,timeout:120000}}),
  reporter:[["list"]],
});
