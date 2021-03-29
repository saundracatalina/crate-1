// Notes for fields that will be added to existing tables are at the top of the migrations
// for those tables. We plan on creating new migration files for additions to those tables.

// We will also be adding 2 completely new tables and will create and run
// migrations for those respectively. The summary of those additions will be:

// crateProducts (table)
// fields on that table:
// id (primary key)
// productId (foreign key)
// crateId (foreign key)
// createdAt
// updatedAt

// deliveries (table)
// fields on that table:
// id (primary key)
// status (integer with a default of 0 and ability to be updated) (0 = 'pending', 1 = 'kept', 2 = 'returned')
// userId (foreign key)
// crateProductId (foreign key)
// createdAt
// updatedAt
