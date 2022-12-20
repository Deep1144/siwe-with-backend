import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { NextComponentType } from 'next'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'
import { Config, DAppProvider, Rinkeby } from '@usedapp/core'
import { Providers } from 'core/Providers'
import { UserState } from 'core/state/user.state'

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]:
      'https://rinkeby.infura.io/v3/0725f2d877224883a64c79ca0dcdd1a8',
  },
}

export type ComponentWithLayout = NextComponentType & { Layout: any }

const Noop = ({ children }: { children: NextComponentType }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as ComponentWithLayout).Layout ?? Noop

  return (
    <NextUIProvider>
      <DAppProvider  config={{}}>
        <Providers>
          <UserState>
            <Layout>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
                pauseOnHover
              />

              <Component {...pageProps} />
            </Layout>
          </UserState>
        </Providers>
      </DAppProvider>
    </NextUIProvider>
  )
}

export default MyApp
