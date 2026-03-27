import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthUser {
  email: string
  nombre: string
  tipo: "nuevo" | "familia"
}

interface AuthStore {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  "carlos@demo.com": {
    password: "demo1234",
    user: { email: "carlos@demo.com", nombre: "Carlos", tipo: "nuevo" },
  },
  "familia@demo.com": {
    password: "demo1234",
    user: { email: "familia@demo.com", nombre: "Familia García", tipo: "familia" },
  },
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        const account = DEMO_ACCOUNTS[email.toLowerCase().trim()]
        if (account && account.password === password) {
          set({ user: account.user })
          return true
        }
        return false
      },

      logout: () => set({ user: null }),
    }),
    { name: "tibidabo-auth" }
  )
)
