import { AppRoutes } from './routes'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider >
    </div>
  )
}

export default App