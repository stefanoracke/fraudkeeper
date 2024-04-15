"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Image from "next/image";

export default function NavbarFK() {
  return (
    <Navbar shouldHideOnScroll classNames={{ wrapper: "max-w-[1280px] container", content:"flex gap-4" }}>
      <NavbarBrand>
        <Image className="h-auto w-[60%]" src="https://fraudkeeper.com/themes/vox/assets/images/fk.png"
          width="150"
          height="40" alt="logo"></Image>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <a color="foreground" target="_blank" href="https://www.fraudkeeper.com/">
            FraudKeeper
          </a>
        </NavbarItem>
        <NavbarItem >
          <a href="https://portfoliosr.vercel.app/" target="_blank" aria-current="page">
            Portfolio
          </a>
        </NavbarItem>

      </NavbarContent>

    </Navbar>
  );
}
