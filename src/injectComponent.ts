import { ReactPortalBridgeComponent } from './ReactPortalBridgeHost';

export type ReactPortalBridgeInjectEvent = {
  id: string;
  component: ReactPortalBridgeComponent;
  zone: string;
};

export type InjectProps = {
  id: string;
  component: React.ReactNode;
  zone: string;
};

const injectComponent = ({ id, component, zone }: InjectProps) => {
  window.dispatchEvent(
    new CustomEvent('react-portal-bridge:inject', {
      detail: {
        id,
        component,
        zone,
      },
    }),
  );
};

export default injectComponent;
