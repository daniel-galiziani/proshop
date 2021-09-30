import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Daniel',
        email: 'daniel@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ana',
        email: 'ana@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users