// 'use client'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuthStore } from '../stores/useAuthStore'

// export default function useProtectedRoute() {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
//   const router = useRouter()

//   useEffect(() => {
//     if (!isAuthenticated) router.replace('')
//   }, [isAuthenticated, router])
// }
