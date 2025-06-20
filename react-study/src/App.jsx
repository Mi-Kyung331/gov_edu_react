import './App.css'
import HelloReact from './study/components/HelloReact/HelloReact'
import HelloJsx from './study/components/HelloJsx/HelloJsx'
import HelloProps from './study/components/HelloProps/HelloProps'
import CountState from './study/components/State/CountState/CountState'
import Calculator from './study/components/State/Calculator/Calculator'
import InputState1 from './study/components/State/InputState1/InputState1'
import InputState2 from './study/components/State/InputState2/InputState2'
import InputSate3 from './study/components/State/InputState3/InputState3'
import InputState4 from './study/components/State/InputState4/InputState4'
import DomRef from './study/components/Ref/DomRef/DomRef'
import Effect1 from './study/components/Effect/Effect1/Effect1'
import Effect2 from './study/components/Effect/Effect2/Effect2'
import Emotion from './study/components/Emotion/Emotion'
import Emotion2 from './study/components/Emotion/Emotion2'
import Router1 from './RouterStudy/Router1/Router1'
import Index from './TodoList/pages/Index'
import { BrowserRouter } from 'react-router-dom'
import Router2 from './RouterStudy/Router2/Router2'
import Router3 from './RouterStudy/Router3/Router3'
import Router4 from './RouterStudy/Router4/Router4'
import MainRouter from './RouterStudy/Auth/Routers/MainRouter'
import MainRouterReactQuery from './RouterStudy/Auth/Routers/MainRouterReactQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      retry: 0,
    }
   }
  });

  return <BrowserRouter>
    {/* 20250609 */}
    {/* <HelloReact /> */}
    {/* <HelloJsx /> */}
    {/* <HelloProps /> */}

    {/* 20250610 */}
    {/* <CountState /> */}
    {/* <Calculator /> */}
    {/* <InputState1 /> */}
    {/* <InputState2 /> */}
    {/* <InputSate3 /> */}

    {/* 20250611 */}
    {/* <InputState4 /> */}
    {/* <DomRef /> */}
    {/* <Effect1 /> */}
    {/* <Effect2 /> */}
    {/* <Emotion /> */}
    {/* <Emotion2 /> */}

    {/* 20250612 */}
    {/* <Index /> */}

    {/* 20250613 */}
    {/* <Router1 /> */}
    {/* <Router2 /> */}
    {/* <Router3 /> */}
    {/* <Router4 /> */}

    {/* 20250616 ~ */}
    {/* <MainRouter /> */}

    <QueryClientProvider client={queryClient} >
      <MainRouterReactQuery />
    </QueryClientProvider>

  </BrowserRouter>
}

export default App;
