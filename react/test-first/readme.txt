$ npm create vite@latest my-react-app --template react
Need to install the following packages:
create-vite@6.3.1
Ok to proceed? (y)
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in D:\work\mins01\html\web_work\doc\react\test-first\my-react-app...
│
└  Done. Now run:

  cd my-react-app
  npm install    
  npm run dev    

------------
라우팅 모듈설치

npm install react-router-dom
--------------------------=-
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  )
}

-------------=---------------

npm run dev -> 개발용, 실시간으로 소스반영되여 보여짐
npm run build -> 배포용 /dist 속에 최종 빌드된 소스가 생성됨. js 파일 하ㄹ나로 만들어짐.

------------=--------------
$ npm run build

> my-react-app@0.0.0 build
> vite build

vite v6.2.6 building for production...
✓ 50 modules transformed.
dist/index.html                   0.89 kB │ gzip:  0.52 kB
dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.05 kB
dist/assets/index-tn0RQdqM.css    0.00 kB │ gzip:  0.02 kB
dist/assets/index-D1t-70v6.js   223.50 kB │ gzip: 71.95 kB
✓ built in 1.35s

--------------=-----------
$ npm run build

> my-react-app@0.0.0 build
> vite build

vite v6.2.6 building for production...
✓ 50 modules transformed.
dist/index.html                   0.89 kB │ gzip:  0.52 kB
dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.05 kB
dist/assets/index-tn0RQdqM.css    0.00 kB │ gzip:  0.02 kB
dist/assets/index-D1t-70v6.js   223.50 kB │ gzip: 71.95 kB
✓ built in 1.35s