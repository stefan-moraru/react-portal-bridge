export type ReactPortalBridgeZoneProps = {
  id: string;
  hidden?: boolean;
};

const ReactPortalBridgeZone = ({ id, hidden }: ReactPortalBridgeZoneProps) => {
  return <div style={{ display: hidden ? 'none' : 'block' }} id={id}></div>;
};

export default ReactPortalBridgeZone;
