import { create } from 'zustand'
import { Company } from '@/types' 

type CompanyState = {
  companies: Company[]
  selectedCompany: Company | null
  setCompanies: (c: Company[]) => void
  selectCompany: (c: Company) => void
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  selectedCompany: null,
  setCompanies: (c) => set({ companies: c }),
  selectCompany: (c) => set({ selectedCompany: c }),
}))