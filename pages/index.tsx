import { NextPage } from 'next'
import { BaseLayout } from '../components/ui/Layout/BaseLayout'
import { ComponentWithLayout } from './_app'
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'
import { ConnectWalletButton } from 'components/web3/ConnectWallet/ConnectWalletButton'
import { toast } from 'react-toastify'

export const Account: NextPage = () => {
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])
  return (
    <div className="flex w-full items-center justify-center">
      <ConnectWalletButton />
    </div>
  )
}

export default Account
;(Account as ComponentWithLayout).Layout = BaseLayout
