#!/bin/sh
set -eu

BASE_URL="${BASE_URL:-http://127.0.0.1:3114}"
SESSION="mobile-overflow"

pwcli() {
  if [ -n "${PWCLI:-}" ]; then
    "$PWCLI" "$@"
  elif command -v playwright-cli >/dev/null 2>&1; then
    playwright-cli "$@"
  else
    npx --yes --package @playwright/cli playwright-cli "$@"
  fi
}

cleanup() {
  pwcli -s="$SESSION" close >/dev/null 2>&1 || true
}
trap cleanup EXIT

pwcli -s="$SESSION" open "$BASE_URL" >/dev/null

result=$(pwcli -s="$SESSION" --json run-code '(async (page) => {
  const routes = [
    "/",
    "/missions",
    "/missions/order-coffee",
    "/missions/market-price",
    "/missions/order-food-spice",
    "/missions/driver-stop",
    "/lessons",
    "/lessons/week-1",
    "/lessons/week-2",
    "/lessons/week-3",
    "/lessons/week-4",
    "/practice",
    "/products",
    "/book",
    "/login",
    "/teacher-dashboard",
    "/lesson-report",
    "/auth/callback",
    "/does-not-exist"
  ];
  const widths = [320, 360, 375, 390];
  const origin = page.url().split("/").slice(0, 3).join("/");
  const issues = [];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      const response = await page.goto(origin + route, { waitUntil: "networkidle" });
      const status = response ? response.status() : null;
      const expectedStatus = route === "/does-not-exist" ? 404 : 200;
      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      if (status !== expectedStatus || layout.scrollWidth > layout.clientWidth) {
        issues.push({ route, width, status, expectedStatus, ...layout });
      }
    }
  }

  if (issues.length > 0) {
    throw new Error(`Mobile horizontal overflow: ${JSON.stringify(issues)}`);
  }

  return `${routes.length * widths.length} route-width checks passed`;
})')

printf '%s\n' "$result" | node -e '
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  const payload = JSON.parse(input);
  if (payload.isError) {
    console.error(payload.error);
    process.exit(1);
  }
  if (typeof payload.result !== "string") {
    console.error("Playwright check returned no result.");
    process.exit(1);
  }
  console.log(payload.result);
});
'
