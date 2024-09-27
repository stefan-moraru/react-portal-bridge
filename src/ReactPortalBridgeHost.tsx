import { useState, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import { ReactPortalBridgeInjectEvent } from "./injectComponent";

export type ReactPortalBridgeComponent = React.ReactNode;

const ReactPortalBridgeHost = () => {
  const [zones, setZones] = useState<{
    [zone: string]: {
      [componentId: string]: ReactPortalBridgeInjectEvent;
    };
  }>({});

  const onInjectEvent = (event: CustomEvent<ReactPortalBridgeInjectEvent>) => {
    const { detail } = event;

    if (!detail?.id) throw new Error("react-portal-bridge:error:invalid-id");
    if (!detail?.component)
      throw new Error("react-portal-bridge:error:invalid-component");

    setZones((z) => ({
      ...z,
      [detail.zone]: {
        ...(z[detail.zone] ?? {}),
        [detail.id]: detail,
      },
    }));
  };

  useEffect(() => {
    window.addEventListener(
      "react-portal-bridge:inject",
      onInjectEvent as EventListener,
    );

    return () =>
      window.removeEventListener(
        "react-portal-bridge:inject",
        onInjectEvent as EventListener,
      );
  }, []);

  return (
    <>
      {Object.keys(zones).map((zoneKey) => {
        const zone = zones[zoneKey];

        const zoneElement = document.getElementById(zoneKey);

        if (zoneElement) {
          return createPortal(
            <>
              {Object.keys(zone).map((componentKey) => (
                <Fragment key={componentKey}>
                  {zone[componentKey].component}
                </Fragment>
              ))}
            </>,
            zoneElement,
          );
        }

        return null;
      })}
    </>
  );
};

export default ReactPortalBridgeHost;
