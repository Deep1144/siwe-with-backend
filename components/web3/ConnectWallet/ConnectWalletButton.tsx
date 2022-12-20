import { Button, Loading } from '@nextui-org/react'
import { useUserContext } from 'core/state/user.state'
import { useAccount, useConnect } from 'wagmi'

export const ConnectWalletButton = () => {
  const [{ data, error }] = useConnect()
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const { user, handleSignOut, handleSignIn, loadingUser } = useUserContext()

  if (loadingUser) {
    return <Loading color={'warning'} />
  }
  if (accountData) {
    return (
      <div>
        {accountData.ens?.avatar && (
          <img src={accountData.ens?.avatar} alt="ENS Avatar" />
        )}
        <div>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address}
        </div>
        <div className="mt-2">Connected to {accountData.connector?.name}</div>
        <Button className="mt-2" color={'error'} onClick={handleSignOut}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div>
      {data.connectors.map((connector) => (
        <Button
          className="mt-2"
          key={connector.id}
          onClick={() => handleSignIn(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </Button>
      ))}
      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </div>
  )
}
