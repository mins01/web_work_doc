# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## HOW TO TEST
```
$ npm run dev

> my-react-app@0.0.0 dev
> vite

오전 8:52:57 [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v6.4.1  ready in 625 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

```
Open http://localhost:5173/ in your browser.

* npm run preview => document root is ./
```

## HOW TO BUILD
```
$ npm run build

> my-react-app@0.0.0 build
> vite build

vite v6.4.1 building for production...
✓ 58 modules transformed.
dist/index.html                   0.89 kB │ gzip:  0.52 kB
dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.05 kB
dist/assets/index-tn0RQdqM.css    0.00 kB │ gzip:  0.02 kB
dist/assets/index-CVqGfGBR.js   235.74 kB │ gzip: 75.09 kB
✓ built in 1.37s
```

```
$ npm run preview

> my-react-app@0.0.0 preview
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```

```
Open http://localhost:4173/ in your browser.

* npm run preview => document root is dist/
```