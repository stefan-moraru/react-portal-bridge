# react-portal-bridge

🪄 Inject components across microfrontends using React portals

`react-portal-bridge` is a lightweight library that allows you to easily inject React components across different microfrontends. It uses React portals to provide a flexible way of rendering components in predefined zones.

### Features
- 🤏 Lightweight - less than 2kB
- 🙆 Easy to integrate
- 🧘 Flexible

### Installation

```sh
pnpm add react-portal-bridge
```

```sh
npm install react-portal-bridge
```

```sh
yarn add react-portal-bridge
```

_Note: This library depends on `react` and `react-dom`_

### Getting started

You need to add `ReactPortalBridgeHost` to your app first. The host is responsible for portalling components around. It does not render anything on its own.

```tsx
import { ReactPortalBridgeHost } from 'react-portal-bridge'

const App = () => {
  return (
    <div>
      <ReactPortalBridgeHost />
    </div>
  );
};
```

Then, you need to render a zone. A zone is a place where components will be injected.

For example, you could add a zone to navbar and enable other microfrontends to render items there:

```tsx
import { ReactPortalBridgeZone } from 'react-portal-bridge';

const Navbar = () => {
  return (
    <div>
      <ReactPortalBridgeZone id="RPBZ_NAVBAR" />
    </div>
  );
}
```

Now you will be able to inject components in the zone by using `injectComponent`:

```tsx
import { injectComponent } from 'react-portal-bridge';

useEffect(() => {
  injectComponent({
    id: 'helloworld',
    component: <HelloWorld />,
    zone: 'RPBZ_NAVBAR',
  });
}, []);
```

### Documentation

##### ReactPortalBridgeHost

The component that manages the portals. You can place this in the root of your application.

```tsx
<ReactPortalBridgeHost />
```

##### ReactPortalBridgeZone

Define a zone where components can be injected.

```tsx
<ReactPortalBridgeZone id="UNIQUE_ZONE_ID" />
```

- `id: string`: A unique identifier for the zone. The library does not check for uniqueness and it will pick the first matching DOM element.

##### injectComponent

Injects a component in the specified zone.

```ts
injectComponent({
  id: 'unique-component-id',
  component: <YourComponent />,
  zone: 'RPBZ_ZONE_ID'
});
```

- `id: string`: A unique identifier for the component
- `component: ReactNode`: The React component to inject
- `zone: string`: The id of the zone where the component should be injected

### Contributing

Contributions are welcomed!

### License

`react-portal-bridge` is released under the MIT license.
