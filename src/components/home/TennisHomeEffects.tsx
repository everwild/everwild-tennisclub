"use client";

import { useLayoutEffect } from "react";

/** Survives `HomeEffects` unmount/remount (e.g. client-side locale switch on `/[lang]/`) so hero height is not re-measured when the viewport is unchanged. Cleared on mobile layout or viewport change vs cached size. */
type HeroDesktopRuntimeCache = { px: string; vw: number; vh: number };
let heroDesktopRuntimeCache: HeroDesktopRuntimeCache | null = null;

export function TennisHomeEffects() {
  useLayoutEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const initHeroRuntimeHeight = (root: Element | null) => {
      if (!root) {
        return () => {};
      }

      const frame = root.querySelector(".hero-media-frame");
      const images = Array.from(root.querySelectorAll<HTMLImageElement>(".hero-slide img"));
      const mobileQuery = window.matchMedia("(max-width: 760px)");
      let frameId: number | null = null;
      /** Desktop only: after first successful height commit in this mount, skip further work until mobile or remount. */
      let desktopHeroHeightCommitted = false;

      const applyHeroRuntimeHeightOnce = () => {
        if (mobileQuery.matches) {
          document.documentElement.style.removeProperty("--hero-runtime-height");
          desktopHeroHeightCommitted = false;
          heroDesktopRuntimeCache = null;
          return;
        }

        if (desktopHeroHeightCommitted) {
          return;
        }

        const cache = heroDesktopRuntimeCache;
        if (cache) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          if (Math.abs(vw - cache.vw) <= 2 && Math.abs(vh - cache.vh) <= 2) {
            document.documentElement.style.setProperty("--hero-runtime-height", cache.px);
            desktopHeroHeightCommitted = true;
            return;
          }
          heroDesktopRuntimeCache = null;
        }

        if (!frame || !images.length) {
          return;
        }

        const frameWidth = frame.clientWidth || document.documentElement.clientWidth || window.innerWidth;
        const slideRatios = images
          .map((image) => {
            const naturalWidth = image.naturalWidth || Number(image.getAttribute("width")) || 0;
            const naturalHeight = image.naturalHeight || Number(image.getAttribute("height")) || 0;
            if (!naturalWidth || !naturalHeight) {
              return null;
            }
            return naturalHeight / naturalWidth;
          })
          .filter((ratio): ratio is number => typeof ratio === "number" && Number.isFinite(ratio));

        if (!slideRatios.length) {
          document.documentElement.style.removeProperty("--hero-runtime-height");
          return;
        }

        const imageBoundHeight = Math.min(...slideRatios.map((ratio) => frameWidth * ratio));
        const baseViewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        const heroTopLift = Math.min(root.getBoundingClientRect().top, 0);
        const requiredHeight = baseViewportHeight - heroTopLift;
        const runtimeHeight = Math.min(requiredHeight, imageBoundHeight);

        const px = `${Math.round(runtimeHeight)}px`;
        document.documentElement.style.setProperty("--hero-runtime-height", px);
        desktopHeroHeightCommitted = true;
        heroDesktopRuntimeCache = {
          px,
          vw: window.innerWidth,
          vh: window.innerHeight
        };
      };

      const queueHeroRuntimeHeightOnce = () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
        frameId = window.requestAnimationFrame(() => {
          frameId = null;
          applyHeroRuntimeHeightOnce();
        });
      };

      queueHeroRuntimeHeightOnce();
      const onMq = () => queueHeroRuntimeHeightOnce();
      if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", onMq);
      } else {
        mobileQuery.addListener(onMq);
      }
      return () => {
        if (typeof mobileQuery.removeEventListener === "function") {
          mobileQuery.removeEventListener("change", onMq);
        } else {
          mobileQuery.removeListener(onMq);
        }
        document.documentElement.style.removeProperty("--hero-runtime-height");
      };
    };

    const initFadeCarousel = ({
      root,
      slideSelector,
      transitionMs,
      holdMs,
      activeClass = "is-active"
    }: {
      root: Element | null;
      slideSelector: string;
      transitionMs: number;
      holdMs: number;
      activeClass?: string;
    }) => {
      if (!root) {
        return () => {};
      }
      const slides = Array.from(root.querySelectorAll(slideSelector));
      if (slides.length < 2) {
        slides[0]?.classList.add(activeClass);
        return () => {};
      }

      let activeIndex = slides.findIndex((slide) => slide.classList.contains(activeClass));
      let autoplayId: number | null = null;
      let watchdogId: number | null = null;
      let lastActivityAt = Date.now();
      let shouldAutoplay = true;

      if (activeIndex < 0) {
        activeIndex = 0;
      }

      const updateActiveState = () => {
        slides.forEach((slide, index) => {
          slide.classList.toggle(activeClass, index === activeIndex);
        });
      };

      const stopAutoplay = () => {
        if (autoplayId) {
          window.clearTimeout(autoplayId);
          autoplayId = null;
        }
      };

      const startAutoplay = () => {
        stopAutoplay();
        if (!shouldAutoplay || reducedMotionQuery.matches) {
          return;
        }
        autoplayId = window.setTimeout(() => {
          activeIndex = (activeIndex + 1) % slides.length;
          lastActivityAt = Date.now();
          updateActiveState();
          startAutoplay();
        }, holdMs);
      };

      const startWatchdog = () => {
        if (watchdogId) {
          return;
        }
        const stallThreshold = holdMs + transitionMs + 2200;
        watchdogId = window.setInterval(() => {
          if (!shouldAutoplay || reducedMotionQuery.matches) {
            return;
          }
          if (Date.now() - lastActivityAt <= stallThreshold) {
            return;
          }
          updateActiveState();
          startAutoplay();
        }, Math.max(2000, Math.round(holdMs / 2)));
      };

      const syncAutoplay = () => {
        shouldAutoplay = !document.hidden;
        if (shouldAutoplay) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      };

      updateActiveState();
      startWatchdog();
      syncAutoplay();
      document.addEventListener("visibilitychange", syncAutoplay);
      const onRm = () => syncAutoplay();
      if (typeof reducedMotionQuery.addEventListener === "function") {
        reducedMotionQuery.addEventListener("change", onRm);
      } else {
        reducedMotionQuery.addListener(onRm);
      }

      return () => {
        stopAutoplay();
        if (watchdogId) {
          window.clearInterval(watchdogId);
        }
        document.removeEventListener("visibilitychange", syncAutoplay);
        if (typeof reducedMotionQuery.removeEventListener === "function") {
          reducedMotionQuery.removeEventListener("change", onRm);
        } else {
          reducedMotionQuery.removeListener(onRm);
        }
      };
    };

    const initLoopCarousel = ({
      root,
      frameSelector,
      trackSelector,
      slideSelector,
      transitionMs,
      holdMs,
      activeClass = ""
    }: {
      root: Element | null;
      frameSelector: string;
      trackSelector: string;
      slideSelector: string;
      transitionMs: number;
      holdMs: number;
      activeClass?: string;
    }) => {
      if (!root) {
        return () => {};
      }
      const frame = root.querySelector(frameSelector) as HTMLElement | null;
      const track = root.querySelector(trackSelector) as HTMLElement | null;
      const originalSlides = Array.from(root.querySelectorAll(slideSelector)) as HTMLElement[];
      if (!frame || !track || !originalSlides.length) {
        return () => {};
      }

      let slides = originalSlides;
      let activeIndex = 0;
      let autoplayId: number | null = null;
      let settleId: number | null = null;
      let watchdogId: number | null = null;
      let resizeFrameId: number | null = null;
      let isTransitioning = false;
      let shouldAutoplay = true;
      let lastActivityAt = Date.now();

      const updateActiveState = () => {
        if (!activeClass) {
          return;
        }
        slides.forEach((slide, index) => {
          slide.classList.toggle(activeClass, index === activeIndex);
        });
      };

      if (originalSlides.length > 1) {
        const cloneSlides = (nodes: HTMLElement[]) =>
          nodes.map((slide) => {
            const clone = slide.cloneNode(true) as HTMLElement;
            clone.setAttribute("aria-hidden", "true");
            if (activeClass) {
              clone.classList.remove(activeClass);
            }
            return clone;
          });
        track.prepend(...cloneSlides(originalSlides));
        track.append(...cloneSlides(originalSlides));
        slides = Array.from(track.querySelectorAll(slideSelector)) as HTMLElement[];
        activeIndex = originalSlides.length;
        updateActiveState();
      }

      const alignSlide = (index: number, animate = true) => {
        if (!slides[index]) {
          return;
        }
        track.style.transition = animate
          ? `transform ${transitionMs}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
          : "none";
        const activeSlide = slides[index];
        const activeCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
        const offset = frame.clientWidth / 2 - activeCenter;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      };

      const queueRealign = () => {
        if (resizeFrameId) {
          window.cancelAnimationFrame(resizeFrameId);
        }
        resizeFrameId = window.requestAnimationFrame(() => {
          lastActivityAt = Date.now();
          alignSlide(activeIndex, false);
        });
      };

      const setActiveSlide = (nextIndex: number) => {
        activeIndex = (nextIndex + slides.length) % slides.length;
        updateActiveState();
        alignSlide(activeIndex, true);
      };

      const stopAutoplay = () => {
        if (autoplayId) {
          window.clearTimeout(autoplayId);
          autoplayId = null;
        }
        if (settleId) {
          window.clearTimeout(settleId);
          settleId = null;
        }
      };

      const startAutoplay = () => {
        stopAutoplay();
        if (!shouldAutoplay || reducedMotionQuery.matches || slides.length < 2 || isTransitioning) {
          return;
        }
        lastActivityAt = Date.now();
        autoplayId = window.setTimeout(() => {
          lastActivityAt = Date.now();
          isTransitioning = true;
          setActiveSlide(activeIndex + 1);
          settleId = window.setTimeout(() => {
            if (activeIndex >= originalSlides.length * 2) {
              activeIndex = originalSlides.length;
              updateActiveState();
              alignSlide(activeIndex, false);
            }
            isTransitioning = false;
            lastActivityAt = Date.now();
            startAutoplay();
          }, transitionMs + 80);
        }, holdMs);
      };

      const startWatchdog = () => {
        if (watchdogId || slides.length < 2) {
          return;
        }
        const stallThreshold = holdMs + transitionMs + 2200;
        watchdogId = window.setInterval(() => {
          if (!shouldAutoplay || reducedMotionQuery.matches) {
            return;
          }
          if (Date.now() - lastActivityAt <= stallThreshold) {
            return;
          }
          isTransitioning = false;
          alignSlide(activeIndex, false);
          startAutoplay();
        }, Math.max(2000, Math.round(holdMs / 2)));
      };

      const syncAutoplay = () => {
        shouldAutoplay = !document.hidden;
        if (shouldAutoplay) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      };

      root.querySelectorAll("img").forEach((image) => {
        if (!(image as HTMLImageElement).complete) {
          image.addEventListener("load", queueRealign, { once: true });
        }
      });

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => queueRealign());
        ro.observe(frame);
      } else {
        globalThis.addEventListener("resize", queueRealign);
      }

      const onTransCancel = () => {
        if (!shouldAutoplay || reducedMotionQuery.matches) {
          return;
        }
        isTransitioning = false;
        lastActivityAt = Date.now();
        startAutoplay();
      };
      track.addEventListener("transitioncancel", onTransCancel);
      document.addEventListener("visibilitychange", syncAutoplay);
      const onRm = () => syncAutoplay();
      if (typeof reducedMotionQuery.addEventListener === "function") {
        reducedMotionQuery.addEventListener("change", onRm);
      } else {
        reducedMotionQuery.addListener(onRm);
      }

      alignSlide(activeIndex, false);
      startWatchdog();
      syncAutoplay();

      return () => {
        stopAutoplay();
        if (watchdogId) {
          window.clearInterval(watchdogId);
        }
        if (ro) {
          ro.disconnect();
        } else {
          globalThis.removeEventListener("resize", queueRealign);
        }
        track.removeEventListener("transitioncancel", onTransCancel);
        document.removeEventListener("visibilitychange", syncAutoplay);
        if (typeof reducedMotionQuery.removeEventListener === "function") {
          reducedMotionQuery.removeEventListener("change", onRm);
        } else {
          reducedMotionQuery.removeListener(onRm);
        }
      };
    };

    const heroCarouselRoot = document.querySelector("[data-hero-carousel]");
    const cleanupHero = initHeroRuntimeHeight(heroCarouselRoot);
    const cleanupFade = initFadeCarousel({
      root: heroCarouselRoot,
      slideSelector: ".hero-slide",
      transitionMs: 900,
      holdMs: 4200
    });
    const cleanupLoop = initLoopCarousel({
      root: document.querySelector("[data-manifesto-carousel]"),
      frameSelector: ".manifesto-carousel-frame",
      trackSelector: ".manifesto-carousel-track",
      slideSelector: ".manifesto-slide",
      transitionMs: 760,
      holdMs: 4300,
      activeClass: "is-active"
    });

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );
      document.querySelectorAll("[data-reveal]").forEach((node) => io?.observe(node));
    } else {
      document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
    }

    const navScrollMap = [
      { selector: '.nav-links a[href*="#manifesto"]', target: "#manifesto" },
      { selector: '.nav-links a[href*="#schedule"]', target: "#schedule" },
      { selector: '.nav-links a[href*="#routes"]', target: "#routes" },
      { selector: '.nav-links a[href*="#pacers"]', target: "#pacers" },
      { selector: '.nav-links a[href*="#gallery"]', target: "#gallery" },
      { selector: '.nav-links a[href*="#join"]', target: "#join" },
      { selector: '.nav-links a[href*="#shop"]', target: "#shop" }
    ]
      .map((item) => ({
        link: document.querySelector(item.selector),
        section: document.querySelector(item.target)
      }))
      .filter((item) => item.link && item.section) as {
      link: Element;
      section: HTMLElement;
    }[];

    let navFrame: number | null = null;
    const setCurrentNav = () => {
      const y = window.scrollY + 180;
      const firstSection = navScrollMap[0]?.section;
      const lastSection = navScrollMap[navScrollMap.length - 1]?.section;
      if (!firstSection || !lastSection) {
        return;
      }
      const firstStart = firstSection.offsetTop;
      const lastEnd = lastSection.offsetTop + lastSection.offsetHeight;
      let current: (typeof navScrollMap)[0] | null = null;
      if (y >= firstStart && y < lastEnd) {
        current = navScrollMap[0];
        navScrollMap.forEach((item) => {
          if (item.section.offsetTop <= y) {
            current = item;
          }
        });
      }
      navScrollMap.forEach((item) => {
        const isCurrent = item === current;
        item.link.classList.toggle("is-current", isCurrent);
        if (isCurrent) {
          item.link.setAttribute("aria-current", "location");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });
    };

    const queueCurrentNav = () => {
      if (navFrame) {
        return;
      }
      navFrame = window.requestAnimationFrame(() => {
        navFrame = null;
        setCurrentNav();
      });
    };

    if (navScrollMap.length) {
      window.addEventListener("scroll", queueCurrentNav, { passive: true });
      window.addEventListener("resize", queueCurrentNav);
      window.addEventListener("load", queueCurrentNav);
      queueCurrentNav();
    }

    return () => {
      cleanupHero?.();
      cleanupFade?.();
      cleanupLoop?.();
      io?.disconnect();
      window.removeEventListener("scroll", queueCurrentNav);
      window.removeEventListener("resize", queueCurrentNav);
      window.removeEventListener("load", queueCurrentNav);
    };
  }, []);

  return null;
}
