import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const userSessionStore = defineStore({
  id: 'userSession',
  state: () => ({
    user: null as User | null,
    session: null as Session | null
  }),
  actions: {
    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      this.user = data.user
      this.session = data.session
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }
      this.user = null
      this.session = null
    },
    async signUp(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        throw error
      }
      return data
    },
    async restoreSession() {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }

      if (data.session) {
        this.session = data.session
        this.user = data.session.user
      }
    }
  }
})
