import type { SiteHeaderLabels } from "@/components/SiteHeader";
import type { HomeMessages } from "@/messages/tennisHomeCopy";

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
