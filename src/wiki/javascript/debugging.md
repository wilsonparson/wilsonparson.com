---
title: Debugging
eleventyNavigation:
  key: Debugging
---

## Debug Client-side Code

[Debug client-side JavaScript in VS Code](https://www.youtube.com/watch?v=AX7uybwukkk)

## Debug Node.js Code

[Debug server-side JavaScript in VS Code](https://www.youtube.com/watch?v=yFtU6_UaOtA)

The key is to add configurations to `launch.json`. Below are some useful configuration types. These configuration types, and others, will appear when you press the "Add Configuration" button in the bottom right corner of `launch.json`.

- **Launch**: Executes the program at the entrypoint you specify.
- **Attach by Process ID**: Presents a dropdown of currently running Node processes from which you can select.
- **Attach**: Lets you attach to a specific port.

With Nodemon:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Whatever you want",
  "port": "any port number (default for --inspect flag is 9229)",
  "restart": true
}
```

> Note: `"restart": true` will restart the debug session any time the process at the specified port is restarted, which, when using Nodemon, happens every time you change a file.
