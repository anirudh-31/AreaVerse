import bcrypt from "bcryptjs";
import {prisma} from '../prisma/client.prisma.js';
import { generateAccessToken } from "../utils/jwt.js";

async function registerNewUser(data) {
    const { username, first_name, last_name, email, password, profession, city, state, area, neighborhoodId } = data;

    // Check if a record with the same username or email exists
    const userExists = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }]
        }
    });
    // If a record already exists, then throw an error stating the same.
    if (userExists) {
        throw new Error("User already exists");
    }
    // If the user does not exist, then register the user.

    // Retrive the neighborhood id for the city + state + area that the user provided.
    let resolvedNeighborhoodId = neighborhoodId;
    if (!resolvedNeighborhoodId && area && city && state) {
        // retrieve the details if it exists and use the neighborhood.
        let neighborhood = await prisma.neighborhood.findFirst({
            where: { name: area, city, state }
        });

        // if it does not exists already, then create a record for it and use the neighborhood id.
        if (!neighborhood) {
            neighborhood = await prisma.neighborhood.create({
                data: {
                    name: area,
                    city,
                    state,
                    sentimentScore: 0
                }
            });
        }
        resolvedNeighborhoodId = neighborhood.id;
    }

    if (!resolvedNeighborhoodId) {
        throw new Error("Neighborhood information is required (id or name+city+state).");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const user = await prisma.user.create({
        data: {
            username,
            first_name,
            last_name,
            email,
            profession,
            neighborhoodId: resolvedNeighborhoodId,
            role: "USER",
            authProvider: "LOCAL",
            passwordHash: hashedPassword
        },
        select: { id: true, username: true, email: true, role: true }
    });

    const token = generateAccessToken({ id: user.id, username: user.username });

    return { token, user };
}


export {
    registerNewUser
}