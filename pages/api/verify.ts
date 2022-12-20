
import { handleLoginOrSignup } from 'core/services/user.service'
import { withIronSessionApiRoute } from 'iron-session/next'
import dbConnect from 'lib/dbConnect'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    switch (method) {
        case 'POST':
            try {
                await dbConnect();
                const { message, signature } = req.body
                const siweMessage = new SiweMessage(message)
                const fields = await siweMessage.validate(signature)

                if (fields.nonce !== req.session.nonce) {
                    return res.status(422).json({ message: 'Invalid nonce.' })
                }

                req.session.siwe = fields;
                const user = await handleLoginOrSignup(fields.address);
                req.session.user = user;
                await req.session.save()
                res.json({ ok: true })
            } catch (_error) {
                console.log('error -> verify', _error)
                res.json({ ok: false, error: _error })
            }
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)