import { parse } from 'pg-connection-string'

export default ({ env }) => {
    const { host, port, database, user, password } = parse(env('DATABASE_URL'));

    return {
        defaultConnection: 'default',
        connections: {
            default: {
                connector: 'bookshelf',
                settings: {
                client: "postgres",
                host,
                    port,
                    database,
                    username: user,
                    password,
                    ssl: { rejectUnauthorized: false },
                },
                options: {
                    ssl: false,
                },
            },
        },
    };
};