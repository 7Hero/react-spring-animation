# React Spring Hooks.

## Examples

### `useTween`

React animation hooks that hooks between two values choosing your own duration.

 ```js
 import { useTween } from 'react-spring-animation';

const Tween = () => {
  const t = useTween(0, 1, 3000);
  
  return (
    <div>
      Tween: {t}
    </div>
  );
};
```
```js
useTween(start, end, duration);
```
