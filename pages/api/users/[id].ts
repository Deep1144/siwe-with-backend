import withAuth from 'core/middleware/withAuth'
import { findUserById, updateUser } from 'core/services/user.service'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { isValidObjectId } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req
    const queryId = query.id;

    if (!queryId || !isValidObjectId(queryId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Valid id is required"
        })
        return;
    }
    switch (method) {
        case 'GET':
            return await handleGetUser();
        case 'PUT':
            return await handlePatchUser();
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    };


    async function handleGetUser() {
        const result = await findUserById(queryId as string);
        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User not found with requested id"
            })
        }
        res.json({ user: result });
    }

    async function handlePatchUser() {
        if (req.session.user?._id !== queryId) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: ReasonPhrases.FORBIDDEN
            });
            return;
        }
        const user = await updateUser(queryId, req.body);
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User not found with requested id"
            })
        }
        res.json({
            user
        })
    }
}

export default withIronSessionApiRoute(withAuth(handler), sessionOptions)
