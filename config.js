var connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/futboldb';

module.exports = connectionString;