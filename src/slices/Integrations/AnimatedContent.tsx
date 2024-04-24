"use client";
import clsx from "clsx";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import StylizedLogoMark from "./StylizedLogoMark";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaFigma,
  FaGithub,
  FaFly,
  FaNpm,
} from "react-icons/fa6";

function AnimatedContent({ slice }: { slice: Content.IntegrationsSlice }) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  const icons = {
    cloudflare: <FaCloudflare />,
    digitalocean: <FaDigitalOcean />,
    figma: <FaFigma />,
    github: <FaGithub />,
    fly: <FaFly />,
    npm: <FaNpm />,
  };

  useGSAP(
    () => {
      //   if (prefersReducedMotion) {
      //     gsap.set(".pulsing-logo, .signal-line, .pulsing-icon", { opacity: 1 });
      //     return;
      //   }

      const tl = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      });

      tl.to(
        ".signal-line",
        {
          keyframes: [
            { backgroundPosition: "0% 0%" },
            {
              backgroundPosition: "100% 100%",
              stagger: { from: "center", each: 0.3 },
              duration: 1,
            },
          ],
        },
        "-=1.4",
      );

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              backdropFilter: "brightness(2)",
              opacity: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
            {
              backdropFilter: "brightness(1)",
              opacity: 0.4,
              duration: 2,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=2",
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center md:flex-row"
    >
      {slice.items.map((item, index) => (
        <React.Fragment key={index}>
          {index === Math.floor(slice.items.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border-blue-50/30 bg-blue-50/25 p-3 text-3xl opacity-40 backdrop-brightness-100 md:text-4xl lg:text-5xl">
            {item.icon && icons[item.icon]}
          </div>
          {index !== slice.items.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(slice.items.length / 2)
                  ? "rotate-180"
                  : "rotate-0",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default AnimatedContent;
