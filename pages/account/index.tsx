import { NextPage } from 'next'
import { BaseLayout } from '../../components/ui/Layout/BaseLayout'
import { ComponentWithLayout } from '../_app'
import { useEthers, useLookupAddress } from '@usedapp/core'
import { useEffect } from 'react'
import { ConnectWalletButton } from 'components/web3/ConnectWallet/ConnectWalletButton'
import { toast } from 'react-toastify'

export const Account: NextPage = () => {
  const { account } = useEthers()
  const ens = useLookupAddress()
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  useEffect(() => {
    console.log('ens', ens)
    console.log('account', account)
  }, [account, ens])

  return (
    <div className="flex w-full items-center justify-center">
      <ConnectWalletButton />
    </div>
  )
}

export default Account
;(Account as ComponentWithLayout).Layout = BaseLayout
