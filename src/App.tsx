import { Route, Routes } from 'react-router-dom'
import { Btn } from './pages/BtnTest'
import { DropDownTest } from './pages/DropDownTest'

function App() {

  return (
      <Routes>
        <Route path='/btn' element={<Btn></Btn>}></Route>
        <Route path='/dropdown' element={<DropDownTest></DropDownTest>}></Route>
      </Routes>
  )
}

export default App