import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/resolvers/UserResolver";

async function main() {

    // criando um schema com as queries vindas dos resolvers
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    // criando um server em graphql com o ApolloServer
    const server = new ApolloServer({
        schema,
    });

    const { url } = await server.listen();

    console.log(`Server running on ${url}`);
}

main();