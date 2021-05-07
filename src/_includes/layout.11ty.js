function render(data) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${data.title}</title>
        <style>
          :root {
            --fonts-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
            --colors-text: #000;
            --colors-background: #fff;
            --color-transition: 400ms;
          }

            :root[data-theme="dark"] {
              --colors-text: #fff;
              --colors-background: #000;
            }

          body {
            font-family: var(--fonts-body);
            color: var(--colors-text);
            background-color: var(--colors-background);
            transition:
              color var(--color-transition),
              background-color var(--color-transition);
          }
        </style>
        <script>
          function setTheme(theme) {
            localStorage.theme = theme;
            document.documentElement.dataset.theme = theme;
            if (document.readyState === 'complete') {
              setThemeToggleState(theme);
            }
          }

          function setThemeToggleState(theme) {
            document.querySelector('#darkModeToggle').checked = theme === 'dark';
          }

          setTheme(localStorage.theme);

          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Change to OS theme setting overrides local setting
            setTheme(localStorage.theme = e.matches ? 'dark' : 'default');
          });
          document.addEventListener('DOMContentLoaded', (event) => {
            // Can't change the checked state until the checkbox is loaded
            setThemeToggleState(localStorage.theme);
          })
        </script>
      </head>
      <body>
        <label>
          <input id="darkModeToggle" type="checkbox" onchange="setTheme(event.target.checked ? 'dark' : 'default')">
          Dark Mode
        </label>
        ${data.content}
      </body>
    </html>
  `;
}

module.exports = {
  render,
};
