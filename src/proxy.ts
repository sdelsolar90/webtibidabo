import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export function proxy(request: import("next/server").NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|dabo.svg|logo-tibidabo\\.png|logo-tibidabo-800\\.png|isotipo-tibidabo-400\\.png|icon-192\\.png|icon-512\\.png|og-image\\.png|sitemap.xml|robots.txt).*)",
  ],
}
