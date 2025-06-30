import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { Loader2, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4  sm:pb-28 pb-20 sm:pt-4">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top bar layout */}
        <div className="w-full flex items-center justify-between mb-6 py-8 lg:gap-4">
          {/* Logo */}
          <div className="flex items-center lg:w-1/3">
            <HeaderLogo />
          </div>

          {/* Navigation center on desktop */}
          <div className="hidden lg:flex justify-center lg:w-1/2">
            <Navigation />
          </div>

          {/* Right section - user button or menu toggle */}
          <div className="flex items-center justify-end lg:w-1/2">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </button>

            {/* User Button (Desktop) */}
            <div className="hidden lg:flex">
              <SignedIn>
                <ClerkLoaded>
                  <UserButton afterSwitchSessionUrl="/login" />
                </ClerkLoaded>
                <ClerkLoading>
                  <Loader2 className="size-8 animate-spin text-slate-400" />
                </ClerkLoading>
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Navigation (Desktop center only) */}
        {/* Already shown above center-aligned */}

        {/* Mobile Slide Drawer */}
        {isMobileNavOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileNavOpen(false)}
            ></div>

            <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg flex flex-col p-6 transition-transform duration-300">
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileNavOpen(false)}>
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="flex-grow overflow-auto">
                <Navigation onLinkClick={() => setIsMobileNavOpen(false)} />{" "}
                {/* 👈 close drawer on click */}
              </div>

              <div className="mt-6">
                <SignedIn>
                  <ClerkLoaded>
                    <UserButton afterSwitchSessionUrl="/login" />
                  </ClerkLoaded>
                  <ClerkLoading>
                    <Loader2 className="size-8 animate-spin text-slate-400" />
                  </ClerkLoading>
                </SignedIn>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
