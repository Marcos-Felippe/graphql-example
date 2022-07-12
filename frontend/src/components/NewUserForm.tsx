import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USER } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
    mutation ($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`;

export function NewUserForm() {

    const [name, setName] = useState('');
    // const [createUser, { data, loding, error }] = useMutation(CREATE_USER);
    const [createUser] = useMutation(CREATE_USER);

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault();

        if(!name) {
            return;
        }

        await createUser({
            variables: {
                name,
            },

            // Fazendo uma nova request na api para pefar os novos dados
            //refetchQueries: [GET_USER],

            // Pegando os dados do usuario criado e adiconando na lista de usuarios em cache sem a necessidade de fazer outra request no server
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USER });
                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        users: [
                            ...users,
                            createUser,
                        ]
                    }
                })

            }

            
        });

        setName('');
    }

    return (
        <form onSubmit={ handleCreateUser }>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    );
}