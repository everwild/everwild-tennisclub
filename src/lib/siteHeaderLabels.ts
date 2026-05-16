import type { SiteHeaderLabels } from "@/components/SiteHeader";
import type { Lang } from "@/lib/lang";
import type { HomeMessages } from "@/messages/tennisHomeCopy";
import { tennisHomeCopy } from "@/messages/tennisHomeCopy";

/** Maps home copy (brand line + primary nav) into props for [`SiteHeader`](@/components/SiteHeader.tsx). */
export function toSiteHeaderLabels(t: HomeMessages): SiteHeaderLabels {
  return {
    brandLine: t.brandLine,
    navManifesto: t.navManifesto,
    navSchedule: t.navSchedule,
    navRoutes: t.navRoutes,
    navPacers: t.navPacers,
    navGallery: t.navGallery,
    navSocial: t.navSocial,
    navBrands: t.navBrands,
    navSignup: t.navSignup
  };
}

/**
 * Header labels always follow [`tennisHomeCopy`](@/messages/tennisHomeCopy) so legal/subpages never drift.
 */
export function siteNavLabels(lang: Lang): SiteHeaderLabels {
  return toSiteHeaderLabels(tennisHomeCopy[lang]);
}
