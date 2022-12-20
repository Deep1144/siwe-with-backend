import { IUser } from 'models/User'
import React, { createContext, useContext, useState } from 'react'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useConnect } from 'wagmi'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export interface IUserState {
  user: IUser | undefined
  loadingUser: boolean
  setUser: React.Dispatch<React.SetStateAction<undefined>>
  handleSignOut: () => void
  handleSignIn: (connector: Connector) => Promise<void>
}

const UserContext = createContext<IUserState>({
  user: undefined,
  setUser: () => {},
  loadingUser: false,
  handleSignOut: () => {},
  handleSignIn: async () => {},
})

export function UserState({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const [user, setUser] = useState(undefined)
  const [, connect] = useConnect()
  const [loadingUser, setLoadingUser] = useState(false)
  const [, disconnect] = useAccount({
    fetchEns: true,
  })

  const handleSignOut = async () => {
    disconnect()
    await axios.post('/api/logout')
    setUser(undefined)
    router.replace('/')
  }

  const handleSignIn = async (connector: Connector) => {
    try {
      const res = await connect(connector) // connect from useConnect
      if (!res.data) throw res.error ?? new Error('Something went wrong')

      setLoadingUser(true)
      const nonceRes = await axios('/api/nonce')
      const message = new SiweMessage({
        domain: window.location.host,
        address: res.data.account,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: res.data.chain?.id,
        nonce: nonceRes.data,
      })

      const signer = await connector.getSigner()
      const signature = await signer.signMessage(message.prepareMessage())
      // console.log('message', message, { signature })
      await axios.post('/api/verify', {
        message,
        signature,
      })
      const me = await axios('/api/me')
      setUser(me.data.user)
      // It worked! User is signed in with Ethereum
    } catch (error) {
      // Do something with the error
      toast.error('Something went wrong!')
      handleSignOut()
      console.log('error', error)
    } finally {
      setLoadingUser(false)
    }
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, handleSignOut, handleSignIn, loadingUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
