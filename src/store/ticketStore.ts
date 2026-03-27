import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TicketItem {
  ticketId: string
  label: string
  price: number
  quantity: number
}

interface TicketStore {
  items: TicketItem[]
  date: string
  fastPass: boolean
  tab: "full" | "panoramic" | "funicular" | "tibitour"

  setTab: (tab: TicketStore["tab"]) => void
  setDate: (date: string) => void
  setFastPass: (fastPass: boolean) => void
  setQuantity: (ticketId: string, label: string, price: number, qty: number) => void
  getTotal: () => number
  getItemCount: () => number
  reset: () => void
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => ({
      items: [],
      date: "",
      fastPass: false,
      tab: "full",

      setTab: (tab) => set({ tab, items: [] }),
      setDate: (date) => set({ date }),
      setFastPass: (fastPass) => set({ fastPass }),

      setQuantity: (ticketId, label, price, qty) =>
        set((state) => {
          const existing = state.items.filter((i) => i.ticketId !== ticketId)
          if (qty > 0) {
            return { items: [...existing, { ticketId, label, price, quantity: qty }] }
          }
          return { items: existing }
        }),

      getTotal: () => {
        const state = get()
        const subtotal = state.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        )
        const fastPassTotal = state.fastPass
          ? state.items.reduce((sum, i) => sum + i.quantity, 0) * 8
          : 0
        return subtotal + fastPassTotal
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      reset: () => set({ items: [], date: "", fastPass: false, tab: "full" }),
    }),
    { name: "tibidabo-tickets" }
  )
)
