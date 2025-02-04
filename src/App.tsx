import MainLayout from "./components/layout/mainLayout"
import ProtectedRoute from "./components/layout/protectedRoute"

function App() {

  return <ProtectedRoute>
    <MainLayout />
  </ProtectedRoute>
}

export default App
