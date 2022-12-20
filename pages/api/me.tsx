import { findUserByAddress } from 'core/services/user.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      const address = req.session.siwe?.address
      if (address) {
        const user = await findUserByAddress(address)
        res.json({ address: req.session.siwe?.address, user })
        return
      }
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
      })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
