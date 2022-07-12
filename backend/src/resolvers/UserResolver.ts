import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'crypto';
import { User } from "../models/User";

// Os Resolvers do Graphql podem ser associados aos controllers do REST

// Query: buscar dados.
// Mutation: criar, alterar ou deletar dados.

@Resolver()
export class UserResolver {

    private data: User[] =[];

    @Query(() => [User])
    async users() {
        return this.data;
    }

    @Mutation(() => User) 
    async createUser (
        @Arg('name') name: string
    ) {
        const user = { id: crypto.randomUUID(), name };

        this.data.push(user);

        return user;
    }
}