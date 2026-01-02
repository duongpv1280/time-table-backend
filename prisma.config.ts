import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: "classic",
  datasource: {
    url: "mongodb://root:password@127.0.0.1:27017/mydb?authSource=admin&replicaSet=rs0&directConnection=true&tls=false",
  },
})
