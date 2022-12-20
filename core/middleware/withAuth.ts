import { findUserByAddress } from "core/services/user.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const withAuth = (handler: NextApiHandler<any>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const address = req.session.siwe?.address

        const sendError = () => {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: ReasonPhrases.UNAUTHORIZED,
            });
        }
        if (!address) {
            sendError();
            return;
        }
        const user = await findUserByAddress(address);
        if (!user) {
            sendError();
            return;
        }
        return handler(req, res);
    };
};

export default withAuth;