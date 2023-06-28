import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    transitionend: BeforeInstallPromptEvent;
  }
}

const InstallPWA = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (promptInstall == null) {
      return;
    }
    promptInstall.prompt().catch((e) => {
      console.log(e);
    });
  };

  if (!supportsPWA) {
    return null;
  }
  return <div onClick={onClick}>{children}</div>;
};

export default InstallPWA;
