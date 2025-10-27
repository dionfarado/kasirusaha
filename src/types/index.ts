export type User = {
  id: string
  name: string
  email: string
}

export type Company = {
  id: string
  name: string
  address?: string
}

export type DashboardData = {
  kpis: {
    revenue: number
    orders: number
    customers: number
  }
  chart: Array<{ date: string; revenue: number }>
  recentTransactions: Array<{
    id: string
    time: string
    amount: number
    status: string
  }>
}